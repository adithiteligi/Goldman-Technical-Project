import React from 'react';

const TimeHorizonInput = ({ value, setValue }) => {
    return (
        <div className="form-group">
            <label>Time Horizon (in years)</label>
            <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter years"
            />
        </div>
    );
};

export default TimeHorizonInput;
