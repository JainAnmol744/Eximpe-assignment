import React from 'react';

const AmountInput = ({ amount, setAmount }) => {
  return (
    <div className="form-group">
      <label>Amount</label>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
    </div>
  );
};

export default AmountInput;
