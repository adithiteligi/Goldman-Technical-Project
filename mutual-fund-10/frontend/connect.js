// // connect.js
// import React, { useState } from 'react';
// import axios from 'axios';
//
// function Calculator() {
//     const [principalAmount, setPrincipalAmount] = useState('');
//     const [ticker, setTicker] = useState('VSMPX');
//     const [numYears, setNumYears] = useState('');
//     const [result, setResult] = useState(null);
//     const [error, setError] = useState('');
//
//     const requestCalculatorReturn = () => {
//         const url = `http://127.0.0.1:5000/calculate?principal_amount=${principalAmount}&ticker=${ticker}&num_years=${numYears}`;
//
//         axios.get(url)
//             .then(response => {
//                 if (response.data['Investment Return']) {
//                     setResult({
//                         principalAmount: response.data['Principal Amount'],
//                         timeHorizon: response.data['Time Horizon'],
//                         returnRate: response.data['Return Rate'],
//                         riskFreeRate: response.data['Risk Free Rate'],
//                         mutualFundBeta: response.data['Mutual Fund Beta'],
//                         earnings: response.data['Earnings'],
//                         investmentReturn: response.data['Investment Return'],
//                     });
//                 }
//             })
//             .catch(error => {
//                 setError(`Error: ${error}`);
//             });
//     };
//
//     return (
//         <div className="calculator">
//             <h1>Investment Calculator</h1>
//             <form
//                 onSubmit={(e) => {
//                     e.preventDefault();
//                     requestCalculatorReturn();
//                 }}
//             >
//                 <label htmlFor="principal_amount">Principal Amount: </label>
//                 <input
//                     type="number"
//                     id="principal_amount"
//                     value={principalAmount}
//                     onChange={(e) => setPrincipalAmount(e.target.value)}
//                     required
//                 /><br /><br />
//
//                 <label htmlFor="ticker">Ticker Symbol: </label>
//                 <select
//                     id="ticker"
//                     value={ticker}
//                     onChange={(e) => setTicker(e.target.value)}
//                     required
//                 >
//                     <option value="VSMPX">VSMPX</option>
//                     <option value="FXAIX">FXAIX</option>
//                     <option value="VFIAX">VFIAX</option>
//                     <option value="VTSAX">VTSAX</option>
//                     <option value="SPAXX">SPAXX</option>
//                 </select><br /><br />
//
//                 <label htmlFor="num_years">Time Horizon (Years): </label>
//                 <input
//                     type="number"
//                     id="num_years"
//                     value={numYears}
//                     onChange={(e) => setNumYears(e.target.value)}
//                     required
//                 /><br /><br />
//
//                 <button type="submit">Calculate</button>
//             </form>
//
//             {error && <div style={{ color: 'red' }}>{error}</div>}
//
//             {result && (
//                 <div id="Investment Result Placement">
//                     <h3>Investment Result:</h3>
//                     <p>Principal Amount: {result.principalAmount}</p>
//                     <p>Time Horizon (Years): {result.timeHorizon}</p>
//                     <p>Market Return: {result.returnRate}</p>
//                     <p>Risk-Free Rate: {result.riskFreeRate}</p>
//                     <p>Beta: {result.mutualFundBeta}</p>
//                     <p>Earnings: {result.earnings}</p>
//                     <p>Investment Return: {result.investmentReturn}</p>
//                 </div>
//             )}
//         </div>
//     );
// }
//
// export default Calculator;
