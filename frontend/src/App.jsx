import React, { useState } from 'react';
import './App.css';
import cors from "cors"
function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (event) => {
    setJsonInput(event.target.value);
  };

  const handleDropdownChange = (event) => {
    const options = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedOptions(options);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const parsedJson = JSON.parse(jsonInput);
      if (!parsedJson || !Array.isArray(parsedJson.data)) {
        setError('Invalid JSON format');
        return;
      }
      setError('');
    } catch (err) {
      setError('Invalid JSON');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/bfhl', { // This points to the backend API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: JSON.parse(jsonInput).data }),
      });

      const result = await res.json();
      setResponse(result);
    } catch (err) {
      setError('Error calling API');
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    const { alphabets, numbers, highest_lowercase_alphabet } = response;
    let filteredData = {};

    if (selectedOptions.includes('Alphabets')) {
      filteredData.alphabets = alphabets;
    }

    if (selectedOptions.includes('Numbers')) {
      filteredData.numbers = numbers;
    }

    if (selectedOptions.includes('Highest lowercase alphabet')) {
      filteredData.highest_lowercase_alphabet = highest_lowercase_alphabet;
    }

    return (
      <div>
        <h3>Response</h3>
        <pre>{JSON.stringify(filteredData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Bajaj Finserv Health Dev Challenge - Frontend</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter JSON input:</label>
          <textarea
            rows="5"
            value={jsonInput}
            onChange={handleInputChange}
            placeholder='{"data": ["A", "B", "1"]}'
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Submit</button>
      </form>

      {response && (
        <div>
          <label>Filter Response:</label>
          <select multiple onChange={handleDropdownChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;