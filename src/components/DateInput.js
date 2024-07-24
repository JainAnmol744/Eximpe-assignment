import React from 'react';

const DateInput = ({ date, setDate }) => {
  return (
    <div className="form-group">
      <label>Date</label>
      <input type='date' value={date} onChange={(e) => setDate(e.target.value)} />
    </div>
  );
};

export default DateInput;
