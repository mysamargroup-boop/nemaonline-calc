
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import EMICalculator from "./components/EMICalculator";
import LoanComparisonCalculator from "./components/LoanComparisonCalculator";
import RetirementCalculator from "./components/RetirementCalculator";
import InvestmentCalculator from "./components/InvestmentCalculator";
import ProfitCalculator from "./components/ProfitCalculator";
import BMICalculator from "./components/BMICalculator";
import AgeCalculator from "./components/AgeCalculator";
import CurrencyConverter from "./components/CurrencyConverter";
import UnitConverter from "./components/UnitConverter";
import EMIReminder from "./components/EMIReminder";
import NotFound from "./components/NotFound";

export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "emi-calculator",
                element: <EMICalculator />,
            },
            {
                path: "loan-comparison-calculator",
                element: <LoanComparisonCalculator />,
            },
            {
                path: "retirement-calculator",
                element: <RetirementCalculator />,
            },
            {
                path: "investment-calculator",
                element: <InvestmentCalculator />,
            },
            {
                path: "profit-calculator",
                element: <ProfitCalculator />,
            },
            {
                path: "bmi-calculator",
                element: <BMICalculator />,
            },
            {
                path: "age-calculator",
                element: <AgeCalculator />,
            },
            {
                path: "currency-converter",
                element: <CurrencyConverter />,
            },
            {
                path: "unit-converter",
                element: <UnitConverter />,
            },
            {
                path: "emi-reminder",
                element: <EMIReminder />,
            },
        ]
    },
    {
        path: "*",
        element: <NotFound />,
    }
]);
