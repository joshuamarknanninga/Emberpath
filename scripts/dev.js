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

const run = () => {
  const serverOk = ensureDeps('server', 'server');
  const clientOk = ensureDeps('client', 'client');

  if (!serverOk || !clientOk) {
    console.error('[emberpath] Dependency installation failed. Run `npm run install:all` manually and retry.');
    process.exit(1);
  }

  const server = spawn('npm', ['--prefix', 'server', 'run', 'dev'], {
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });

  const client = spawn('npm', ['--prefix', 'client', 'run', 'dev'], {
    stdio: 'inherit',
    shell: process.platform === 'win32'
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

run();
