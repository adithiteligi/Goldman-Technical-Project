// src/Dropdown.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dropdown = ({ onSelect }) => {
    const [funds, setFunds] = useState([]);

    // Fetch mutual fund data on component mount
    useEffect(() => {
        axios.get('https://api.example.com/mutual-funds')  // Replace with your actual API URL
            .then((response) => setFunds(response.data))
            .catch((error) => console.error("Error fetching mutual funds:", error));
    }, []);

    return (
        <div>
            <label>Select a Mutual Fund: </label>
            <select onChange={(e) => onSelect(e.target.value)}>
                <option value="">Select a Fund</option>
                {funds.map((fund) => (
                    <option key={fund.ticker} value={fund.ticker}>
                        {fund.name} ({fund.ticker})
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
