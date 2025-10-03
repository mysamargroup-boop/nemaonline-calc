import React, { useState, useEffect, useCallback, useRef } from 'react';
import Card from './Card';
import { motion, AnimatePresence } from 'framer-motion';
import PieChart from './PieChart';
import ExplainerModal from './ExplainerModal';
import BucketAnimation from './animations/BucketAnimation';


interface Result {
    emi: number;
    totalInterest: number;
    totalPayment: number;
}

const CustomNumberInput: React.FC<{
    icon: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}> = ({ icon, value, onChange, className = '' }) => (
    <div className={`flex items-center bg-teal-50/50 dark:bg-teal-900/20 rounded-lg p-1 w-40 ${className}`}>
        <span className="text-slate-500 dark:text-slate-400 px-2 font-semibold">{icon}</span>
        <input
            type="number"
            value={value}
            onChange={onChange}
            className="bg-transparent w-full text-right outline-none font-bold text-teal-600 dark:text-teal-400 pr-2"
            aria-label={`input for ${icon}`}
        />
    </div>
);

const LightbulbIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18 9 18 7a6 6 0 0 0-12 0c0 2 1.3 4.3 2.5 5.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
);


const EMICalculator: React.FC = () => {
  const [principal, setPrincipal] = useState('1000000');
  const [rate, setRate] = useState('8.5');
  const [tenure, setTenure] = useState('20');
  const [tenureUnit, setTenureUnit] = useState<'years' | 'months'>('years');
  
  const [flatResult, setFlatResult] = useState<Result | null>(null);
  const [reducingResult, setReducingResult] = useState<Result | null>(null);
  const [isExplainerOpen, setIsExplainerOpen] = useState(false);

  const calculateResults = useCallback(() => {
    const p = parseFloat(principal);
    const annualRate = parseFloat(rate);
    const tenureValue = parseFloat(tenure);

    if (isNaN(p) || isNaN(annualRate) || isNaN(tenureValue) || p <= 0 || annualRate <= 0 || tenureValue <= 0) {
      setFlatResult(null);
      setReducingResult(null);
      return;
    }

    const tenureInMonths = tenureUnit === 'years' ? tenureValue * 12 : tenureValue;
    const tenureInYears = tenureUnit === 'years' ? tenureValue : tenureValue / 12;

    // Flat Rate Calculation
    const flatTotalInterest = p * (annualRate / 100) * tenureInYears;
    const flatTotalPayment = p + flatTotalInterest;
    const flatEmi = flatTotalPayment / tenureInMonths;
    setFlatResult({ emi: flatEmi, totalInterest: flatTotalInterest, totalPayment: flatTotalPayment });

    // Reducing Balance Calculation
    const monthlyRate = annualRate / 12 / 100;
    const n = tenureInMonths;
    if (monthlyRate > 0) {
        const reducingEmi = (p * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
        const reducingTotalPayment = reducingEmi * n;
        const reducingTotalInterest = reducingTotalPayment - p;
        setReducingResult({ emi: reducingEmi, totalInterest: reducingTotalInterest, totalPayment: reducingTotalPayment });
    } else { // Handle 0 interest rate for reducing balance
        const reducingEmi = p / n;
        setReducingResult({ emi: reducingEmi, totalInterest: 0, totalPayment: p });
    }
  }, [principal, rate, tenure, tenureUnit]);

  useEffect(() => {
    calculateResults();
  }, [calculateResults]);
  
  const updateSliderBackground = (ref: React.RefObject<HTMLInputElement>) => {
      if (ref.current) {
          const min = parseFloat(ref.current.min);
          const max = parseFloat(ref.current.max);
          const val = parseFloat(ref.current.value) || min;
          const percentage = ((val - min) / (max - min)) * 100;
          ref.current.style.background = `linear-gradient(to right, #2dd4bf ${percentage}%, #e2e8f0 ${percentage}%)`;
          if (document.documentElement.classList.contains('dark')) {
              ref.current.style.background = `linear-gradient(to right, #2dd4bf ${percentage}%, #374151 ${percentage}%)`;
          }
      }
  };

  const principalRef = useRef<HTMLInputElement>(null);
  const rateRef = useRef<HTMLInputElement>(null);
  const tenureRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
      updateSliderBackground(principalRef);
  }, [principal]);

  useEffect(() => {
      updateSliderBackground(rateRef);
  }, [rate]);

  useEffect(() => {
      updateSliderBackground(tenureRef);
  }, [tenure]);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const principalAmount = parseFloat(principal) || 0;
  const savings = reducingResult && flatResult ? flatResult.totalPayment - reducingResult.totalPayment : 0;

  const pieData = (result: Result | null) => result ? [
    { label: 'Principal amount', value: principalAmount, color: '#60a5fa' }, // blue-400
    { label: 'Interest amount', value: result.totalInterest, color: '#3b82f6' }, // blue-500
  ] : [];

  return (
    <>
      <Card>
        <div className="space-y-8">
          {/* Loan Amount */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label htmlFor="principal" className="font-medium text-slate-700 dark:text-slate-300">Loan amount</label>
              <CustomNumberInput icon="₹" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
            </div>
            <input id="principal" type="range" min="10000" max="20000000" step="10000" value={principal} ref={principalRef} onChange={(e) => setPrincipal(e.target.value)} className="emi-slider" />
          </div>

          {/* Rate of Interest */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label htmlFor="rate" className="font-medium text-slate-700 dark:text-slate-300">Rate of interest (per annum)</label>
              <CustomNumberInput icon="%" value={rate} onChange={(e) => setRate(e.target.value)} />
            </div>
            <input id="rate" type="range" min="1" max="25" step="0.1" value={rate} ref={rateRef} onChange={(e) => setRate(e.target.value)} className="emi-slider" />
          </div>

          {/* Loan Tenure */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-6">
                  <label className="font-medium text-slate-700 dark:text-slate-300">Loan tenure</label>
                  <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                          <input type="radio" name="tenureUnit" value="years" checked={tenureUnit === 'years'} onChange={() => setTenureUnit('years')} className="emi-radio"/>
                          Years
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                          <input type="radio" name="tenureUnit" value="months" checked={tenureUnit === 'months'} onChange={() => setTenureUnit('months')} className="emi-radio"/>
                          Months
                      </label>
                  </div>
              </div>
              <CustomNumberInput icon="" value={tenure} onChange={(e) => setTenure(e.target.value)} />
            </div>
            <input id="tenure" type="range" min="1" max={tenureUnit === 'years' ? 30 : 360} step="1" value={tenure} ref={tenureRef} onChange={(e) => setTenure(e.target.value)} className="emi-slider" />
          </div>
        </div>
        
        {flatResult && reducingResult && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 pt-8 border-t border-slate-200 dark:border-zinc-800"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Flat Rate Results */}
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <h3 className="font-semibold text-slate-500 dark:text-slate-400">Flat interest rate</h3>
                   <button onClick={() => setIsExplainerOpen(true)} className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"><LightbulbIcon /></button>
                </div>
                <div className="mt-4 space-y-3">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Monthly EMI<span className="block font-bold text-2xl text-slate-800 dark:text-slate-200">{formatCurrency(flatResult.emi)}</span></p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total interest<span className="block font-bold text-lg text-slate-700 dark:text-slate-300">{formatCurrency(flatResult.totalInterest)}</span></p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total amount<span className="block font-bold text-lg text-slate-700 dark:text-slate-300">{formatCurrency(flatResult.totalPayment)}</span></p>
                </div>
              </div>
              {/* Reducing Rate Results */}
              <div className="text-center md:text-left md:border-l md:pl-8 border-slate-200 dark:border-zinc-700">
                 <div className="flex items-center gap-2 justify-center md:justify-start">
                  <h3 className="font-semibold text-slate-500 dark:text-slate-400">Reducing balance interest rate</h3>
                   <button onClick={() => setIsExplainerOpen(true)} className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"><LightbulbIcon /></button>
                </div>
                <div className="mt-4 space-y-3">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Monthly EMI<span className="block font-bold text-2xl text-slate-800 dark:text-slate-200">{formatCurrency(reducingResult.emi)}</span></p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total interest<span className="block font-bold text-lg text-slate-700 dark:text-slate-300">{formatCurrency(reducingResult.totalInterest)}</span></p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total amount<span className="block font-bold text-lg text-slate-700 dark:text-slate-300">{formatCurrency(reducingResult.totalPayment)}</span></p>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
               <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-3 rounded-full border-2 border-teal-400 text-teal-500 dark:text-teal-300 font-bold transition-colors hover:bg-teal-50 dark:hover:bg-teal-900/30">
                  Save {formatCurrency(savings)}
              </motion.button>
            </div>
            
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <PieChart data={pieData(flatResult)} centerText={<span className="font-bold text-lg text-slate-700 dark:text-slate-300">Flat</span>} />
              <PieChart data={pieData(reducingResult)} centerText={<div className="font-bold text-lg text-slate-700 dark:text-slate-300">Reducing<br/>balance</div>} />
            </div>
          </motion.div>
        )}
      </Card>
      <AnimatePresence>
        {isExplainerOpen && (
            <ExplainerModal 
                title="Flat vs. Reducing Interest: Kya Fark Hai?" 
                onClose={() => setIsExplainerOpen(false)}
                animation={<BucketAnimation />}
            >
                <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm md:text-base">
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-100">Flat Interest Rate (Mehenga Sauda)</h4>
                        <p>Socho aapne ek poori baalti paani (loan) udhaar li. Flat rate mein, aapse har mahine <strong className="text-red-500">poori baalti par hi byaaj (interest)</strong> liya jaayega, bhale hi aap dheere-dheere paani lauta rahe ho. Isliye yeh hamesha mehenga padta hai.</p>
                    </div>
                     <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-100">Reducing Balance Rate (Sahi Chunaav)</h4>
                        <p>Ismein, aapse sirf <strong className="text-green-500">baalti mein bache hue paani par hi byaaj</strong> liya jaata hai. Jaise-jaise aap EMI bharte hain, aapka udhaar kam hota hai, aur byaaj bhi usi par lagta hai. Yeh sasta aur behtar option hai.</p>
                    </div>
                </div>
            </ExplainerModal>
        )}
      </AnimatePresence>
    </>
  );
};

export default EMICalculator;