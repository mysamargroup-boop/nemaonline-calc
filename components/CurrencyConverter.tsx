import React, { useState, useCallback, useEffect } from 'react';
import Card from './Card';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import { motion } from 'framer-motion';
import { CURRENCY_RATES } from '../constants';

const SwapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3L4 7l4 4"/><path d="M4 7h16"/><path d="M16 21l4-4-4-4"/><path d="M20 17H4"/></svg>
);

const currencyOptions = Object.entries(CURRENCY_RATES).map(([code, { name }]) => ({
    value: code,
    label: `${code} - ${name}`
}));

const CurrencyConverter: React.FC = () => {
    const defaultState = {
        amount: '',
        fromCurrency: 'USD',
        toCurrency: 'INR',
    };

    const [amount, setAmount] = useState<string>(defaultState.amount);
    const [fromCurrency, setFromCurrency] = useState<string>(defaultState.fromCurrency);
    const [toCurrency, setToCurrency] = useState<string>(defaultState.toCurrency);
    const [result, setResult] = useState<number | null>(null);

    const calculateConversion = useCallback(() => {
        const amt = parseFloat(amount);
        const fromRate = CURRENCY_RATES[fromCurrency]?.rate;
        const toRate = CURRENCY_RATES[toCurrency]?.rate;

        if (amt > 0 && fromRate && toRate) {
            const amountInBase = amt / fromRate; // Convert amount to base currency (USD)
            const convertedAmount = amountInBase * toRate;
            setResult(convertedAmount);
        } else {
            setResult(null);
        }
    }, [amount, fromCurrency, toCurrency]);

    useEffect(() => {
        calculateConversion();
    }, [calculateConversion]);

    const resetCalculator = () => {
        setAmount(defaultState.amount);
        setFromCurrency(defaultState.fromCurrency);
        setToCurrency(defaultState.toCurrency);
    };

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const formatCurrency = (value: number, currency: string) => {
        try {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency,
                maximumFractionDigits: 2,
            }).format(value);
        } catch (e) {
            // Fallback for unsupported currency codes
            return `${currency} ${value.toFixed(2)}`;
        }
    };
    
    return (
        <Card title="Currency Converter" headerActions={<Button variant="secondary" onClick={resetCalculator} className="py-1 px-3 text-sm">Reset</Button>}>
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
                    id="from-currency" 
                    options={currencyOptions}
                    value={fromCurrency} 
                    onChange={setFromCurrency}
                />
                <Select 
                    label="To" 
                    id="to-currency" 
                    options={currencyOptions}
                    value={toCurrency} 
                    onChange={setToCurrency}
                />
            </div>
            
            <div className="flex justify-center my-4">
                <Button variant="secondary" onClick={swapCurrencies} className="w-auto px-4 py-2 flex items-center gap-2">
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
                    <p className="text-slate-600 dark:text-slate-400">{formatCurrency(parseFloat(amount) || 0, fromCurrency)} is equal to</p>
                    <p className="text-4xl font-bold text-blue-800 dark:text-white my-2">{formatCurrency(result, toCurrency)}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-500">
                        1 {fromCurrency} = {(CURRENCY_RATES[toCurrency].rate / CURRENCY_RATES[fromCurrency].rate).toFixed(4)} {toCurrency}
                    </p>
                </motion.div>
            )}
        </Card>
    );
};

export default CurrencyConverter;