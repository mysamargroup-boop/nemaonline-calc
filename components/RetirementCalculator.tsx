import React, { useState, useCallback, useEffect } from 'react';
import Card from './Card';
import Input from './Input';
import Button from './Button';
import PieChart from './PieChart';
import { motion } from 'framer-motion';

const RetirementCalculator: React.FC = () => {
    const defaultState = {
        currentAge: '30',
        retirementAge: '60',
        currentSavings: '500000',
        monthlyContribution: '15000',
        returnRate: '12',
        inflationRate: '6',
    };

    const [currentAge, setCurrentAge] = useState<string>(defaultState.currentAge);
    const [retirementAge, setRetirementAge] = useState<string>(defaultState.retirementAge);
    const [currentSavings, setCurrentSavings] = useState<string>(defaultState.currentSavings);
    const [monthlyContribution, setMonthlyContribution] = useState<string>(defaultState.monthlyContribution);
    const [returnRate, setReturnRate] = useState<string>(defaultState.returnRate);
    const [inflationRate, setInflationRate] = useState<string>(defaultState.inflationRate);

    const [result, setResult] = useState<{
        totalCorpus: number;
        totalInvested: number;
        wealthGained: number;
        corpusInTodayValue: number;
    } | null>(null);

    const calculateRetirement = useCallback(() => {
        const age = parseInt(currentAge);
        const retAge = parseInt(retirementAge);
        const savings = parseFloat(currentSavings);
        const contribution = parseFloat(monthlyContribution);
        const rate = parseFloat(returnRate) / 100;
        const inflation = parseFloat(inflationRate) / 100;

        if (isNaN(age) || isNaN(retAge) || isNaN(savings) || isNaN(contribution) || isNaN(rate) || isNaN(inflation)) {
            setResult(null);
            return;
        }

        const investmentPeriod = retAge - age;
        if (investmentPeriod <= 0 || rate <= 0) {
            setResult(null);
            return;
        }

        const months = investmentPeriod * 12;
        const monthlyRate = rate / 12;

        const fvOfSavings = savings * Math.pow(1 + monthlyRate, months);
        const fvOfContributions = contribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

        const totalCorpus = fvOfSavings + fvOfContributions;
        const totalInvested = savings + (contribution * months);
        const wealthGained = totalCorpus - totalInvested;
        const corpusInTodayValue = totalCorpus / Math.pow(1 + inflation, investmentPeriod);

        setResult({ totalCorpus, totalInvested, wealthGained, corpusInTodayValue });

    }, [currentAge, retirementAge, currentSavings, monthlyContribution, returnRate, inflationRate]);

    useEffect(() => {
        calculateRetirement();
    }, [calculateRetirement]);

    const resetCalculator = () => {
        setCurrentAge(defaultState.currentAge);
        setRetirementAge(defaultState.retirementAge);
        setCurrentSavings(defaultState.currentSavings);
        setMonthlyContribution(defaultState.monthlyContribution);
        setReturnRate(defaultState.returnRate);
        setInflationRate(defaultState.inflationRate);
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
    };
    
    const pieChartData = result ? [
        { label: 'Total Invested', value: result.totalInvested, color: '#404040' }, // zinc-700
        { label: 'Wealth Gained', value: result.wealthGained, color: '#737373' } // zinc-500
    ] : [];

    return (
        <Card title="Retirement Planner" headerActions={<Button variant="secondary" onClick={resetCalculator} className="py-1 px-3 text-sm">Reset</Button>}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Input label="Current Age" id="current-age" type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} />
                <Input label="Retirement Age" id="retirement-age" type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} />
                <Input label="Current Savings" id="current-savings" type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} icon="₹" />
                <Input label="Monthly Contribution" id="monthly-contribution" type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} icon="₹" />
                <Input label="Expected Annual Return" id="return-rate" type="number" value={returnRate} onChange={(e) => setReturnRate(e.target.value)} icon="%" />
                <Input label="Expected Inflation Rate" id="inflation-rate" type="number" value={inflationRate} onChange={(e) => setInflationRate(e.target.value)} icon="%" />
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
                        <div className="space-y-4">
                             <div className="text-center p-6 bg-slate-50 dark:bg-zinc-900 rounded-lg">
                                <p className="text-slate-500 dark:text-slate-400">Total Retirement Corpus</p>
                                <p className="text-4xl font-bold text-blue-800 dark:text-white">{formatCurrency(result.totalCorpus)}</p>
                            </div>
                             <div className="text-center p-4 bg-slate-100 dark:bg-zinc-800 rounded-lg">
                                <p className="text-sm text-slate-500 dark:text-zinc-400">Value of Corpus in Today's Money</p>
                                <p className="text-2xl font-semibold text-slate-800 dark:text-zinc-200">{formatCurrency(result.corpusInTodayValue)}</p>
                            </div>
                        </div>
                         <div>
                            <h3 className="text-lg font-semibold text-center mb-4 text-slate-700 dark:text-slate-300">Corpus Breakdown</h3>
                            <PieChart data={pieChartData} />
                        </div>
                    </div>
                </motion.div>
            )}
        </Card>
    );
};

export default RetirementCalculator;