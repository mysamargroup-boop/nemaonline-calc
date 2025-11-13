
import React from 'react';
import { CalculatorInfo, CalculatorType } from './types';

const BankIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
);

const TagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.432 0l6.568-6.568a2.426 2.426 0 0 0 0-3.432L12.586 2.586Z"></path><circle cx="8.5" cy="8.5" r="1.5"></circle></svg>
);

const HeartPulseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path><path d="M3.22 12H9.5l.7-1 2.1 4.3 1.4-2.3h4.1"></path></svg>
);

const CakeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"></path><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"></path><path d="M2 21h20"></path><path d="M7 8v2"></path><path d="M12 8v2"></path><path d="M17 8v2"></path><path d="M7 4h.01"></path><path d="M12 4h.01"></path><path d="M17 4h.01"></path></svg>
);

const TrendingUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
);

const CurrencyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8"></circle><line x1="3" y1="12" x2="21" y2="12"></line><path d="M12 3a4 4 0 0 0 0 18V3z"></path></svg>
);

const ScaleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22"></line><path d="M12 2L6 8"></path><path d="M12 2l6 6"></path><path d="M12 22l-6-6"></path><path d="M12 22l6-6"></path><path d="M2 12h20"></path><path d="M2 12L5 7"></path><path d="M2 12l3 5"></path><path d="M22 12l-3-5"></path><path d="M22 12l-3 5"></path></svg>
);

const PiggyBankIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 21h4"></path><path d="M12 17v4"></path><path d="M14 7h-1.33a4 4 0 0 0-3.77 2.4"></path><path d="M18.83 8.23A4 4 0 0 1 15 12H9a4 4 0 0 1 0-8h1a3 3 0 0 1 3 3v1"></path><path d="M8.5 9.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"></path></svg>
);

const RulerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L3 8.4a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0L18 11.6"></path><path d="m21.3 21.3-1.4-1.4"></path><path d="M3.4 8.4 8 13"></path><path d="M12.3 3.4 18 9"></path><path d="m15.3 21.3 5.7-5.7"></path></svg>
);

const BellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>
);


export const CALCULATORS: CalculatorInfo[] = [
  {
    id: CalculatorType.EMI,
    name: 'EMI',
    description: 'Calculate your Equated Monthly Installment for home, car, or personal loans. Enter loan amount, interest rate, and tenure to get a detailed breakdown.',
    icon: <BankIcon />,
  },
  {
    id: CalculatorType.LOAN_COMPARISON,
    name: 'Loan Comparison',
    description: 'Compare two different loan options side-by-side. Analyze EMI, total interest, and total payment to choose the best loan for your needs.',
    icon: <ScaleIcon />,
  },
  {
    id: CalculatorType.RETIREMENT,
    name: 'Retirement',
    description: 'Plan for your future with our retirement calculator. Estimate the corpus you need to build for a comfortable retirement based on your savings and investments.',
    icon: <PiggyBankIcon />,
  },
  {
    id: CalculatorType.INVESTMENT,
    name: 'Investment',
    description: 'Project the future value of your investments. Calculate returns for both simple and compound interest to plan your financial goals effectively.',
    icon: <TrendingUpIcon />,
  },
  {
    id: CalculatorType.PROFIT,
    name: 'Profit/Discount',
    description: 'Easily calculate the profit, loss, and discount for your products. A perfect tool for e-commerce sellers and small business owners.',
    icon: <TagIcon />,
  },
  {
    id: CalculatorType.BMI,
    name: 'BMI',
    description: "Check your Body Mass Index (BMI) to understand your health status. See if you are underweight, normal, overweight, or obese.",
    icon: <HeartPulseIcon />,
  },
  {
    id: CalculatorType.AGE,
    name: 'Age',
    description: 'Calculate your exact age in years, months, and days from your date of birth. Discover total days lived and time until your next birthday.',
    icon: <CakeIcon />,
  },
  {
    id: CalculatorType.CURRENCY,
    name: 'Currency',
    description: 'Convert between major world currencies with our easy-to-use tool. Simple, fast, and accurate currency conversion.',
    icon: <CurrencyIcon />,
  },
  {
    id: CalculatorType.UNIT_CONVERTER,
    name: 'Unit Converter',
    description: 'A versatile tool to convert between various units of length and weight. Easily switch between meters, feet, kilograms, pounds, and more.',
    icon: <RulerIcon />,
  },
  {
    id: CalculatorType.EMI_REMINDER,
    name: 'EMI Reminder',
    description: 'Never miss an EMI payment again. Set up personalized reminders for your loan payments and stay on top of your finances.',
    icon: <BellIcon />,
  }
];


