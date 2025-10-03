import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ label, id, icon, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
             <span className="text-gray-500 dark:text-zinc-400 sm:text-sm">{icon}</span>
          </div>
        )}
        <input
          id={id}
          className={`block w-full rounded-md border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-zinc-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-white dark:focus:ring-white sm:text-sm p-3 transition-all duration-200 ${icon ? 'pl-10' : ''}`}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;