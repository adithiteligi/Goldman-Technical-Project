// src/MutualFundDropdown.js
import React, { useState, useEffect } from 'react';
const MutualFundDropdown = ({ value, setValue }) => {
    return (
        <div className="form-group">
            <label>Mutual Fund</label>
            <select value={value} onChange={(e) => setValue(e.target.value)}>
                <option value="Mutual Fund 1">Mutual Fund 1</option>
                <option value="Mutual Fund 2">Mutual Fund 2</option>
                <option value="Mutual Fund 3">Mutual Fund 3</option>
            </select>
        </div>
    );
};
export default MutualFundDropdown;
