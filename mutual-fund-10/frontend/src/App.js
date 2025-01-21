// src/App.js
import React, { useState } from 'react';
import Dropdown from './Components/Dropdown';

const App = () => {
  const [selectedFund, setSelectedFund] = useState('');

  const handleFundSelect = (fundTicker) => {
    setSelectedFund(fundTicker);
  };

  return (
      <div>
        <h1>Mutual Fund Investment Predictor</h1>
        <Dropdown onSelect={handleFundSelect} />
        {selectedFund && <p>You selected: {selectedFund}</p>}
      </div>
  );
};

export default App;
