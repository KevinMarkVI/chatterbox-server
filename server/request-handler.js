var url = require('url');

var storage = {'results': []};

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/json"
};




module.exports.requestHandler = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);

  var path = "/classes/messages";
  var parsedUrl = url.parse(request.url).pathname;

  var statusCode = 200;

  if (parsedUrl !== path && parsedUrl !== '/classes/room1'){
    statusCode = 404;
    response.writeHead(statusCode, headers);
  }

  if (request.method === 'GET') {
    response.writeHead(statusCode, headers);

  } else if (request.method === 'POST') {
    statusCode = 201;
    var body = '';
    request.on('data', function(chunk){
      body += chunk;  
    });
    request.on('end', function() {
      storage.results.push(JSON.parse(body))
    });
    response.writeHead(statusCode, headers);

  } else if (request.method === 'OPTIONS') {
    response.writeHead(statusCode, headers);
  };
  response.end(JSON.stringify(storage));

};


