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
        res.writeHead(200, { 'Content-Type': mimeType[path.extname(endpoint)] });
        res.end(data);
      }
    });
  }
}
module.exports = router;
