const net = require('net');
const { existsSync } = require('fs');
const { spawnSync, spawn } = require('child_process');

const requiredPaths = {
  server: ['server/node_modules/ws', 'server/node_modules/express'],
  client: ['client/node_modules/vite', 'client/node_modules/react', 'client/node_modules/lucide-react']
};

const hasRequiredDeps = (name) => requiredPaths[name].every((p) => existsSync(p));

const ensureDeps = (name, prefix) => {
  if (hasRequiredDeps(name)) return true;

  console.log(`[emberpath] ${name} dependencies are missing or incomplete. Installing...`);
  const result = spawnSync('npm', ['--prefix', prefix, 'install', '--no-audit', '--no-fund'], {
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });

  return result.status === 0 && hasRequiredDeps(name);
};

const findOpenPort = (startPort = 5000, maxAttempts = 30) =>
  new Promise((resolve, reject) => {
    const tryPort = (port, attempts) => {
      const tester = net.createServer();

      tester.once('error', (err) => {
        tester.close();
        if (err.code === 'EADDRINUSE' && attempts < maxAttempts) {
          tryPort(port + 1, attempts + 1);
          return;
        }

        reject(err);
      });

      tester.once('listening', () => {
        tester.close(() => resolve(port));
      });

      tester.listen(port, '0.0.0.0');
    };

    tryPort(startPort, 0);
  });

const run = async () => {
  const serverOk = ensureDeps('server', 'server');
  const clientOk = ensureDeps('client', 'client');

  if (!serverOk || !clientOk) {
    console.error('[emberpath] Dependency installation failed. Run `npm run install:all` manually and retry.');
    process.exit(1);
  }

  const apiPort = await findOpenPort(Number(process.env.PORT || 5000));
  console.log(`[emberpath] Using API/WebSocket port ${apiPort}`);

  const server = spawn('npm', ['--prefix', 'server', 'run', 'dev'], {
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: { ...process.env, PORT: String(apiPort) }
  });

  const client = spawn('npm', ['--prefix', 'client', 'run', 'dev'], {
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: {
      ...process.env,
      VITE_API_BASE: `http://localhost:${apiPort}`,
      VITE_WS_URL: `ws://localhost:${apiPort}/ws`,
      VITE_HMR_HOST: process.env.VITE_HMR_HOST || '127.0.0.1',
      VITE_HMR_PORT: process.env.VITE_HMR_PORT || '5173',
      VITE_HMR_CLIENT_PORT: process.env.VITE_HMR_CLIENT_PORT || '5173'
    }
  });

  const shutdown = () => {
    server.kill('SIGTERM');
    client.kill('SIGTERM');
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  server.on('exit', (code) => {
    if (code !== 0) {
      console.error(`[emberpath] server exited with code ${code}`);
      client.kill('SIGTERM');
      process.exit(code || 1);
    }
  });

  client.on('exit', (code) => {
    if (code !== 0) {
      console.error(`[emberpath] client exited with code ${code}`);
      server.kill('SIGTERM');
      process.exit(code || 1);
    }
  });
};

run().catch((error) => {
  console.error('[emberpath] dev startup failed:', error.message);
  process.exit(1);
});
