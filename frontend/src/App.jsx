import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (e) => setJsonInput(e.target.value);

  const handleSubmit = async () => {
    try {
      const payload = JSON.parse(jsonInput);
      const response = await axios.post('http://localhost:5000/bfhl', payload);
      setResponseData(response.data);
      setError('');
    } catch (err) {
      setError('Invalid JSON or Request Failed');
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  return (
    <div>
      <h1>Your Roll Number</h1>
      <textarea onChange={handleInputChange} rows="10" cols="50" placeholder="Enter JSON here" />
      <br />
      <button onClick={handleSubmit}>Submit</button>

      <div>
        <label>Filter Response: </label>
        <select multiple={true} onChange={handleOptionChange}>
          <option value="numbers">Numbers</option>
          <option value="alphabets">Alphabets</option>
          <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
        </select>
      </div>

      {error && <p>{error}</p>}
      {responseData && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
          <div>
            {selectedOptions.includes('numbers') && <p>Numbers: {responseData.numbers}</p>}
            {selectedOptions.includes('alphabets') && <p>Alphabets: {responseData.alphabets}</p>}
            {selectedOptions.includes('highest_lowercase_alphabet') && (
              <p>Highest Lowercase Alphabet: {responseData.highest_lowercase_alphabet}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
