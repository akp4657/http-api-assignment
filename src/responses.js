// Basic function I'm going to use from class
// to write every status function for the URL portion
// Pass in a type and object to differentiate between XML and JSON
const respond = (request, response, status, object, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(object);
  response.end();
};

// Success works the same as all the other simple headers
const success = (request, response, acceptedTypes) => {
  
  // Create the message
  const obj = {
    id: 'Success',
    message: 'This is a successful response',
  };

  // If the type is XML, we form a XML response
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${obj.id}</id>`;
    responseXML = `${responseXML} <message>${obj.message}</message>`;
    responseXML = `${responseXML} </response>`;

    // Return from here
    return respond(request, response, 200, responseXML, 'text/xml');
  }

  // Otherwise, it's JSON, so we need to just string the object and return
  const stringedObject = JSON.stringify(obj);
  return respond(request, response, 200, stringedObject, 'application/json');
};

// Bad Request and Unauthorized are essentially the same
const badRequest = (request, response, acceptedTypes, params) => {
  
  // Make an object to use
  const obj = {
    message: 'This request has the required parameters',
    id: 'Bad Request',
  };

  // If the type is XML, then we form a XML response
  if (acceptedTypes[0] === 'text/xml') {
    obj.message = 'Missing valid query parameter set to true';
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${obj.id}</id>`;
    responseXML = `${responseXML} <message>${obj.message}</message>`;
    responseXML = `${responseXML} </response>`;

    // Return from here
    return respond(request, response, 400, responseXML, 'text/xml');
  }

  // Parameters check
  else if (!params.valid || params.valid !== 'true') {
    obj.id = 'Bad Request';
    obj.message = 'Missing valid query parameter set to true';

    // Since this is returned as a JSON object, we must turn it into a string and return
    const stringedObject = JSON.stringify(obj);
    return respond(request, response, 400, stringedObject, 'application/json');
  }

  // If the parameters are valid, we still need to make it a string
  const stringedObject = JSON.stringify(obj);
  return respond(request, response, 200, stringedObject, 'application/json');
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const obj = {
    id: 'Unauthorized',
    message: 'This request has the required parameters',
  };

  if (acceptedTypes[0] === 'text/xml') {
    obj.message = 'Missing valid query parameter set to yes';
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${obj.id}</id>`;
    responseXML = `${responseXML} <message>${obj.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 400, responseXML, 'text/xml');
  }

  else if (params.loggedIn !== 'yes') {
    obj.id = 'Unauthorized';
    obj.message = 'Missing valid query parameter set to yes';

    const stringedObject = JSON.stringify(obj)
    return respond(request, response, 401, stringedObject, 'application/json');
  }

  const stringedObject = JSON.stringify(obj);
  return respond(request, response, 200, stringedObject, 'application/json');
};

const forbidden = (request, response, acceptedTypes) => {
  const obj = {
    id: 'Forbidden',
    message: 'You do not have access to this content',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${obj.id}</id>`;
    responseXML = `${responseXML} <message>${obj.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 403, responseXML, 'text/xml');
  }

  const stringedObject = JSON.stringify(obj);
  return respond(request, response, 403, stringedObject, 'application/json');
};

const internalError = (request, response, acceptedTypes) => {
  const obj = {
    id: 'Inernal Server Error',
    message: 'Internal Server Error. Something went wrong',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${obj.id}</id>`;
    responseXML = `${responseXML} <message>${obj.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 500, responseXML, 'text/xml');
  }

  const stringedObject = JSON.stringify(obj);
  return respond(request, response, 500, stringedObject, 'application/json');
};

const notImplemented = (request, response, acceptedTypes) => {
  const obj = {
    id: 'Not Implemented',
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${obj.id}</id>`;
    responseXML = `${responseXML} <message>${obj.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 501, responseXML, 'text/xml');
  }

  const stringedObject = JSON.stringify(obj);
  return respond(request, response, 501, stringedObject, 'application/json');
};

const notFound = (request, response, acceptedTypes) => {
  const obj = {
    id: 'Not Found',
    message: 'The page you are looking for was not found',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${obj.id}</id>`;
    responseXML = `${responseXML} <message>${obj.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 404, responseXML, 'text/xml');
  }

  const stringedObject = JSON.stringify(obj);
  return respond(request, response, 404, stringedObject, 'application/json');
};


// Export all of our methods
module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internalError,
  notImplemented,
  notFound,
};
