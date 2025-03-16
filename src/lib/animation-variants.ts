// Common animation variants for consistent animations across components

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

export const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: { duration: 0.3 }
  }
};

export const slideRight = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5 }
  },
  exit: { 
    opacity: 0, 
    x: 20,
    transition: { duration: 0.3 }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.5
    }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

export const scale = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: { duration: 0.3 }
  }
};

export const chartAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.5
    }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: { duration: 0.3 }
  }
};

export const mobileMenuAnimation = {
  hidden: { x: "-100%" },
  visible: { 
    x: 0,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  exit: { 
    x: "-100%",
    transition: { duration: 0.3 }
  }
};

// Animation variants with configurable animation enabled/disabled
export const getAnimationVariants = (animationEnabled: boolean) => {
  const duration = animationEnabled ? 0.5 : 0;
  
  return {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration }
      },
      exit: { 
        opacity: 0,
        transition: { duration: animationEnabled ? 0.3 : 0 }
      }
    },
    
    slideUp: {
      hidden: { opacity: 0, y: animationEnabled ? 20 : 0 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration }
      },
      exit: { 
        opacity: 0, 
        y: animationEnabled ? -10 : 0,
        transition: { duration: animationEnabled ? 0.3 : 0 }
      }
    },
    
    staggerContainer: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { 
          when: "beforeChildren",
          staggerChildren: animationEnabled ? 0.1 : 0,
          duration
        }
      },
      exit: {
        opacity: 0,
        transition: { duration: animationEnabled ? 0.3 : 0 }
      }
    },
    
    staggerItem: {
      hidden: { opacity: 0, y: animationEnabled ? 20 : 0 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration }
      }
    }
  };
};