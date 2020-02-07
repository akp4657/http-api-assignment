const http = require('http'); // pull in http module
// url module for parsing url string
const url = require('url');
// querystring module for parsing querystrings from url
const query = require('querystring');
// pull in our custom files
const htmlHandler = require('./htmlResponses.js');
const responseHandler = require('./responses.js');


const port = process.env.PORT || process.env.NODE_PORT || 3010;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': responseHandler.success,
  /* '/badRequest': responseHandler.badRequest,
  '/unauthorized': responseHandler.unauthorized,
  '/forbidden': responseHandler.forbidden,
  '/internal': responseHandler.internalError,
  '/notImplemented': responseHandler.notImplemented,
  notFound: responseHandler.notFound, */

};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);

  const acceptedTypes = request.headers.accept.split(',');
  //console.dir(acceptedTypes[0]);


  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, acceptedTypes, params);
  } /* else {
    urlStruct.notFound(request, response, params, acceptedTypes);
  } */
};


http.createServer(onRequest).listen(port);
console.log(`Listening on port: ${port}`);
