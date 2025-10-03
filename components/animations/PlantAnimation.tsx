import React from 'react';
import { motion } from 'framer-motion';

const Plant = ({ x, y, delay = 0 }: { x: number, y: number, delay?: number }) => (
  <motion.g
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay, type: 'spring', stiffness: 300, damping: 20 }}
  >
    {/* Stem */}
    <path d={`M ${x} ${y} v -20 c 0 -10 10 -10 10 -20`} stroke="#22c55e" strokeWidth="2" fill="none" />
    {/* Leaves */}
    <circle cx={x+10} cy={y-40} r="8" fill="#4ade80" />
    <circle cx={x+2} cy={y-32} r="6" fill="#86efac" />
    <circle cx={x+18} cy={y-32} r="6" fill="#86efac" />
  </motion.g>
);

const PlantAnimation: React.FC = () => {
  return (
    <div className="flex justify-around w-full h-full text-xs">
      <div className="flex flex-col items-center">
        <p className="font-bold mb-2 text-slate-700 dark:text-slate-200">Simple</p>
        <svg width="100" height="100" viewBox="0 0 100 100">
          <line x1="0" y1="95" x2="100" y2="95" stroke="#a3a3a3" className="dark:stroke-zinc-600" strokeWidth="2" />
          <Plant x={45} y={95} />
          {/* Fruits that don't reinvest */}
          <motion.g>
             <motion.circle cx="65" cy="40" r="4" fill="#f87171"
              initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay: 1, repeat: Infinity, duration: 2, repeatDelay: 1 }}
             />
             <motion.circle cx="80" cy="55" r="4" fill="#f87171"
              initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay: 2, repeat: Infinity, duration: 2, repeatDelay: 1 }}
             />
          </motion.g>
        </svg>
      </div>
      <div className="flex flex-col items-center">
        <p className="font-bold mb-2 text-slate-700 dark:text-slate-200">Compound</p>
        <svg width="100" height="100" viewBox="0 0 100 100">
           <line x1="0" y1="95" x2="100" y2="95" stroke="#a3a3a3" className="dark:stroke-zinc-600" strokeWidth="2" />
           <Plant x={45} y={95} />
           {/* New plants from fruits */}
           <motion.g key={1}>
             <Plant x={20} y={95} delay={1.5} />
           </motion.g>
            <motion.g key={2}>
              <Plant x={70} y={95} delay={3} />
           </motion.g>
        </svg>
      </div>
    </div>
  );
};

export default PlantAnimation;
