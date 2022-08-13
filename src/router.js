const fs = require('fs');
const path = require('path');
// eslint-disable-next-line no-unused-vars
const { extname } = require('path');

const mimeType = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.js': 'text/javascript',
  '.ico': 'image/x-icon',
};

/* eslint linebreak-style: ["error", "windows"] */
function router(req, res) {
  const endpoint = req.url;
  if (endpoint === '/') {
    const indexPath = path.join(__dirname, '..', 'public', 'index.html');
    fs.readFile(indexPath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('servererror');
        // eslint-disable-next-line no-useless-return
        return;
        // eslint-disable-next-line no-else-return
      } else {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.end(data);
      }
    });
  } else if (endpoint.includes('public')) {
    const indexPath = path.join(__dirname, '..', endpoint);
    fs.readFile(indexPath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('servererror');
        // eslint-disable-next-line no-useless-return
        return;
        // eslint-disable-next-line no-else-return
      } else {
        res.writeHead(200, {
          'Content-Type': mimeType[path.extname(endpoint)],
        });
        res.end(data);
      }
    });
  } else if (endpoint.includes('displaymovies')) {
    const filepath = path.join(__dirname, 'movies.json');
    fs.readFile(filepath, 'utf-8', (err, data) => {
      if (err) {
        console.log('error');
      } else {
        let lastPartEndpoint = endpoint.slice(endpoint.lastIndexOf('/') + 1);
        lastPartEndpoint = lastPartEndpoint.split('%20').join(' ');
        const convertedData = JSON.parse(data);
        const moviesName = Object.values(convertedData);
        const filterData = moviesName
          .filter((data) => data.toLowerCase().includes(lastPartEndpoint.toLowerCase()))
          .slice(0, 14);
        res.end(JSON.stringify(filterData));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>Not found</h1>');
  }
}
module.exports = router;
