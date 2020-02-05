// Basic function I'm going to use from class
// to write every status function for the URL portion
const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const success = (request, response) => {
  const responseJSON = {
    id: 'Success',
    message: 'This is a successful response',
  };

  respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.id = 'Bad Request';
    responseJSON.message = 'Missing valid query parameter set to true';

    return respondJSON(request, response, 400, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

const unauthorized = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (params.loggedIn !== 'yes') {
    responseJSON.id = 'Unauthorized';
    responseJSON.message = 'Missing valid query parameter set to yes';

    return respondJSON(request, response, 401, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

const forbidden = (request, response) => {
  const responseJSON = {
    id: 'Forbidden',
    message: 'You do not have access to this content',
  };

  respondJSON(request, response, 403, responseJSON);
};

const internalError = (request, response) => {
  const responseJSON = {
    id: 'Inernal Server Error',
    message: 'Internal Server Error. Something went wrong',
  };

  respondJSON(request, response, 500, responseJSON);
};

const notImplemented = (request, response) => {
  const responseJSON = {
    id: 'Not Implemented',
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
  };

  respondJSON(request, response, 501, responseJSON);
};

const notFound = (request, response) => {
  const responseJSON = {
    id: 'Not Found',
    message: 'The page you are looking for was not found',
  };

  respondJSON(request, response, 404, responseJSON);
};


module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internalError,
  notImplemented,
  notFound,
};
