const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json()); // middleware - function to modify incoming request data

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  // specify version of api
  res.status(200).json({
    status: 'success',
    results: tours.length, // not part of JSON spec but nice to do
    data: {
      tours, // same as tours: tours
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  console.log(req.body);
  res.send('Done');
});

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
