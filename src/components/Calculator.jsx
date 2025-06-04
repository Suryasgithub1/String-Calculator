import React, { useState } from 'react'; 
import {add} from "../utils/stringCalculator"

function Calculator() {
  const [numbersInput, setNumbersInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setNumbersInput(event.target.value);
    setResult(null); // Clear previous result on input change
    setError(''); // Clear previous error on input change
  };

  const handleCalculate = () => {
    try {
      // Unescape newline characters from the textarea input before passing to add function.
      // This is crucial for the custom delimiter format (e.g., "//;\n1;2")
      // where a literal newline is expected to separate the delimiter definition from the numbers.
      const unescapedInput = numbersInput.replace(/\\n/g, '\n').replace(/\\r/g, '\r');
      console.log('Calculator: Input after unescaping:', JSON.stringify(unescapedInput)); // Diagnostic log for unescaped input
      const sum = add(unescapedInput);
      setResult(sum);
      setError('');
    } catch (e) {
      setResult(null);
      setError(e.message);
    }
  };

  return (
    <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
      <h2 className="block text-gray-700 text-lg font-bold mb-3">
        Enter Numbers:
      </h2>
      <textarea
        className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 font-mono"
        rows="5"
        cols="50"
        value={numbersInput}
        onChange={handleInputChange}
        placeholder="e.g., '1,2,3' or '//;\n1;2' or '//[***]\n1***2***3'"
      />
      <button
        className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        onClick={handleCalculate}
      >
        Calculate Sum
      </button>

      {result !== null && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md relative" role="alert">
          <strong className="font-bold">Result: </strong>
          <span className="block sm:inline">{result}</span>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline" style={{ color: 'red' }}>{error}</span>
        </div>
      )}
    </div>
  );
}


export default Calculator