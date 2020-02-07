// File reader
const fs = require('fs');

// Get the files
const index = fs.readFileSync((`${__dirname}/../client/client.html`));
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// Getting both the page itself and CSS
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

// Export these methods
module.exports = {
  getIndex,
  getCSS,
};
