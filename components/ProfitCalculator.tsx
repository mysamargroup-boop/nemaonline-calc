import React, { useState, useCallback, useEffect } from 'react';
import Card from './Card';
import Input from './Input';
import Button from './Button';
import { motion } from 'framer-motion';

const ProfitCalculator: React.FC = () => {
  const defaultState = {
    costPrice: '100',
    sellingPrice: '150',
    discount: '10',
    gst: '18',
  };

  const [costPrice, setCostPrice] = useState<string>(defaultState.costPrice);
  const [sellingPrice, setSellingPrice] = useState<string>(defaultState.sellingPrice);
  const [discount, setDiscount] = useState<string>(defaultState.discount);
  const [gst, setGst] = useState<string>(defaultState.gst);
  const [result, setResult] = useState<{
    finalPrice: number;
    profitBeforeTax: number;
    gstAmount: number;
    profitAfterTax: number;
    percentage: number;
  } | null>(null);

  const calculateProfit = useCallback(() => {
    const cp = parseFloat(costPrice);
    const sp = parseFloat(sellingPrice);
    const d = parseFloat(discount) || 0;
    const g = parseFloat(gst) || 0;

    if (cp > 0 && sp > 0) {
      const discountAmount = sp * (d / 100);
      const finalPrice = sp - discountAmount;
      const profitBeforeTax = finalPrice - cp;
      const gstAmount = profitBeforeTax > 0 ? profitBeforeTax * (g / 100) : 0;
      const profitAfterTax = profitBeforeTax - gstAmount;
      const percentage = (profitAfterTax / cp) * 100;
      setResult({ finalPrice, profitBeforeTax, gstAmount, profitAfterTax, percentage });
    } else {
      setResult(null);
    }
  }, [costPrice, sellingPrice, discount, gst]);
  
  useEffect(() => {
    calculateProfit();
  }, [calculateProfit]);

  const resetCalculator = () => {
      setCostPrice(defaultState.costPrice);
      setSellingPrice(defaultState.sellingPrice);
      setDiscount(defaultState.discount);
      setGst(defaultState.gst);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(value);
  };

  const isProfit = result ? result.profitAfterTax >= 0 : false;

  return (
    <Card title="eCommerce Profit & Discount Calculator" headerActions={<Button variant="secondary" onClick={resetCalculator} className="py-1 px-3 text-sm">Reset</Button>}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Input
          label="Cost Price"
          id="cost-price"
          type="number"
          value={costPrice}
          onChange={(e) => setCostPrice(e.target.value)}
          icon="₹"
        />
        <Input
          label="Selling Price (MRP)"
          id="selling-price"
          type="number"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
          icon="₹"
        />
        <Input
          label="Discount"
          id="discount"
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          icon="%"
        />
        <Input
          label="GST (Tax)"
          id="gst"
          type="number"
          value={gst}
          onChange={(e) => setGst(e.target.value)}
          icon="%"
        />
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
          <div className={`text-center mb-6 p-6 rounded-lg ${isProfit ? 'bg-green-50 dark:bg-green-900/50' : 'bg-red-50 dark:bg-red-900/50'}`}>
            <p className={`text-sm ${isProfit ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {isProfit ? 'Total Profit (After Tax)' : 'Total Loss'}
            </p>
            <p className={`text-4xl font-bold ${isProfit ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
              {formatCurrency(Math.abs(result.profitAfterTax))}
            </p>
            <p className={`text-lg font-medium ${isProfit ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
              ({result.percentage.toFixed(2)}%)
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-slate-600 dark:text-slate-400">
              <div className="p-4 bg-slate-50 dark:bg-zinc-900 rounded-lg">
                  <p className="text-sm">Final Selling Price</p>
                  <p className="font-semibold text-lg text-slate-800 dark:text-slate-200">{formatCurrency(result.finalPrice)}</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-zinc-900 rounded-lg">
                  <p className="text-sm">Profit (Before Tax)</p>
                  <p className="font-semibold text-lg text-slate-800 dark:text-slate-200">{formatCurrency(result.profitBeforeTax)}</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-zinc-900 rounded-lg">
                  <p className="text-sm">GST Amount</p>
                  <p className="font-semibold text-lg text-slate-800 dark:text-slate-200">{formatCurrency(result.gstAmount)}</p>
              </div>
          </div>
        </motion.div>
      )}
    </Card>
  );
};

export default ProfitCalculator;