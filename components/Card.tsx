import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  headerActions?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children, headerActions }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="bg-white dark:bg-black/30 dark:backdrop-blur-md rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/20 border border-slate-100 dark:border-zinc-800/50 overflow-hidden"
    >
      {title && (
         <div className="p-6 bg-slate-50 dark:bg-black/20 border-b border-slate-200 dark:border-zinc-800/50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-blue-900 dark:text-white">{title}</h2>
            <div>{headerActions}</div>
         </div>
      )}
      <div className="p-6">{children}</div>
    </motion.div>
  );
};

export default Card;