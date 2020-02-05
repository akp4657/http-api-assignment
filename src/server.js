const http = require('http'); // pull in http module
// url module for parsing url string
const url = require('url');
// querystring module for parsing querystrings from url
const query = require('querystring');
// pull in our custom files
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');


const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': jsonHandler.success,

};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, params);
  }
};


http.createServer(onRequest).listen(port);
console.log(`Listening on port: ${port}`);
