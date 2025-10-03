import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Card from './Card';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import { motion } from 'framer-motion';

// Conversion data
// Fix: Add explicit types for the UNITS object to help TypeScript's inference,
// resolving the issue where `name` was not found on the destructured unit object
// when using Object.entries on a union of object types.
interface UnitDefinition {
  name: string;
  factor: number;
}
type ConversionType = 'length' | 'weight';

const UNITS: Record<ConversionType, { base: string, factors: Record<string, UnitDefinition> }> = {
  length: {
    base: 'm',
    factors: {
      m: { name: 'Meter', factor: 1 },
      km: { name: 'Kilometer', factor: 1000 },
      cm: { name: 'Centimeter', factor: 0.01 },
      mm: { name: 'Millimeter', factor: 0.001 },
      mi: { name: 'Mile', factor: 1609.34 },
      yd: { name: 'Yard', factor: 0.9144 },
      ft: { name: 'Foot', factor: 0.3048 },
      in: { name: 'Inch', factor: 0.0254 },
    },
  },
  weight: {
    base: 'g',
    factors: {
      g: { name: 'Gram', factor: 1 },
      kg: { name: 'Kilogram', factor: 1000 },
      mg: { name: 'Milligram', factor: 0.001 },
      t: { name: 'Metric Ton', factor: 1000000 },
      lb: { name: 'Pound', factor: 453.592 },
      oz: { name: 'Ounce', factor: 28.3495 },
    },
  },
};

const SwapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3L4 7l4 4"/><path d="M4 7h16"/><path d="M16 21l4-4-4-4"/><path d="M20 17H4"/></svg>
);

const UnitConverter: React.FC = () => {
    const [conversionType, setConversionType] = useState<ConversionType>('length');
    const [fromUnit, setFromUnit] = useState<string>('m');
    const [toUnit, setToUnit] = useState<string>('ft');
    const [amount, setAmount] = useState<string>('1');
    const [result, setResult] = useState<string | null>(null);

    const unitOptions = useMemo(() => {
        const currentFactors = UNITS[conversionType].factors;
        return Object.entries(currentFactors).map(([code, { name }]) => ({
            value: code,
            label: `${name} (${code})`,
        }));
    }, [conversionType]);

    const calculateConversion = useCallback(() => {
        const amt = parseFloat(amount);
        const currentUnits = UNITS[conversionType].factors;

        if (!isNaN(amt) && fromUnit in currentUnits && toUnit in currentUnits) {
            const fromFactor = currentUnits[fromUnit as keyof typeof currentUnits].factor;
            const toFactor = currentUnits[toUnit as keyof typeof currentUnits].factor;
            const amountInBase = amt * fromFactor;
            const convertedAmount = amountInBase / toFactor;
            setResult(convertedAmount.toLocaleString(undefined, { maximumFractionDigits: 5 }));
        } else {
            setResult(null);
        }
    }, [amount, fromUnit, toUnit, conversionType]);

    useEffect(() => {
        calculateConversion();
    }, [calculateConversion]);

    useEffect(() => {
        // Reset units when conversion type changes
        if (conversionType === 'length') {
            setFromUnit('m');
            setToUnit('ft');
        } else {
            setFromUnit('kg');
            setToUnit('lb');
        }
    }, [conversionType]);

    const resetCalculator = () => {
        setConversionType('length');
        setAmount('1');
        setFromUnit('m');
        setToUnit('ft');
    };

    const swapUnits = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
    };
    
    return (
        <Card title="Unit Converter" headerActions={<Button variant="secondary" onClick={resetCalculator} className="py-1 px-3 text-sm">Reset</Button>}>
            <div className="mb-6 flex justify-center">
                <div className="flex rounded-md bg-slate-100 dark:bg-zinc-800 p-1">
                    <button onClick={() => setConversionType('length')} className={`px-4 py-1 text-sm rounded ${conversionType === 'length' ? 'bg-white dark:bg-zinc-700 shadow' : ''}`}>Length</button>
                    <button onClick={() => setConversionType('weight')} className={`px-4 py-1 text-sm rounded ${conversionType === 'weight' ? 'bg-white dark:bg-zinc-700 shadow' : ''}`}>Weight</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <Input
                    label="Amount"
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <Select 
                    label="From" 
                    id="from-unit" 
                    options={unitOptions}
                    value={fromUnit} 
                    onChange={setFromUnit}
                />
                <Select 
                    label="To" 
                    id="to-unit" 
                    options={unitOptions}
                    value={toUnit} 
                    onChange={setToUnit}
                />
            </div>
            
            <div className="flex justify-center my-4">
                <Button variant="secondary" onClick={swapUnits} className="w-auto px-4 py-2 flex items-center gap-2">
                    <SwapIcon /> Swap
                </Button>
            </div>

            {result !== null && (
                <motion.div
                    role="region"
                    aria-live="polite"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-6 pt-6 border-t border-slate-200 dark:border-gray-800 text-center"
                >
                    <p className="text-slate-600 dark:text-slate-400">Result</p>
                    <p className="text-4xl font-bold text-blue-800 dark:text-white my-2">
                        {result} <span className="text-2xl text-slate-500">{toUnit}</span>
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-500">
                        {(amount || 0)} {fromUnit} = {result} {toUnit}
                    </p>
                </motion.div>
            )}
        </Card>
    );
};

export default UnitConverter;