export const TOOL_DEFINITIONS: { [key in CalculatorType | 'HOME']: { title: string, description: string } } = {
    HOME: {
        title: 'NEMA Financial Calculators | All-in-One Toolkit (EMI, Investment, etc.)',
        description: 'Free financial calculators for EMI, investments, retirement, loans & more. Make smarter financial decisions with our easy-to-use, all-in-one toolkit.'
    },
    [CalculatorType.EMI]: {
        title: 'EMI Calculator - Calculate Loan EMIs Instantly',
        description: 'Accurately calculate your Equated Monthly Installment (EMI) for home, car, or personal loans. Plan your finances with our easy-to-use EMI calculator.'
    },
    [CalculatorType.LOAN_COMPARISON]: {
        title: 'Loan Comparison Calculator - Compare Two Loans Side-by-Side',
        description: 'Compare interest rates, EMIs, and total payouts for two different loans. Make an informed decision and choose the loan that best suits your needs.'
    },
    [CalculatorType.RETIREMENT]: {
        title: 'Retirement Planning Calculator - Secure Your Future',
        description: 'Estimate the retirement corpus you need. Plan your investments to achieve financial independence and a stress-free retired life.'
    },
    [CalculatorType.INVESTMENT]: {
        title: 'Investment Calculator - Project Your Investment Growth',
        description: 'Calculate the future value of your investments with options for simple & compound interest. A great tool for planning your SIP and lump-sum investments.'
    },
    [CalculatorType.PROFIT]: {
        title: 'Profit and Discount Calculator - For Your Business Needs',
        description: 'Quickly calculate profit margins, discounts, and selling prices. An essential tool for retailers, vendors, and business owners.'
    },
    [CalculatorType.BMI]: {
        title: 'BMI Calculator - Check Your Body Mass Index',
        description: 'Monitor your health with our BMI calculator. Find out if you are in a healthy weight range and get insights into your overall well-being.'
    },
    [CalculatorType.AGE]: {
        title: 'Age Calculator - Find Your Exact Age',
        description: 'Calculate your age in years, months, days, and even seconds. A fun and easy way to find out how old you are.'
    },
    [CalculatorType.CURRENCY]: {
        title: 'Currency Converter - Live Exchange Rates',
        description: 'Get real-time exchange rates and convert between all major currencies. A simple and reliable tool for travelers and international business.'
    },
    [CalculatorType.UNIT_CONVERTER]: {
        title: 'Unit Converter - Length, Weight, and More',
        description: 'An all-in-one unit converter for length, weight, temperature, and more. A handy tool for students, engineers, and everyday use.'
    },
    [CalculatorType.EMI_REMINDER]: {
        title: 'EMI Reminder - Never Miss a Payment',
        description: 'Set up timely reminders for your upcoming loan EMI payments. Manage your finances better and avoid late fees.'
    }
};


// Mock currency rates with USD as the base
export const CURRENCY_RATES: { [key: string]: { name: string, rate: number } } = {
  "USD": { name: "US Dollar", rate: 1 },
  "EUR": { name: "Euro", rate: 0.92 },
  "JPY": { name: "Japanese Yen", rate: 157.2 },
  "GBP": { name: "British Pound", rate: 0.79 },
  "AUD": { name: "Australian Dollar", rate: 1.5 },
  "CAD": { name: "Canadian Dollar", rate: 1.37 },
  "CHF": { name: "Swiss Franc", rate: 0.9 },
  "CNY": { name: "Chinese Yuan", rate: 7.25 },
  "INR": { name: "Indian Rupee", rate: 83.5 },
  "BRL": { name: "Brazilian Real", rate: 5.25 },
  "RUB": { name: "Russian Ruble", rate: 89.0 },
  "ZAR": { name: "South African Rand", rate: 18.7 },
  "MXN": { name: "Mexican Peso", rate: 17.5 },
  "SGD": { name: "Singapore Dollar", rate: 1.35 },
  "NZD": { name: "New Zealand Dollar", rate: 1.63 },
};

export const PATH_DEFINITIONS: { [key in CalculatorType]: string } = {
    [CalculatorType.EMI]: "/emi-calculator",
    [CalculatorType.LOAN_COMPARISON]: "/loan-comparison-calculator",
    [CalculatorType.RETIREMENT]: "/retirement-calculator",
    [CalculatorType.INVESTMENT]: "/investment-calculator",
    [CalculatorType.PROFIT]: "/profit-calculator",
    [CalculatorType.BMI]: "/bmi-calculator",
    [CalculatorType.AGE]: "/age-calculator",
    [CalculatorType.CURRENCY]: "/currency-converter",
    [CalculatorType.UNIT_CONVERTER]: "/unit-converter",
    [CalculatorType.EMI_REMINDER]: "/emi-reminder",
};