import React from 'react';
import { motion } from 'framer-motion';

interface PieChartProps {
  data: {
    label: string;
    value: number;
    color: string;
  }[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let accumulated = 0;

  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="relative w-48 h-48">
            <svg viewBox="-1 -1 2 2" className="transform -rotate-90">
                {data.map((item) => {
                const percent = item.value / total;
                const [startX, startY] = getCoordinatesForPercent(accumulated / total);
                accumulated += item.value;
                const [endX, endY] = getCoordinatesForPercent(accumulated / total);
                const largeArcFlag = percent > 0.5 ? 1 : 0;

                const pathData = [
                    `M ${startX} ${startY}`,
                    `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                    'L 0 0',
                ].join(' ');

                return (
                    <motion.path
                    key={item.label}
                    d={pathData}
                    fill={item.color}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    />
                );
                })}
            </svg>
        </div>
        <div className="flex flex-col gap-2">
        {data.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex flex-col">
                 <span className="text-sm text-slate-600 dark:text-slate-400">{item.label}</span>
                 <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(item.value)}
                 </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;