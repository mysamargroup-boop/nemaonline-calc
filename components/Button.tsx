import React from 'react';
import { motion } from 'framer-motion';

// Fix: Use React.ComponentProps<typeof motion.button> to get the correct props
// for a framer-motion button component, resolving type conflicts with standard
// React.ButtonHTMLAttributes.
interface ButtonProps extends React.ComponentProps<typeof motion.button> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const baseClasses = "font-semibold py-3 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 w-full";
  
  const primaryClasses = "bg-blue-800 hover:bg-blue-900 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-black focus:ring-blue-500 dark:focus:ring-gray-400 dark:focus:ring-offset-black";
  
  const secondaryClasses = "bg-transparent hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-zinc-700 focus:ring-blue-500 dark:focus:ring-gray-400 dark:focus:ring-offset-black";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variant === 'primary' ? primaryClasses : secondaryClasses}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;