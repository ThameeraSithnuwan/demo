const request = require('supertest');
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.post('/welcome', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  res.json({ message: `Welcome, ${name}!` });
});

describe('Welcome Dashboard API', () => {
  test('POST /welcome with valid name returns welcome message', async () => {
    const response = await request(app)
      .post('/welcome')
      .send({ name: 'John' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Welcome, John!' });
  });

  test('POST /welcome without name returns error', async () => {
    const response = await request(app)
      .post('/welcome')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Name is required' });
  });
});
