import React, { useState, useEffect } from 'react';
import Card from './Card';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import { motion, AnimatePresence } from 'framer-motion';

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
);

interface Reminder {
    id: string;
    loanName: string;
    emiAmount: string;
    dueDate: string;
}

const dayOptions = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1)
}));

const EMIReminder: React.FC = () => {
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [loanName, setLoanName] = useState('');
    const [emiAmount, setEmiAmount] = useState('');
    const [dueDate, setDueDate] = useState('1');

    useEffect(() => {
        try {
            const storedReminders = localStorage.getItem('emiReminders');
            if (storedReminders) {
                setReminders(JSON.parse(storedReminders));
            }
        } catch (error) {
            console.error("Failed to parse reminders from localStorage", error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('emiReminders', JSON.stringify(reminders));
        } catch (error) {
            console.error("Failed to save reminders to localStorage", error);
        }
    }, [reminders]);

    const handleAddReminder = (e: React.FormEvent) => {
        e.preventDefault();
        if (loanName && emiAmount && dueDate) {
            const newReminder: Reminder = {
                id: new Date().toISOString(),
                loanName,
                emiAmount,
                dueDate
            };
            setReminders(prev => [...prev, newReminder]);
            setLoanName('');
            setEmiAmount('');
            setDueDate('1');
        }
    };

    const handleDeleteReminder = (id: string) => {
        setReminders(prev => prev.filter(r => r.id !== id));
    };

    const getOrdinalSuffix = (day: number) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };

    const formatCurrency = (value: string) => {
        const num = parseFloat(value);
        if (isNaN(num)) return '';
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(num);
    };

    return (
        <Card title="EMI Reminder & Notification">
            <form onSubmit={handleAddReminder} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <Input
                    label="Loan Name"
                    id="loan-name"
                    type="text"
                    value={loanName}
                    onChange={(e) => setLoanName(e.target.value)}
                    placeholder="e.g., Home Loan"
                    required
                />
                <Input
                    label="EMI Amount"
                    id="emi-amount"
                    type="number"
                    value={emiAmount}
                    onChange={(e) => setEmiAmount(e.target.value)}
                    icon="₹"
                    required
                />
                <Select
                    label="EMI Due Date"
                    id="due-date"
                    options={dayOptions}
                    value={dueDate}
                    onChange={setDueDate}
                />
                <Button type="submit">Set Reminder</Button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-zinc-800">
                <h3 className="text-xl font-bold text-center mb-6 text-slate-800 dark:text-slate-200">Active Reminders</h3>
                {reminders.length === 0 ? (
                    <p className="text-center text-slate-500 dark:text-slate-400">You have no active EMI reminders.</p>
                ) : (
                    <ul className="space-y-4 max-w-2xl mx-auto">
                        <AnimatePresence>
                            {reminders.map((reminder, index) => (
                                <motion.li
                                    key={reminder.id}
                                    layout
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
                                    transition={{ duration: 0.4, delay: index * 0.05, type: 'spring', stiffness: 300, damping: 30 }}
                                    className="flex justify-between items-center p-4 rounded-lg bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800"
                                >
                                    <div>
                                        <p className="font-semibold text-slate-800 dark:text-slate-200">{reminder.loanName}</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            {formatCurrency(reminder.emiAmount)} due on the {reminder.dueDate}{getOrdinalSuffix(parseInt(reminder.dueDate))} of every month.
                                        </p>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handleDeleteReminder(reminder.id)}
                                        className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full"
                                        aria-label={`Delete reminder for ${reminder.loanName}`}
                                    >
                                        <TrashIcon />
                                    </motion.button>
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </ul>
                )}
            </div>
        </Card>
    );
};

export default EMIReminder;
