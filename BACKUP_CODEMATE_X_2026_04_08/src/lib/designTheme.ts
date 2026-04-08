// CodeMate X Unified Design Theme
// Apply this consistently across all pages

export const THEME_COLORS = {
  // Gradients
  gradients: {
    primary: 'from-cyan-500 to-blue-600',
    secondary: 'from-blue-500 to-indigo-600',
    accent: 'from-purple-500 to-pink-600',
    cyanBlue: 'from-cyan-400 via-blue-400 to-purple-400',
  },
  
  // Stat card colors
  statCards: {
    cyan: 'from-cyan-100 to-cyan-50 dark:from-cyan-500/20 dark:to-cyan-500/10',
    blue: 'from-blue-100 to-blue-50 dark:from-blue-500/20 dark:to-blue-500/10',
    purple: 'from-purple-100 to-purple-50 dark:from-purple-500/20 dark:to-purple-500/10',
    green: 'from-green-100 to-green-50 dark:from-green-500/20 dark:to-green-500/10',
    red: 'from-red-100 to-red-50 dark:from-red-500/20 dark:to-red-500/10',
    amber: 'from-amber-100 to-amber-50 dark:from-amber-500/20 dark:to-amber-500/10',
  },
  
  // Text colors for stat cards
  statText: {
    cyan: 'text-cyan-600 dark:text-cyan-400',
    blue: 'text-blue-600 dark:text-blue-400',
    purple: 'text-purple-600 dark:text-purple-400',
    green: 'text-green-600 dark:text-green-400',
    red: 'text-red-600 dark:text-red-400',
    amber: 'text-amber-600 dark:text-amber-400',
  },
  
  // Border colors
  borders: {
    cyan: 'border-cyan-200 dark:border-cyan-500/30',
    blue: 'border-blue-200 dark:border-blue-500/30',
    purple: 'border-purple-200 dark:border-purple-500/30',
    green: 'border-green-200 dark:border-green-500/30',
  },
};

export const ANIMATION_CONFIG = {
  // Modal animations
  modal: {
    container: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } },
    content: {
      initial: { scale: 0.85, y: 40, opacity: 0 },
      animate: { scale: 1, y: 0, opacity: 1 },
      exit: { scale: 0.85, y: 40, opacity: 0 },
      transition: { type: 'spring', stiffness: 300, damping: 25 },
    },
  },
  
  // Card animations
  card: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, type: 'spring', stiffness: 100 },
    hover: { y: -12, boxShadow: '0 30px 60px rgba(0,0,0,0.3)' },
  },
  
  // Stat box animations
  statBox: {
    hover: { y: -4 },
  },
  
  // Button animations
  button: {
    hover: { scale: 1.05, y: -2 },
    tap: { scale: 0.95 },
  },
  
  // Stagger container
  stagger: {
    container: { staggerChildren: 0.08 },
    item: { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } },
  },
};

export const LAYOUT_CLASSES = {
  // Modal styles
  modalContainer: 'fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4',
  modalContent: 'w-full max-w-2xl rounded-2xl border border-border bg-card shadow-2xl overflow-hidden',
  modalHeader: 'sticky top-0 border-b border-border bg-gradient-to-r from-primary/10 to-primary/5 p-6 backdrop-blur-sm',
  modalFooter: 'sticky bottom-0 border-t border-border bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6 flex gap-3 backdrop-blur-sm',
  
  // Content area
  contentArea: 'p-8 space-y-8 max-h-[calc(90vh-180px)] overflow-y-auto',
  
  // Grid layouts
  cardGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
  statGrid: 'grid gap-4 sm:grid-cols-2',
};

export const COMMON_ANIMATIONS = {
  pageEnter: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 },
  },
  
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 },
  },
  
  slideIn: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.3 },
  },
};
