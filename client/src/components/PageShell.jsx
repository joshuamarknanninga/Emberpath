import { motion } from 'framer-motion';

export default function PageShell({ title, subtitle, children, meta }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className="space-y-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="muted-label">{meta || 'EMBERPATH MODULE'}</p>
          <h1 className="mt-1 text-2xl md:text-3xl">{title}</h1>
          {subtitle && <p className="mt-2 max-w-3xl text-sm text-slate-300 md:text-base">{subtitle}</p>}
        </div>
      </div>
      {children}
    </motion.section>
  );
}
