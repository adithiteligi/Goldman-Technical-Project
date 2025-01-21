import React from 'react';

const CalculateButton = ({ calculate }) => {
    return (
        <div className="form-group">
            <button className="calculate-btn" onClick={calculate}>
                Calculate
            </button>
        </div>
    );
};

export default CalculateButton;
