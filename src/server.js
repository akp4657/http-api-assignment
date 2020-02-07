// // Get http module
const http = require('http');

// Module for parsing url string
const url = require('url');

// Querystring module for parsing querystrings from url
const query = require('querystring');

// Get our files
const htmlHandler = require('./htmlResponses.js');
const responseHandler = require('./responses.js');

// Find a port to plug in to
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Create struct of all the possible URLs
const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': responseHandler.success,
  '/badRequest': responseHandler.badRequest,
  '/unauthorized': responseHandler.unauthorized,
  '/forbidden': responseHandler.forbidden,
  '/internal': responseHandler.internalError,
  '/notImplemented': responseHandler.notImplemented,
  notFound: responseHandler.notFound,

};

// If the user asks for something
const onRequest = (request, response) => {
  
  // Parsing the url and parameters
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);

  // Split the accepted types into an array for use in the methods
  const acceptedTypes = request.headers.accept.split(',');

  // Search our struct for the name
  if (urlStruct[parsedUrl.pathname]) {
    // If found, call that method
    urlStruct[parsedUrl.pathname](request, response, acceptedTypes, params);
  } 
  // Otherwise, it's not found
  else {
    urlStruct.notFound(request, response, acceptedTypes, params);
  }
};


http.createServer(onRequest).listen(port);
console.log(`Listening on port: ${port}`);
