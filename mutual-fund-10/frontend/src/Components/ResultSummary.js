import React from 'react';

const ResultSummary = ({ result }) => {
    return (
        <div className="result-section">
            <h3>Result Summary</h3>
            <table>
                <tbody>
                <tr>
                    <td>Initial Amount (USD)</td>
                    <td>${result.initialAmount.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Time Horizon (years)</td>
                    <td>{result.timeHorizon}</td>
                </tr>
                <tr>
                    <td>Return Rate</td>
                    <td>{result.returnRate}%</td>
                </tr>
                <tr>
                    <td>Risk Free Rate</td>
                    <td>{result.riskFreeRate}%</td>
                </tr>
                <tr>
                    <td>Mutual Fund Beta</td>
                    <td>{result.beta}</td>
                </tr>
                <tr className="highlight">
                    <td>Earnings (USD)</td>
                    <td>${result.earnings.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Total Balance (USD)</td>
                    <td>${result.totalBalance.toFixed(2)}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ResultSummary;
