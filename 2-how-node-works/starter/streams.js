const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // Solution 1
  //   fs.readFile('test-file.txt', (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });

  // Solution 2: streams - causes backpressure
  //   const readable = fs.createReadStream('test-file.txt');
  //   readable.on('data', (chunk) => {
  //     res.write(chunk);
  //   });
  //   readable.on('end', () => {
  //     res.end(); // response is a stream and this closes with end()
  //   });
  //   readable.on('error', (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end('File not found');
  //   });

  // Solution 3: Pipe operator
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res); // how to use pipe operator - solves backpressure problem: readableSource.pipe(writeableDestination)
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening on port 8000...');
});
