import React, { useState } from 'react';


function Calculator() {
  const [numbersInput, setNumbersInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setNumbersInput(event.target.value);
    setResult(null); 
    setError(''); 
  };

  const handleCalculate = () => {
    try {
      const sum = add(numbersInput);
      setResult(sum);
      setError('');
    } catch (e) {
      setResult(null);
      setError(e.message);
    }
  };

  return (
    <div className="mb-4">
      <h2 className="block text-gray-700 text-sm font-bold mb-2">
        Enter Numbers:
      </h2>
      <textarea
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        rows="5"
        cols="50"
        value={numbersInput}
        onChange={handleInputChange}
        placeholder="e.g., '1,2,3' or '//;\n1;2'"
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleCalculate}
      >
        Calculate Sum
      </button>

      {result !== null && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded relative" role="alert">
          <strong className="font-bold">Result:</strong>
          <span className="block sm:inline">{result}</span>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline" style={{ color: 'red' }}>{error}</span>
        </div>
      )}
    </div>
  );
}

export default Calculator;