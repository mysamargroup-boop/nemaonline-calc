import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalculatorType } from './types';
import { CALCULATORS } from './constants';
import EMICalculator from './components/EMICalculator';
import ProfitCalculator from './components/ProfitCalculator';
import BMICalculator from './components/BMICalculator';
import AgeCalculator from './components/AgeCalculator';
import InvestmentCalculator from './components/InvestmentCalculator';
import CurrencyConverter from './components/CurrencyConverter';
import LoanComparisonCalculator from './components/LoanComparisonCalculator';
import RetirementCalculator from './components/RetirementCalculator';

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m4.93 19.07 1.41-1.41"></path><path d="m17.66 6.34 1.41-1.41"></path></svg>
);
const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
);


const App: React.FC = () => {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>(
    CalculatorType.EMI
  );
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);
  
  useEffect(() => {
    const currentCalculator = CALCULATORS.find(calc => calc.id === activeCalculator);
    const calculatorName = currentCalculator ? currentCalculator.name : '';
    const nameSuffix = calculatorName.toLowerCase().includes('calculator') ? '' : ' Calculator';
    document.title = `${calculatorName}${nameSuffix} | Nemaonline Calc`;
  }, [activeCalculator]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const renderCalculator = () => {
    switch (activeCalculator) {
      case CalculatorType.EMI:
        return <EMICalculator key={CalculatorType.EMI} />;
      case CalculatorType.LOAN_COMPARISON:
        return <LoanComparisonCalculator key={CalculatorType.LOAN_COMPARISON} />;
      case CalculatorType.RETIREMENT:
        return <RetirementCalculator key={CalculatorType.RETIREMENT} />;
      case CalculatorType.PROFIT:
        return <ProfitCalculator key={CalculatorType.PROFIT} />;
      case CalculatorType.BMI:
        return <BMICalculator key={CalculatorType.BMI} />;
      case CalculatorType.AGE:
        return <AgeCalculator key={CalculatorType.AGE} />;
      case CalculatorType.INVESTMENT:
        return <InvestmentCalculator key={CalculatorType.INVESTMENT} />;
      case CalculatorType.CURRENCY:
        return <CurrencyConverter key={CalculatorType.CURRENCY} />;
      default:
        return <EMICalculator key={CalculatorType.EMI} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-800 dark:text-slate-200">
      <header className="py-6 bg-white/80 dark:bg-black/50 shadow-sm backdrop-blur-sm sticky top-0 z-20 transition-colors duration-300 border-b border-slate-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 dark:text-white tracking-tight">
              Nemaonline Calc
            </h1>
            <p className="mt-1 md:mt-2 text-sm md:text-base text-slate-500 dark:text-slate-400">
              Your one-stop destination for quick and easy calculations.
            </p>
          </div>
           <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors duration-300">
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-8">
        <nav className="relative flex w-full max-w-4xl mx-auto bg-slate-100/80 dark:bg-black/30 backdrop-blur-sm rounded-full p-1.5 shadow-inner dark:shadow-black/20 mb-8 overflow-x-auto no-scrollbar">
          {CALCULATORS.map((calc) => (
            <button
              key={calc.id}
              onClick={() => setActiveCalculator(calc.id)}
              className={`relative flex-shrink-0 px-4 py-2.5 text-sm font-semibold rounded-full transition-colors duration-300 focus:outline-none flex items-center justify-center gap-2
                ${
                  activeCalculator === calc.id
                    ? 'text-blue-800 dark:text-zinc-900'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100'
                }`}
            >
              {activeCalculator === calc.id && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white dark:bg-slate-100 rounded-full shadow-md z-0"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {calc.icon}
                {calc.name}
              </span>
            </button>
          ))}
        </nav>
        
        <AnimatePresence mode="wait">
          {renderCalculator()}
        </AnimatePresence>

      </main>

      <footer className="w-full py-6 mt-8 bg-white/80 dark:bg-black/50 border-t border-slate-200 dark:border-zinc-800 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center text-slate-500 dark:text-slate-400">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm">
                  &copy; {new Date().getFullYear()} Nemaonline Calc. All Rights Reserved.
              </p>
              <p className="text-xs px-4 py-1 bg-slate-100 dark:bg-zinc-800 rounded-full">
                  Disclaimer: All calculations are for estimation purposes only.
              </p>
              <p className="text-sm">
                  Designed & Developed by Samar.
              </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;