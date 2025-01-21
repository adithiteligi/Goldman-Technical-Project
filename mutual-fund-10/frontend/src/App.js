import React, { useState } from 'react';
import InvestmentInput from './Components/InvestmentInput';
import TimeHorizonInput from './Components/TimeHorizonInput';
import CalculateButton from './Components/CalculateButton';
import ResultSummary from './Components/ResultSummary';
import './App.css';
import MutualFundDropdown from "./Components/MutualFundDropdown";

const App = () => {
    const [mutualFund, setMutualFund] = useState('Mutual Fund 1');
    const [investmentAmount, setInvestmentAmount] = useState(10000);
    const [timeHorizon, setTimeHorizon] = useState(10);
    const [result, setResult] = useState(null);

    const calculateFutureValue = () => {
        const returnRate = 15.72;
        const riskFreeRate = 4.57;
        const beta = 1;
        const earnings = (investmentAmount * returnRate / 100) * timeHorizon;
        const totalBalance = investmentAmount + earnings;

        setResult({
            initialAmount: investmentAmount,
            timeHorizon,
            returnRate,
            riskFreeRate,
            beta,
            earnings,
            totalBalance,
        });
    };

    return (
        <div className="calculator-container">
            <h2>Mutual Fund Calculator</h2>
            <div className="input-section">
                <MutualFundDropdown value={mutualFund} setValue={setMutualFund} />
                <InvestmentInput value={investmentAmount} setValue={setInvestmentAmount} />
                <TimeHorizonInput value={timeHorizon} setValue={setTimeHorizon} />
                <CalculateButton calculate={calculateFutureValue} />
            </div>
            {result && <ResultSummary result={result} />}
        </div>
    );
};

export default App;
