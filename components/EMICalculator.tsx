import React, { useState, useEffect, useCallback } from 'react';
import Card from './Card';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import { motion, AnimatePresence } from 'framer-motion';
import PieChart from './PieChart';

type LoanType = 'custom' | 'home' | 'personal' | 'car';

const loanTypePresets = {
    home: { rate: '8.5', tenure: '20', tenureUnit: 'years' as 'years' | 'months' },
    personal: { rate: '11', tenure: '5', tenureUnit: 'years' as 'years' | 'months' },
    car: { rate: '9.5', tenure: '7', tenureUnit: 'years' as 'years' | 'months' },
    custom: { rate: '8.5', tenure: '20', tenureUnit: 'years' as 'years' | 'months' }
};

const loanTypeOptions = [
    { value: 'home', label: 'Home Loan' },
    { value: 'personal', label: 'Personal Loan' },
    { value: 'car', label: 'Car Loan' },
    { value: 'custom', label: 'Custom' }
];

const tenureUnitOptions = [
    { value: 'years', label: 'Years' },
    { value: 'months', label: 'Months' }
];

const EMICalculator: React.FC = () => {
  const defaultState = {
    principal: '1000000',
    rate: '8.5',
    tenure: '20',
    tenureUnit: 'years' as 'years' | 'months',
    loanType: 'home' as LoanType,
  };

  const [principal, setPrincipal] = useState<string>(defaultState.principal);
  const [rate, setRate] = useState<string>(defaultState.rate);
  const [tenure, setTenure] = useState<string>(defaultState.tenure);
  const [tenureUnit, setTenureUnit] = useState<'years' | 'months'>(defaultState.tenureUnit);
  const [loanType, setLoanType] = useState<LoanType>(defaultState.loanType);
  const [result, setResult] = useState<{
    emi: number;
    totalInterest: number;
    totalPayment: number;
  } | null>(null);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [showSchedule, setShowSchedule] = useState<boolean>(false);

  useEffect(() => {
    if (loanType !== 'custom') {
        const preset = loanTypePresets[loanType];
        setRate(preset.rate);
        setTenure(preset.tenure);
        setTenureUnit(preset.tenureUnit);
    }
  }, [loanType]);

  const calculateEMI = useCallback(() => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100;
    const t = tenureUnit === 'years' ? parseFloat(tenure) * 12 : parseFloat(tenure);

    if (p > 0 && r > 0 && t > 0) {
      const emi = (p * r * Math.pow(1 + r, t)) / (Math.pow(1 + r, t) - 1);
      const totalPayment = emi * t;
      const totalInterest = totalPayment - p;
      setResult({ emi, totalInterest, totalPayment });

      // Calculate Amortization Schedule
      let balance = p;
      const newSchedule = [];
      for (let i = 0; i < t; i++) {
        const interestPaid = balance * r;
        const principalPaid = emi - interestPaid;
        balance -= principalPaid;
        const year = Math.floor(i / 12) + 1;

        if (!newSchedule[year-1]) {
            newSchedule[year-1] = { year, principal: 0, interest: 0, total: 0, endBalance: 0 };
        }
        newSchedule[year-1].principal += principalPaid;
        newSchedule[year-1].interest += interestPaid;
        newSchedule[year-1].total += emi;
        newSchedule[year-1].endBalance = balance > 0 ? balance : 0;
      }
      setSchedule(newSchedule);

    } else {
      setResult(null);
      setSchedule([]);
    }
  }, [principal, rate, tenure, tenureUnit]);
  
  useEffect(() => {
    calculateEMI();
  }, [calculateEMI]);

  const resetCalculator = () => {
      setPrincipal(defaultState.principal);
      setRate(defaultState.rate);
      setTenure(defaultState.tenure);
      setTenureUnit(defaultState.tenureUnit);
      setLoanType(defaultState.loanType);
      setShowSchedule(false);
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const principalAmount = parseFloat(principal) || 0;
  
  const pieChartData = result ? [
    { label: 'Principal Amount', value: principalAmount, color: '#404040' }, // zinc-700
    { label: 'Total Interest', value: result.totalInterest, color: '#737373' } // zinc-500
  ] : [];

  return (
    <Card title="EMI Calculator" headerActions={<Button variant="secondary" onClick={resetCalculator} className="py-1 px-3 text-sm">Reset</Button>}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div>
            <Select
                label="Loan Type"
                id="loan-type"
                options={loanTypeOptions}
                value={loanType}
                onChange={(value) => setLoanType(value as LoanType)}
            />
        </div>
        <div>
            {/* Placeholder for alignment */}
        </div>

        <div className="md:col-span-2">
            <Input
                label="Loan Amount"
                id="principal"
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                icon="₹"
            />
            <input
                type="range"
                min="10000"
                max="5000000"
                step="10000"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="w-full h-2 bg-slate-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer mt-2 accent-slate-200"
            />
        </div>
        <div>
            <Input
                label="Annual Interest Rate"
                id="rate"
                type="number"
                value={rate}
                onChange={(e) => {
                    setRate(e.target.value);
                    setLoanType('custom');
                }}
                icon="%"
            />
            <input
                type="range"
                min="1"
                max="20"
                step="0.1"
                value={rate}
                 onChange={(e) => {
                    setRate(e.target.value);
                    setLoanType('custom');
                }}
                className="w-full h-2 bg-slate-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer mt-2 accent-slate-200"
            />
        </div>
        <div className="grid grid-cols-2 gap-2 items-end">
             <div>
                <Input
                    label="Loan Tenure"
                    id="tenure"
                    type="number"
                    value={tenure}
                    onChange={(e) => {
                        setTenure(e.target.value);
                        setLoanType('custom');
                    }}
                />
                 <input
                    type="range"
                    min="1"
                    max={tenureUnit === 'years' ? 30 : 360}
                    step="1"
                    value={tenure}
                    onChange={(e) => {
                        setTenure(e.target.value);
                        setLoanType('custom');
                    }}
                    className="w-full h-2 bg-slate-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer mt-2 accent-slate-200"
                />
            </div>
            <Select
                label=" "
                id="tenure-unit"
                options={tenureUnitOptions}
                value={tenureUnit}
                onChange={(value) => {
                    setTenureUnit(value as 'years' | 'months');
                    setLoanType('custom');
                }}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-4">
                <div className="text-center">
                    <p className="text-slate-500 dark:text-slate-400">Monthly EMI</p>
                    <p className="text-4xl font-bold text-blue-800 dark:text-white">{formatCurrency(result.emi)}</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-zinc-900 rounded-lg text-center">
                    <p className="text-sm text-slate-500 dark:text-zinc-400">Total Interest</p>
                    <p className="text-2xl font-semibold text-slate-800 dark:text-zinc-200">{formatCurrency(result.totalInterest)}</p>
                </div>
                <div className="p-4 bg-slate-100 dark:bg-zinc-800 rounded-lg text-center">
                    <p className="text-sm text-slate-500 dark:text-zinc-400">Total Payment</p>
                    <p className="text-2xl font-semibold text-slate-800 dark:text-zinc-200">{formatCurrency(result.totalPayment)}</p>
                </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-center mb-4 text-slate-700 dark:text-slate-300">Payment Breakdown</h3>
              <PieChart data={pieChartData} />
            </div>
          </div>
          <div className="text-center mt-6">
              <Button variant="secondary" onClick={() => setShowSchedule(!showSchedule)}>
                  {showSchedule ? 'Hide' : 'View'} Amortization Schedule
              </Button>
          </div>
        </motion.div>
      )}
      <AnimatePresence>
        {showSchedule && schedule.length > 0 && (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="mt-6 overflow-x-auto"
            >
                <div className="max-h-96 overflow-y-auto rounded-lg border border-slate-200 dark:border-zinc-800 custom-scrollbar">
                    <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-100 dark:bg-zinc-900 dark:text-slate-300 sticky top-0">
                            <tr>
                                <th scope="col" className="px-6 py-3">Year</th>
                                <th scope="col" className="px-6 py-3">Principal</th>
                                <th scope="col" className="px-6 py-3">Interest</th>
                                <th scope="col" className="px-6 py-3">Total Payment</th>
                                <th scope="col" className="px-6 py-3">Ending Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedule.map(row => (
                                <tr key={row.year} className="bg-white dark:bg-zinc-900/50 border-b dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800">
                                    <th scope="row" className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">{row.year}</th>
                                    <td className="px-6 py-4">{formatCurrency(row.principal)}</td>
                                    <td className="px-6 py-4">{formatCurrency(row.interest)}</td>
                                    <td className="px-6 py-4">{formatCurrency(row.total)}</td>
                                    <td className="px-6 py-4">{formatCurrency(row.endBalance)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default EMICalculator;