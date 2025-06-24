const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 50252;

app.use(cors());
app.use((req, res, next) => {
  res.header('X-Frame-Options', 'ALLOWALL');
  next();
});

// Middleware to parse JSONsdfsdfs
// Middleware to parse JSONsdfsdfs
//sample comment
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('hello earth');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
