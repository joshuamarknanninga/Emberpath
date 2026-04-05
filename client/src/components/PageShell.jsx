import { motion } from 'framer-motion';

export default function PageShell({ title, subtitle, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-5"
    >
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && <p className="mt-1 text-slate-400">{subtitle}</p>}
      </div>
      {children}
    </motion.section>
  );
}
