import React from 'react';
import { motion } from 'framer-motion';

const BucketAnimation: React.FC = () => {
  return (
    <div className="flex justify-around w-full h-full text-xs">
      {/* Flat Rate Bucket */}
      <div className="flex flex-col items-center">
        <p className="font-bold mb-2 text-slate-700 dark:text-slate-200">Flat</p>
        <svg width="80" height="100" viewBox="0 0 80 100">
          {/* Fix: Merged two `className` attributes into one to resolve duplicate attribute error. */}
          <path d="M10 10 L 20 90 H 60 L 70 10 Z" fill="#e0f2f1" stroke="#a7f3d0" strokeWidth="2" className="dark:fill-teal-900/40 dark:stroke-teal-700" />
          {/* Water */}
          <rect x="20" y="30" width="40" height="60" fill="#2dd4bf" className="dark:fill-teal-500" />
           {/* Interest Cloud - Stays high */}
          <motion.g
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <rect x="25" y="5" width="30" height="15" rx="7.5" fill="#fecaca" className="dark:fill-red-900/80" />
            <text x="40" y="16" textAnchor="middle" fontSize="10" fill="#b91c1c" className="dark:fill-red-300" fontWeight="bold">Bigger</text>
          </motion.g>
        </svg>
      </div>

      {/* Reducing Rate Bucket */}
      <div className="flex flex-col items-center">
        <p className="font-bold mb-2 text-slate-700 dark:text-slate-200">Reducing</p>
        <svg width="80" height="100" viewBox="0 0 80 100">
          {/* Fix: Merged two `className` attributes into one to resolve duplicate attribute error. */}
          <path d="M10 10 L 20 90 H 60 L 70 10 Z" fill="#e0f2f1" stroke="#a7f3d0" strokeWidth="2" className="dark:fill-teal-900/40 dark:stroke-teal-700" />
          {/* Water - Animates down */}
           <motion.rect 
            x="20" width="40" fill="#2dd4bf" className="dark:fill-teal-500"
            initial={{ y: 30, height: 60 }}
            animate={{ y: 70, height: 20 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          />
           {/* Interest Cloud - Animates down */}
           <motion.g
            initial={{ y: 0 }}
            animate={{ y: 40 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          >
            <motion.rect 
              x="30" width="20" rx="5" fill="#d1fae5" className="dark:fill-green-900/80"
              initial={{ y: 12, height: 10 }}
              animate={{ y: 15, height: 5 }}
              transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            />
             <motion.text x="40" y="20" textAnchor="middle" fontSize="8" fill="#047857" className="dark:fill-green-300" fontWeight="bold"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
             >
                Smaller
             </motion.text>
          </motion.g>
        </svg>
      </div>
    </div>
  );
};

export default BucketAnimation;