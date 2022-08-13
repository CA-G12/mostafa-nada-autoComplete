/* eslint linebreak-style: ["error", "windows"] */
const http = require('http');
const router = require('./router');

const server = http.createServer(router);
const port = 3000;
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('http://localhost:3000');
});
