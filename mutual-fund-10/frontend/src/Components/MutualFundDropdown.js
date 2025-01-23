import React, { useState, useEffect } from 'react';

const MutualFundDropdown = ({ value, setValue }) => {
    const [mutualFunds, setMutualFunds] = useState([]);

    // Fetch mutual funds data from Flask backend
    useEffect(() => {
        fetch('http://127.0.0.1:5000/mutual-funds')  // Adjust URL if needed
            .then((response) => response.json())
            .then((data) => {
                // Convert data into an array format for easy use in the dropdown
                const fundList = Object.keys(data).map((fundName) => ({
                    name: fundName,
                    ticker: data[fundName].ticker,
                    currentPrice: data[fundName].current_price,
                    oneYearReturn: data[fundName]['1_year_return'], // Use bracket notation for keys with numbers
                    fiveYearReturn: data[fundName]['5_year_return'], // Use bracket notation for keys with numbers
                }));
                setMutualFunds(fundList);
            })
            .catch((error) => console.error('Error fetching mutual funds:', error));
    }, []);

    return (
        <div className="form-group">
            <label>Mutual Fund</label>
            <select value={value} onChange={(e) => setValue(e.target.value)}>
                {mutualFunds.map((fund) => (
                    <option key={fund.ticker} value={fund.ticker}>
                        {fund.name} ({fund.ticker}) - ${fund.currentPrice} | 1-Year Return: {fund.oneYearReturn * 100}% | 5-Year Return: {fund.fiveYearReturn * 100}%
                    </option>
                ))}
            </select>
        </div>
    );
};

export default MutualFundDropdown;
