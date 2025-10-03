import React, { useState, useCallback, useEffect } from 'react';
import Card from './Card';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import { motion, AnimatePresence } from 'framer-motion';

const compoundFrequencyOptions = [
    { value: '1', label: 'Annually' },
    { value: '2', label: 'Semi-Annually' },
    { value: '4', label: 'Quarterly' },
    { value: '12', label: 'Monthly' }
];

const InvestmentCalculator: React.FC = () => {
  type InvestmentType = 'simple' | 'compound';
  type CalculationMode = 'futureValue' | 'findTenure' | 'findPrincipal';
  
  const defaultState = {
    principal: '100000',
    rate: '12',
    tenure: '10',
    taxRate: '15',
    targetAmount: '1000000',
    investmentType: 'compound' as InvestmentType,
    compoundFrequency: '12', // Monthly
    calculationMode: 'futureValue' as CalculationMode,
  };
  
  const [principal, setPrincipal] = useState<string>(defaultState.principal);
  const [rate, setRate] = useState<string>(defaultState.rate);
  const [tenure, setTenure] = useState<string>(defaultState.tenure);
  const [taxRate, setTaxRate] = useState<string>(defaultState.taxRate);
  const [targetAmount, setTargetAmount] = useState<string>(defaultState.targetAmount);
  const [investmentType, setInvestmentType] = useState<InvestmentType>(defaultState.investmentType);
  const [compoundFrequency, setCompoundFrequency] = useState<string>(defaultState.compoundFrequency);
  const [calculationMode, setCalculationMode] = useState<CalculationMode>(defaultState.calculationMode);

  const [result, setResult] = useState<{
    maturedAmount?: number;
    totalInterest?: number;
    taxAmount?: number;
    maturedAmountAfterTax?: number;
    calculatedTenure?: { years: number, months: number };
    calculatedPrincipal?: number;
  } | null>(null);

  const calculateInvestment = useCallback(() => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(tenure);
    const tax = parseFloat(taxRate) / 100;
    const n = parseFloat(compoundFrequency);
    const target = parseFloat(targetAmount);
    
    setResult(null);

    if (r <= 0) return;

    if (calculationMode === 'futureValue' && p > 0 && t > 0) {
      let maturedAmount;
      if (investmentType === 'simple') {
        maturedAmount = p * (1 + r * t);
      } else {
        maturedAmount = p * Math.pow(1 + r / n, n * t);
      }
      const totalInterest = maturedAmount - p;
      const taxAmount = totalInterest > 0 ? totalInterest * tax : 0;
      const maturedAmountAfterTax = maturedAmount - taxAmount;

      setResult({ maturedAmount, totalInterest, taxAmount, maturedAmountAfterTax });

    } else if (calculationMode === 'findTenure' && p > 0 && target > p) {
        if (investmentType === 'simple') {
            const calculatedT = (target/p - 1) / r;
            const years = Math.floor(calculatedT);
            const months = Math.ceil((calculatedT - years) * 12);
            setResult({ calculatedTenure: { years, months } });
        } else {
            const calculatedT = Math.log(target / p) / (n * Math.log(1 + r / n));
            const years = Math.floor(calculatedT);
            const months = Math.ceil((calculatedT - years) * 12);
            setResult({ calculatedTenure: { years, months } });
        }

    } else if (calculationMode === 'findPrincipal' && t > 0 && target > 0) {
        let calculatedPrincipal;
        if (investmentType === 'simple') {
            calculatedPrincipal = target / (1 + r * t);
        } else {
            calculatedPrincipal = target / Math.pow(1 + r / n, n * t);
        }
        setResult({ calculatedPrincipal });
    }

  }, [principal, rate, tenure, taxRate, targetAmount, investmentType, compoundFrequency, calculationMode]);

  useEffect(() => {
    calculateInvestment();
  }, [calculateInvestment]);

  const resetCalculator = () => {
    setPrincipal(defaultState.principal);
    setRate(defaultState.rate);
    setTenure(defaultState.tenure);
    setTaxRate(defaultState.taxRate);
    setTargetAmount(defaultState.targetAmount);
    setInvestmentType(defaultState.investmentType);
    setCompoundFrequency(defaultState.compoundFrequency);
    setCalculationMode(defaultState.calculationMode);
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
  };
  
  const renderResult = () => {
    if (!result) return null;

    switch (calculationMode) {
      case 'futureValue':
        if (result.maturedAmount === undefined) return null;
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-slate-50 dark:bg-zinc-900 rounded-lg">
                <p className="text-sm text-slate-500 dark:text-zinc-400">Invested Amount</p>
                <p className="text-xl font-semibold text-slate-800 dark:text-zinc-200">{formatCurrency(parseFloat(principal))}</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-zinc-900 rounded-lg">
                <p className="text-sm text-slate-500 dark:text-zinc-400">Gross Interest Earned</p>
                <p className="text-xl font-semibold text-slate-800 dark:text-zinc-200">{formatCurrency(result.totalInterest!)}</p>
            </div>
             <div className="p-4 bg-red-50 dark:bg-red-900/50 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">Tax Payable</p>
                <p className="text-xl font-semibold text-red-800 dark:text-red-300">{formatCurrency(result.taxAmount!)}</p>
            </div>
             <div className="p-4 bg-green-50 dark:bg-green-900/50 rounded-lg">
                <p className="text-sm text-green-600 dark:text-green-400">Matured Amount (After Tax)</p>
                <p className="text-xl font-bold text-green-800 dark:text-green-300">{formatCurrency(result.maturedAmountAfterTax!)}</p>
            </div>
          </div>
        );
      case 'findTenure':
        if (result.calculatedTenure === undefined) return null;
        return (
            <div className="text-center p-6 rounded-lg bg-slate-50 dark:bg-zinc-900">
                <p className="text-slate-500 dark:text-zinc-400">Time required to reach your goal</p>
                <p className="text-4xl font-bold text-blue-800 dark:text-white my-2">
                    {result.calculatedTenure.years} years & {result.calculatedTenure.months} months
                </p>
            </div>
        );
      case 'findPrincipal':
        if (result.calculatedPrincipal === undefined) return null;
        return (
            <div className="text-center p-6 rounded-lg bg-slate-50 dark:bg-zinc-900">
                <p className="text-slate-500 dark:text-zinc-400">Principal required to reach your goal</p>
                <p className="text-4xl font-bold text-blue-800 dark:text-white my-2">
                    {formatCurrency(result.calculatedPrincipal)}
                </p>
            </div>
        );
      default:
        return null;
    }
  }

  return (
    <Card title="Investment Goal Planner" headerActions={<Button variant="secondary" onClick={resetCalculator} className="py-1 px-3 text-sm">Reset</Button>}>
      <div className="mb-6 flex justify-center">
        <div className="flex rounded-md bg-slate-100 dark:bg-zinc-800 p-1">
          <button onClick={() => setCalculationMode('futureValue')} className={`px-4 py-1 text-sm rounded ${calculationMode === 'futureValue' ? 'bg-white dark:bg-zinc-700 shadow' : ''}`}>Future Value</button>
          <button onClick={() => setCalculationMode('findTenure')} className={`px-4 py-1 text-sm rounded ${calculationMode === 'findTenure' ? 'bg-white dark:bg-zinc-700 shadow' : ''}`}>Find Tenure</button>
          <button onClick={() => setCalculationMode('findPrincipal')} className={`px-4 py-1 text-sm rounded ${calculationMode === 'findPrincipal' ? 'bg-white dark:bg-zinc-700 shadow' : ''}`}>Find Principal</button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <AnimatePresence mode="wait">
            <motion.div
                key={calculationMode}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
            >
                {calculationMode !== 'findPrincipal' && (
                    <Input label="Principal Amount" id="inv-principal" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} icon="₹" />
                )}
                 {calculationMode !== 'futureValue' && (
                    <Input label="Target Matured Amount" id="inv-target" type="number" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} icon="₹" />
                )}
                {calculationMode !== 'findTenure' && (
                    <Input label="Investment Tenure (Years)" id="inv-tenure" type="number" value={tenure} onChange={(e) => setTenure(e.target.value)} />
                )}
            </motion.div>
        </AnimatePresence>

        <div className="space-y-6">
            <Input label="Expected Annual Return" id="inv-rate" type="number" value={rate} onChange={(e) => setRate(e.target.value)} icon="%" />
            {calculationMode === 'futureValue' && (
                <Input label="Tax Rate (on gains)" id="inv-tax" type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} icon="%" />
            )}
        </div>
      </div>
      
      <div className="mt-6 flex justify-center">
        <div className="flex rounded-md bg-slate-100 dark:bg-zinc-800 p-1">
          <button onClick={() => setInvestmentType('simple')} className={`px-4 py-1 text-sm rounded ${investmentType === 'simple' ? 'bg-white dark:bg-zinc-700 shadow' : ''}`}>Simple Interest</button>
          <button onClick={() => setInvestmentType('compound')} className={`px-4 py-1 text-sm rounded ${investmentType === 'compound' ? 'bg-white dark:bg-zinc-700 shadow' : ''}`}>Compound Interest</button>
        </div>
      </div>
      
      <AnimatePresence>
        {investmentType === 'compound' && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-6">
            <Select 
                label="Compounding Frequency" 
                id="compound-frequency" 
                options={compoundFrequencyOptions}
                value={compoundFrequency} 
                onChange={setCompoundFrequency}
             />
          </motion.div>
        )}
      </AnimatePresence>
      
      {result && (
        <motion.div 
          role="region"
          aria-live="polite"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 pt-6 border-t border-slate-200 dark:border-zinc-800"
        >
          {renderResult()}
        </motion.div>
      )}
    </Card>
  );
};

export default InvestmentCalculator;