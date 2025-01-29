import axios from "axios";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "./App.css";
import "./components/InvestmentChart";
import Shimmer from "./Shimmer";

function App() {
  const [principalAmount, setPrincipalAmount] = useState("");
  const [ticker, setTicker] = useState("VSMPX");
  const [numYears, setNumYears] = useState("");
  const [investmentResult, setInvestmentResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const requestCalculateReturn = () => {
    setLoading(true);
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
        setLoading(false);
      });
  };

  const generateChartData = () => {
    if (!investmentResult) return null;

    const { principalAmount, returnRate, timeHorizon } = investmentResult;
    const years = Array.from({ length: timeHorizon }, (_, i) => i + 1);
    const data = years.map((year) =>
      (
        principalAmount *
        Math.exp(returnRate * year)
      ).toFixed(2)
    );

    return {
      labels: years,
      datasets: [
        {
          label: "Investment Growth Over Time",
          data: data,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
      ],
    };
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

      {loading && <Shimmer />}

      {!loading && investmentResult && (
        <>
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
                    ${investmentResult.earnings.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <th>Total Balance (USD)</th>
                  <td>${investmentResult.investmentReturn.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="chart-container">
            <h2>Investment Growth Over Time</h2>
            <Line data={generateChartData()} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
