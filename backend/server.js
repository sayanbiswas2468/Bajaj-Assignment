const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all origins (Allow requests from the frontend)
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Helper function to check if input is a number
const isNumber = (value) => !isNaN(value);

// Helper function to check if input is an alphabet
const isAlphabet = (value) => /^[a-zA-Z]$/.test(value);

// POST /bfhl
app.post('/bfhl', (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: 'Invalid data format. Data must be an array.'
    });
  }

  const numbers = [];
  const alphabets = [];
  let highestLowercase = null;

  // Process the input array
  data.forEach((item) => {
    if (isNumber(item)) {
      numbers.push(item);
    } else if (isAlphabet(item)) {
      alphabets.push(item);
      if (item === item.toLowerCase() && (!highestLowercase || item > highestLowercase)) {
        highestLowercase = item;
      }
    }
  });

  // Prepare response
  const response = {
    is_success: true,
    user_id: 'john_doe_17091999', // Replace with dynamic user_id if needed
    email: 'john@xyz.com',
    roll_number: 'ABCD123',
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
    file_valid: false, // Assuming no file provided in this example
    file_mime_type: '',
    file_size_kb: ''
  };

  return res.status(200).json(response);
});

// GET /bfhl
app.get('/bfhl', (req, res) => {
  return res.status(200).json({
    operation_code: 1
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(Server is running on http://localhost:${PORT});
});