import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label: string;
  id: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
}

const Select: React.FC<CustomSelectProps> = ({ label, id, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
        {label}
      </label>
      <div className="relative" ref={selectRef}>
        <button
          id={id}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-full text-left rounded-md border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-white sm:text-sm p-3 transition-all duration-200 flex justify-between items-center"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span>{selectedOption ? selectedOption.label : 'Select...'}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDownIcon />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute z-10 mt-1 w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 dark:ring-zinc-700 focus:outline-none sm:text-sm max-h-60 overflow-auto custom-scrollbar"
              role="listbox"
            >
              {options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`cursor-pointer select-none relative py-2 pl-3 pr-9 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-zinc-800 ${value === option.value ? 'bg-slate-100 dark:bg-zinc-800' : ''}`}
                  role="option"
                  aria-selected={value === option.value}
                >
                  <span className={`block truncate ${value === option.value ? 'font-semibold' : 'font-normal'}`}>
                    {option.label}
                  </span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Select;
