const express = require('express');
const app = express();
const PORT = 52970;

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//sample comment
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// New page route
app.get('/about', (req, res) => {
  res.send('Welcome to the About page!');
});

// Start node server 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
