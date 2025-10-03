import React, { useState, useCallback, useEffect } from 'react';
import Card from './Card';
import Input from './Input';
import Button from './Button';
import { motion } from 'framer-motion';

interface LoanDetails {
  principal: string;
  rate: string;
  tenure: string; // in years
}

interface LoanResult {
  emi: number;
  totalInterest: number;
  totalPayment: number;
}

const LoanComparisonCalculator: React.FC = () => {
  const initialLoanState: LoanDetails = { principal: '2500000', rate: '8.5', tenure: '20' };
  
  const [loan1, setLoan1] = useState<LoanDetails>(initialLoanState);
  const [loan2, setLoan2] = useState<LoanDetails>({ ...initialLoanState, rate: '9.0' });

  const [result1, setResult1] = useState<LoanResult | null>(null);
  const [result2, setResult2] = useState<LoanResult | null>(null);
  
  const calculateLoan = useCallback((loan: LoanDetails): LoanResult | null => {
    const p = parseFloat(loan.principal);
    const r = parseFloat(loan.rate) / 12 / 100;
    const t = parseFloat(loan.tenure) * 12;

    if (p > 0 && r > 0 && t > 0) {
      const emi = (p * r * Math.pow(1 + r, t)) / (Math.pow(1 + r, t) - 1);
      const totalPayment = emi * t;
      const totalInterest = totalPayment - p;
      return { emi, totalInterest, totalPayment };
    }
    return null;
  }, []);

  useEffect(() => {
    setResult1(calculateLoan(loan1));
    setResult2(calculateLoan(loan2));
  }, [loan1, loan2, calculateLoan]);

  const handleLoan1Change = (field: keyof LoanDetails, value: string) => {
    setLoan1(prev => ({ ...prev, [field]: value }));
  };
  
  const handleLoan2Change = (field: keyof LoanDetails, value: string) => {
    setLoan2(prev => ({ ...prev, [field]: value }));
  };

  const resetCalculator = () => {
      setLoan1(initialLoanState);
      setLoan2({ ...initialLoanState, rate: '9.0' });
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
  };

  const betterLoan = result1 && result2 
    ? (result1.totalPayment < result2.totalPayment ? 'Loan 1' : 'Loan 2') 
    : null;
  const savings = result1 && result2 
    ? Math.abs(result1.totalPayment - result2.totalPayment) 
    : 0;

  const LoanInputGroup: React.FC<{ title: string, loan: LoanDetails, onChange: (field: keyof LoanDetails, value: string) => void }> = ({ title, loan, onChange }) => (
    <div className="space-y-4 p-4 rounded-lg bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
      <h3 className="text-lg font-semibold text-blue-900 dark:text-white">{title}</h3>
      <Input label="Loan Amount" id={`${title}-principal`} type="number" value={loan.principal} onChange={(e) => onChange('principal', e.target.value)} icon="₹" />
      <Input label="Annual Interest Rate" id={`${title}-rate`} type="number" value={loan.rate} onChange={(e) => onChange('rate', e.target.value)} icon="%" />
      <Input label="Loan Tenure (Years)" id={`${title}-tenure`} type="number" value={loan.tenure} onChange={(e) => onChange('tenure', e.target.value)} />
    </div>
  );

  const LoanResultCard: React.FC<{ result: LoanResult | null }> = ({ result }) => (
    <div className="space-y-2">
      <p className="text-slate-500 dark:text-slate-400">Monthly EMI: <span className="font-bold text-slate-800 dark:text-slate-200">{result ? formatCurrency(result.emi) : '-'}</span></p>
      <p className="text-slate-500 dark:text-slate-400">Total Interest: <span className="font-bold text-slate-800 dark:text-slate-200">{result ? formatCurrency(result.totalInterest) : '-'}</span></p>
      <p className="text-slate-500 dark:text-slate-400">Total Payment: <span className="font-bold text-slate-800 dark:text-slate-200">{result ? formatCurrency(result.totalPayment) : '-'}</span></p>
    </div>
  );

  return (
    <Card title="Loan Comparison Calculator" headerActions={<Button variant="secondary" onClick={resetCalculator} className="py-1 px-3 text-sm">Reset</Button>}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <LoanInputGroup title="Loan 1" loan={loan1} onChange={handleLoan1Change} />
        <LoanInputGroup title="Loan 2" loan={loan2} onChange={handleLoan2Change} />
      </div>
      
      {result1 && result2 && (
        <motion.div 
          role="region"
          aria-live="polite"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 pt-6 border-t border-slate-200 dark:border-zinc-800"
        >
          <h3 className="text-xl font-bold text-center mb-6 text-slate-800 dark:text-slate-200">Comparison Result</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
              <LoanResultCard result={result1} />
              <LoanResultCard result={result2} />
          </div>
          <div className={`mt-8 text-center p-6 rounded-lg ${betterLoan === 'Loan 1' ? 'bg-green-50 dark:bg-green-900/50' : 'bg-green-50 dark:bg-green-900/50'}`}>
            <p className="text-lg font-semibold text-green-800 dark:text-green-300">
              {betterLoan} is the better option!
            </p>
            <p className="text-md text-green-600 dark:text-green-400">
              You will save a total of <span className="font-bold">{formatCurrency(savings)}</span> in interest payments.
            </p>
          </div>
        </motion.div>
      )}
    </Card>
  );
};

export default LoanComparisonCalculator;