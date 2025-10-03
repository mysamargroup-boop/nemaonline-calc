import React, { useState, useCallback, useEffect } from 'react';
import Card from './Card';
import Input from './Input';
import Button from './Button';
import { motion } from 'framer-motion';

const bmiCategories = [
  { range: '< 18.5', category: 'Underweight' },
  { range: '18.5 - 24.9', category: 'Normal weight' },
  { range: '25.0 - 29.9', category: 'Overweight' },
  { range: '≥ 30.0', category: 'Obesity' }
];

const BMICalculator: React.FC = () => {
  type UnitSystem = 'metric' | 'imperial';
  const defaultState = {
      weight: '',
      height: '',
      unitSystem: 'metric' as UnitSystem
  };

  const [weight, setWeight] = useState<string>(defaultState.weight);
  const [height, setHeight] = useState<string>(defaultState.height);
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(defaultState.unitSystem);
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    color: string;
    idealWeightRange: { lower: number, upper: number };
    weightToChange: { action: 'gain' | 'lose' | 'maintain', amount: number };
  } | null>(null);

  const getBMICategory = (bmi: number): { category: string; color: string } => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800' };
    if (bmi >= 18.5 && bmi < 25) return { category: 'Normal weight', color: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/50' };
    if (bmi >= 25 && bmi < 30) return { category: 'Overweight', color: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/50' };
    return { category: 'Obesity', color: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/50' };
  };

  const calculateBMI = useCallback(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (w > 0 && h > 0) {
      let bmi, idealWeightRange, weightToChange;
      const heightInMeters = h / 100;
      const heightInInches = h;

      if (unitSystem === 'metric') {
          bmi = w / (heightInMeters * heightInMeters);
          idealWeightRange = {
              lower: 18.5 * (heightInMeters * heightInMeters),
              upper: 24.9 * (heightInMeters * heightInMeters)
          };
      } else {
          bmi = (w / (heightInInches * heightInInches)) * 703;
          idealWeightRange = {
              lower: (18.5 / 703) * (heightInInches * heightInInches),
              upper: (24.9 / 703) * (heightInInches * heightInInches)
          };
      }
      
      if (bmi < 18.5) {
          weightToChange = { action: 'gain', amount: idealWeightRange.lower - w };
      } else if (bmi > 24.9) {
          weightToChange = { action: 'lose', amount: w - idealWeightRange.upper };
      } else {
          weightToChange = { action: 'maintain', amount: 0 };
      }

      const { category, color } = getBMICategory(bmi);
      setResult({ bmi, category, color, idealWeightRange, weightToChange });
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

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="p-4 bg-slate-50 dark:bg-zinc-900 rounded-lg">
              <p className="text-sm text-slate-500 dark:text-slate-400">Ideal Weight Range</p>
              <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                {result.idealWeightRange.lower.toFixed(1)} - {result.idealWeightRange.upper.toFixed(1)} {unitSystem === 'metric' ? 'kg' : 'lbs'}
              </p>
            </div>
            <div className={`p-4 rounded-lg ${result.weightToChange.action === 'maintain' ? 'bg-slate-50 dark:bg-zinc-900' : 'bg-blue-50 dark:bg-blue-900/50'}`}>
               <p className={`text-sm ${result.weightToChange.action === 'maintain' ? 'text-slate-500 dark:text-slate-400' : 'text-blue-600 dark:text-blue-400'}`}>
                {result.weightToChange.action === 'maintain' ? 'You are in a healthy range' : `You should ${result.weightToChange.action}:`}
              </p>
              <p className={`text-lg font-semibold ${result.weightToChange.action === 'maintain' ? 'text-slate-800 dark:text-slate-200' : 'text-blue-800 dark:text-blue-300'}`}>
                {result.weightToChange.action !== 'maintain' ? `${result.weightToChange.amount.toFixed(1)} ${unitSystem === 'metric' ? 'kg' : 'lbs'}` : 'Keep it up!'}
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-center mb-4 text-slate-700 dark:text-slate-300">BMI Reference Chart</h3>
            <div className="space-y-2 max-w-md mx-auto">
              {bmiCategories.map((cat) => (
                <div key={cat.category} className={`flex justify-between items-center p-3 rounded-md transition-all duration-300 ${result.category === cat.category ? 'bg-white dark:bg-zinc-700 ring-2 ring-blue-500 dark:ring-blue-400' : 'bg-slate-50 dark:bg-zinc-900/80'}`}>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{cat.category}</span>
                  <span className="text-slate-500 dark:text-slate-400 font-mono">{cat.range}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </Card>
  );
};

export default BMICalculator;