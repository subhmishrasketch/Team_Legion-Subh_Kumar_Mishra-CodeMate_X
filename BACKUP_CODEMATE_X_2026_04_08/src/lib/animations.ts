// Advanced Animation Presets for CodeMate X
export const ANIMATIONS = {
  // Page transitions
  pageEnter: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: "easeOut" }
  },

  // Card animations
  cardHover: {
    scale: 1.05,
    y: -12,
    boxShadow: "0 40px 80px rgba(6, 182, 212, 0.2)"
  },
  
  cardTap: { scale: 0.98 },

  // Icon animations
  iconBounce: {
    animate: { y: [0, -8, 0] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  },

  iconPulse: {
    animate: { scale: [1, 1.1, 1] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  },

  iconRotate: {
    animate: { rotate: 360 },
    transition: { duration: 20, repeat: Infinity, ease: "linear" }
  },

  // Button animations
  buttonHover: {
    scale: 1.05,
    y: -3,
    boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)"
  },

  buttonTap: { scale: 0.95 },

  // Text animations
  textFadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
  },

  textSlideIn: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4 }
  },

  // Floating animations
  float: {
    animate: { y: [0, -10, 0] },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  },

  floatSlow: {
    animate: { y: [0, -8, 0], x: [0, 5, 0] },
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  },

  // Stagger animations
  staggerContainer: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1
      }
    }
  },

  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  },

  // Gradient animations
  gradientFlow: {
    backgroundSize: "200% 200%",
    animate: {
      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
    },
    transition: { duration: 8, repeat: Infinity, ease: "linear" }
  },

  // Modal animations
  modalEnter: {
    initial: { scale: 0.8, opacity: 0, y: 40 },
    animate: { scale: 1, opacity: 1, y: 0 },
    exit: { scale: 0.8, opacity: 0, y: 40 },
    transition: { type: "spring", stiffness: 300, damping: 25 }
  },

  // Search/Filter animations
  filterTag: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 500, damping: 30 }
  },

  // Success animations
  successPulse: {
    animate: { scale: [1, 1.1, 1] },
    transition: { duration: 0.6, times: [0, 0.5, 1] }
  },

  // Loading animations
  loadingRotate: {
    animate: { rotate: 360 },
    transition: { duration: 1.5, repeat: Infinity, ease: "linear" }
  },

  loadingPing: {
    animate: { scale: [1, 1.2], opacity: [1, 0] },
    transition: { duration: 1.5, repeat: Infinity }
  },

  // Number counter animation
  numberChange: {
    transition: { duration: 0.5, ease: "easeOut" }
  },

  // Ripple effect
  ripple: {
    initial: { scale: 0, opacity: 1 },
    animate: { scale: 4, opacity: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  },

  // Slide animations
  slideInRight: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.4 }
  },

  slideInLeft: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.4 }
  },

  slideInUp: {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.4 }
  },

  slideInDown: {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.4 }
  }
};

// Variants for motion components
export const VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  },

  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  },

  card: {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  }
};
