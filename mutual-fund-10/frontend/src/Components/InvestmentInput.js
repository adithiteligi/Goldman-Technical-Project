import React from 'react';

const InvestmentInput = ({ value, setValue }) => {
    return (
        <div className="form-group">
            <label>Initial Investment Amount</label>
            <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter amount"
            />
        </div>
    );
};

export default InvestmentInput;
