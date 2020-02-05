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
    message: 'Success!',
    id: 'success',
  };

  respondJSON(request, response, 200, responseJSON);
};

module.exports = {
  success,
};
