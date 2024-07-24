import React from 'react';

const CurrencySelector = ({ label, currency, setCurrency, currencyList }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option defaultChecked={true} disabled value=''>Select {label}</option>
        {
          currencyList.map((item, index) => (
            <option key={index} value={item[0]}>{item[0]} - {item[1]}</option>
          ))
        }
      </select>
    </div>
  );
};

export default CurrencySelector;
