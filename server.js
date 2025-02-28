// server.js
const express = require('express');
const path = require('path');
const { restClient } = require('@polygon.io/client-js');

const app = express();
const port = process.env.PORT || 3000;

// Replace with your actual Polygon.io API key
const API_KEY = "0HoyxbfY2sHnMPoEPpD1rYgKsDVCHHb1";
const rest = restClient(API_KEY);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to fetch Polygon.io options aggregates data
app.get('/api/options-aggregates', async (req, res) => {
  try {
    // Example: fetches data for ticker "O:SPY251219C00650000" on 2023-01-09
    const data = await rest.options.aggregates("O:SPY251219C00650000", 1, "day", "2023-01-09", "2023-01-09");
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: error.toString() });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
