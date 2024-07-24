import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CurrencySelector from './CurrencySelector';
import AmountInput from './AmountInput';
import DateInput from './DateInput';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(0);
  const [sourceCurrency, setSourceCurrency] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [currencyList, setCurrencyList] = useState([]);
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchCurrencyCodes = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_EXCHANGE_RATE_API_URL}/codes`);
        setCurrencyList(res.data.supported_codes);
      } catch (error) {
        console.error('Error fetching currency codes:', error);
      }
    };

    fetchCurrencyCodes();
  }, []);

  const handleConvert = async () => {
    const [year, month, day] = date.split('-');
    
    if (!year || !month || !day || !sourceCurrency || !targetCurrency || !amount) {
      alert("Please fill in all the required details.");
      return;
    }
    
    try {
      const response = await axios.get(`${process.env.REACT_APP_EXCHANGE_RATE_API_URL}/history/${sourceCurrency}/${year}/${month}/${day}`);
      const rate = response.data?.conversion_rates?.[targetCurrency];
      if (rate) {
        setConvertedAmount(rate * amount);
      } else {
        alert("Conversion rate not found for the selected date.");
      }
    } catch (error) {
      console.error('Error in fetching data:', error);
      alert("An error occurred while fetching the conversion rate. Please try again.");
    }
  };

  const handleSwap = () => {
    setSourceCurrency(targetCurrency);
    setTargetCurrency(sourceCurrency);
  };

  return (
    <div className="container">
      <h1>Currency Converter</h1>
      <CurrencySelector 
        label="Source Currency" 
        currency={sourceCurrency} 
        setCurrency={setSourceCurrency} 
        currencyList={currencyList} 
      />
      <button className="swap-button" onClick={handleSwap}>Swap</button>
      <CurrencySelector 
        label="Target Currency" 
        currency={targetCurrency} 
        setCurrency={setTargetCurrency} 
        currencyList={currencyList} 
      />
      <AmountInput amount={amount} setAmount={setAmount} />
      <DateInput date={date} setDate={setDate} />
      <button onClick={handleConvert}>Convert</button>
      {convertedAmount && <h2>{convertedAmount}</h2>}
    </div>
  );
};

export default CurrencyConverter;
