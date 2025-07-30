const express = require('express');
const app = express();
const PORT = 3000;

//sample comment
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Hello, world!');

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
