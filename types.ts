import React from 'react';

export enum CalculatorType {
  EMI = 'EMI',
  PROFIT = 'PROFIT',
  BMI = 'BMI',
  AGE = 'AGE',
  INVESTMENT = 'INVESTMENT',
  CURRENCY = 'CURRENCY',
  LOAN_COMPARISON = 'LOAN_COMPARISON',
  RETIREMENT = 'RETIREMENT',
}

export interface CalculatorInfo {
  id: CalculatorType;
  name: string;
  // Fix: Changed type to React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
  icon: React.ReactElement;
}