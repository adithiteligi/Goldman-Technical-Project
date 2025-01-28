import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import Shimmer from "./Shimmer"; // Import the shimmer component

function App() {
    const [principalAmount, setPrincipalAmount] = useState("");
    const [ticker, setTicker] = useState("VSMPX");
    const [numYears, setNumYears] = useState("");
    const [investmentResult, setInvestmentResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const requestCalculateReturn = () => {
        setLoading(true); // Start loading
        const url = `http://127.0.0.1:5000/calculate?principal_amount=${principalAmount}&ticker=${ticker}&num_years=${numYears}`;

        axios
            .get(url)
            .then((response) => {
                if (response.data["Investment Return"]) {
                    setInvestmentResult({
                        principalAmount: response.data["Principal Amount"],
                        timeHorizon: response.data["Time Horizon"],
                        returnRate: response.data["Return Rate"],
                        riskFreeRate: response.data["Risk Free Rate"],
                        mutualFundBeta: response.data["Mutual Fund Beta"],
                        earnings: response.data["Earnings"],
                        investmentReturn: response.data["Investment Return"],
                    });
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            })
            .finally(() => {
                setLoading(false); // End loading
            });
    };

    return (
        <div className="App">
            <h1>Mutual Fund Calculator</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    requestCalculateReturn();
                }}
            >
                <div className="form-group">
                    <label htmlFor="ticker">Mutual Fund:</label>
                    <select
                        id="ticker"
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value)}
                        required
                        className="input-field"
                    >
                        <option value="VSMPX">VSMPX</option>
                        <option value="FXAIX">FXAIX</option>
                        <option value="VFIAX">VFIAX</option>
                        <option value="VTSAX">VTSAX</option>
                        <option value="SPAXX">SPAXX</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="principal_amount">Initial Investment Amount:</label>
                    <input
                        type="number"
                        id="principal_amount"
                        value={principalAmount}
                        onChange={(e) => setPrincipalAmount(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="num_years">Time Horizon (in years):</label>
                    <input
                        type="number"
                        id="num_years"
                        value={numYears}
                        onChange={(e) => setNumYears(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>

                <button type="submit" className="calculate-button">
                    Calculate
                </button>
            </form>

            {/* Show shimmer while loading */}
            {loading && <Shimmer />}

            {/* Show results once loading is complete */}
            {!loading && investmentResult && (
                <div className="result-table">
                    <h2>Result Summary</h2>
                    <table>
                        <tbody>
                        <tr>
                            <th>Initial Amount (USD)</th>
                            <td>${investmentResult.principalAmount}</td>
                        </tr>
                        <tr>
                            <th>Time Horizon (years)</th>
                            <td>{investmentResult.timeHorizon}</td>
                        </tr>
                        <tr>
                            <th>Return Rate</th>
                            <td>{investmentResult.returnRate}%</td>
                        </tr>
                        <tr>
                            <th>Risk Free Rate</th>
                            <td>{investmentResult.riskFreeRate}%</td>
                        </tr>
                        <tr>
                            <th>Mutual Fund Beta</th>
                            <td>{investmentResult.mutualFundBeta}</td>
                        </tr>
                        <tr>
                            <th>Earnings (USD)</th>
                            <td style={{ backgroundColor: "yellow" }}>
                                ${investmentResult.earnings}
                            </td>
                        </tr>
                        <tr>
                            <th>Total Balance (USD)</th>
                            <td>${investmentResult.investmentReturn}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default App;
