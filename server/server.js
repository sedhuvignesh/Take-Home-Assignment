const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


const movies = require('./movies_metadata.json');

app.get('/api/movies', (req, res) => {
  res.json(movies);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}


if (process.env.NODE_ENV !== 'production') {
  app.get('/', (req, res) => {
    res.send('API is running. Go to frontend at http://localhost:3000');
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
