import React, { useState, useCallback, useEffect } from 'react';
import Card from './Card';
import Input from './Input';
import Button from './Button';
import { motion } from 'framer-motion';

const BMICalculator: React.FC = () => {
  type UnitSystem = 'metric' | 'imperial';
  const defaultState = {
      weight: '70',
      height: '175',
      unitSystem: 'metric' as UnitSystem
  };

  const [weight, setWeight] = useState<string>(defaultState.weight);
  const [height, setHeight] = useState<string>(defaultState.height);
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(defaultState.unitSystem);
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    color: string;
  } | null>(null);

  const getBMICategory = (bmi: number): { category: string; color: string } => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800' };
    if (bmi >= 18.5 && bmi < 24.9) return { category: 'Normal weight', color: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/50' };
    if (bmi >= 25 && bmi < 29.9) return { category: 'Overweight', color: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/50' };
    return { category: 'Obesity', color: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/50' };
  };

  const calculateBMI = useCallback(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (w > 0 && h > 0) {
      let bmi;
      if (unitSystem === 'metric') {
          bmi = w / ((h / 100) * (h / 100)); // weight in kg, height in cm
      } else {
          bmi = (w / (h * h)) * 703; // weight in lbs, height in inches
      }
      const { category, color } = getBMICategory(bmi);
      setResult({ bmi, category, color });
    } else {
      setResult(null);
    }
  }, [weight, height, unitSystem]);

  useEffect(() => {
    calculateBMI();
  }, [calculateBMI]);
  
  const resetCalculator = () => {
      setWeight(defaultState.weight);
      setHeight(defaultState.height);
      setUnitSystem(defaultState.unitSystem);
  }

  const BMIGauge = ({ bmi }: { bmi: number }) => {
    const percentage = Math.min(Math.max((bmi - 15) / (35 - 15), 0), 1) * 100;
    return (
      <div className="w-full mt-4">
        <div className="h-2 w-full bg-gradient-to-r from-gray-300 via-green-400 to-red-500 rounded-full relative">
          <motion.div 
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-zinc-900 border-2 border-slate-700 dark:border-slate-200 rounded-full"
            initial={{ left: '0%' }}
            animate={{ left: `${percentage}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
          <span>Underweight</span>
          <span>Normal</span>
          <span>Overweight</span>
        </div>
      </div>
    )
  }

  return (
    <Card title="BMI Calculator" headerActions={<Button variant="secondary" onClick={resetCalculator} className="py-1 px-3 text-sm">Reset</Button>}>
      <div className="mb-4 flex justify-center">
        <div className="flex rounded-md bg-slate-100 dark:bg-zinc-800 p-1">
          <button onClick={() => setUnitSystem('metric')} className={`px-4 py-1 text-sm rounded ${unitSystem === 'metric' ? 'bg-white dark:bg-zinc-700 shadow' : ''}`}>Metric</button>
          <button onClick={() => setUnitSystem('imperial')} className={`px-4 py-1 text-sm rounded ${unitSystem === 'imperial' ? 'bg-white dark:bg-zinc-700 shadow' : ''}`}>Imperial</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={`Weight (${unitSystem === 'metric' ? 'kg' : 'lbs'})`}
          id="weight"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <Input
          label={`Height (${unitSystem === 'metric' ? 'cm' : 'in'})`}
          id="height"
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      {result && (
        <motion.div 
          role="region"
          aria-live="polite"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="mt-8 pt-6 border-t border-slate-200 dark:border-zinc-800 text-center"
        >
          <p className="text-slate-500 dark:text-slate-400">Your BMI</p>
          <p className="text-6xl font-extrabold text-blue-900 dark:text-white my-2">{result.bmi.toFixed(1)}</p>
          <p className={`inline-block px-4 py-2 rounded-full font-semibold text-lg ${result.color}`}>
            {result.category}
          </p>
          <BMIGauge bmi={result.bmi} />
        </motion.div>
      )}
    </Card>
  );
};

export default BMICalculator;