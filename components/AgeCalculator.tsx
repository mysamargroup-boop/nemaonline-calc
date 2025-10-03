import React, { useState, useCallback, useEffect } from 'react';
import Card from './Card';
import Input from './Input';
import Button from './Button';
import { motion } from 'framer-motion';

const AgeCalculator: React.FC = () => {
  const defaultState = {
    birthDate: '2000-01-01',
  };

  const [birthDate, setBirthDate] = useState<string>(defaultState.birthDate);
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalWeeks: number;
    totalDays: number;
    totalHours: number;
    nextBirthdayIn: number;
  } | null>(null);

  const calculateAge = useCallback(() => {
    if (!birthDate) {
      setResult(null);
      return;
    }

    const today = new Date();
    const dob = new Date(birthDate);

    if (dob > today || isNaN(dob.getTime())) {
        setResult(null);
        return;
    }

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;

    const nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
    if (today > nextBirthday) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const nextBirthdayIn = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    setResult({ years, months, days, totalWeeks, totalDays, totalHours, nextBirthdayIn });
  }, [birthDate]);

  useEffect(() => {
    calculateAge();
  }, [calculateAge]);

  const resetCalculator = () => {
      setBirthDate(defaultState.birthDate);
  };


  return (
    <Card title="Age Calculator" headerActions={<Button variant="secondary" onClick={resetCalculator} className="py-1 px-3 text-sm">Reset</Button>}>
      <div className="flex justify-center">
        <div className="max-w-xs w-full">
            <Input
              label="Your Date of Birth"
              id="birth-date"
              type="date"
              value={birthDate}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => setBirthDate(e.target.value)}
            />
        </div>
      </div>
      {result && (
        <motion.div 
          role="region"
          aria-live="polite"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 pt-6 border-t border-slate-200 dark:border-zinc-800"
        >
          <div className="text-center mb-6">
            <p className="text-lg text-slate-600 dark:text-slate-400">Your current age is</p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-50 dark:bg-zinc-900 rounded-lg">
              <p className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white">{result.years}</p>
              <p className="text-sm text-slate-600 dark:text-zinc-400">Years</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-zinc-900 rounded-lg">
              <p className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white">{result.months}</p>
              <p className="text-sm text-slate-600 dark:text-zinc-400">Months</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-zinc-900 rounded-lg">
              <p className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white">{result.days}</p>
              <p className="text-sm text-slate-600 dark:text-zinc-400">Days</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-center mb-4 text-slate-700 dark:text-slate-300">Fun Facts</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-slate-50 dark:bg-zinc-900 rounded-lg">
                    <p className="text-2xl font-bold text-slate-800 dark:text-white">{result.nextBirthdayIn}</p>
                    <p className="text-sm text-slate-600 dark:text-zinc-400">Days to next birthday</p>
                </div>
                 <div className="p-4 bg-slate-50 dark:bg-zinc-900 rounded-lg">
                    <p className="text-2xl font-bold text-slate-800 dark:text-white">{result.totalWeeks.toLocaleString()}</p>
                    <p className="text-sm text-slate-600 dark:text-zinc-400">In total weeks</p>
                </div>
                 <div className="p-4 bg-slate-50 dark:bg-zinc-900 rounded-lg">
                    <p className="text-2xl font-bold text-slate-800 dark:text-white">{result.totalDays.toLocaleString()}</p>
                    <p className="text-sm text-slate-600 dark:text-zinc-400">In total days</p>
                </div>
                 <div className="p-4 bg-slate-50 dark:bg-zinc-900 rounded-lg">
                    <p className="text-2xl font-bold text-slate-800 dark:text-white">{result.totalHours.toLocaleString()}</p>
                    <p className="text-sm text-slate-600 dark:text-zinc-400">In total hours</p>
                </div>
            </div>
          </div>
        </motion.div>
      )}
    </Card>
  );
};

export default AgeCalculator;