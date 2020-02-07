// Basic function I'm going to use from class
// to write every status function for the URL portion
const respond = (request, response, status, object, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(object);
  response.end();
};

const success = (request, response, acceptedTypes) => {
  const obj = {
    id: 'Success',
    message: 'This is a successful response',
  };
  
  if (acceptedTypes[0] == 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML = `${responseXML} <ID>${obj.id}</ID>`;
    responseXML = `${responseXML} <message>${obj.message}</message>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respond(request, response, 200, responseXML, 'text/xml');
  }

  const stringedObject = JSON.stringify(obj);
  console.dir("Returning JSON");
  return respond(request, response, 200, stringedObject, 'application/json');
};

/* const badRequest = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.id = 'Bad Request';
    responseJSON.message = 'Missing valid query parameter set to true';

    return respond(request, response, 400, responseJSON);
  }

  return respond(request, response, 200, responseJSON);
};

const unauthorized = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (params.loggedIn !== 'yes') {
    responseJSON.id = 'Unauthorized';
    responseJSON.message = 'Missing valid query parameter set to yes';

    return respond(request, response, 401, responseJSON);
  }

  return respond(request, response, 200, responseJSON);
};

const forbidden = (request, response, acceptedTypes) => {
  const responseJSON = {
    id: 'Forbidden',
    message: 'You do not have access to this content',
  };

  respond(request, response, 403, responseJSON);
};

const internalError = (request, response, acceptedTypes) => {
  const responseJSON = {
    id: 'Inernal Server Error',
    message: 'Internal Server Error. Something went wrong',
  };

  respond(request, response, 500, responseJSON);
};

const notImplemented = (request, response, acceptedTypes) => {
  const responseJSON = {
    id: 'Not Implemented',
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
  };

  respond(request, response, 501, responseJSON);
};

const notFound = (request, response, acceptedTypes) => {
  const responseJSON = {
    id: 'Not Found',
    message: 'The page you are looking for was not found',
  };

  respond(request, response, 404, responseJSON);
}; */


module.exports = {
  success,
  /* badRequest,
  unauthorized,
  forbidden,
  internalError,
  notImplemented,
  notFound, */
};
