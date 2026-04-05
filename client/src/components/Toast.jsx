import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  return (
    <div className="pointer-events-none fixed bottom-20 right-4 z-50 sm:bottom-6">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto flex max-w-sm items-start gap-3 rounded-2xl border border-slate-600/40 bg-panelSoft/90 px-4 py-3 shadow-glow"
            onClick={onClose}
          >
            {toast.type === 'success' ? <CheckCircle2 className="mt-0.5 h-4 w-4 text-greenMuted" /> : <AlertTriangle className="mt-0.5 h-4 w-4 text-amberMuted" />}
            <p className="text-sm text-slate-100">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
