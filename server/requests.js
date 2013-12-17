var url = require('url');
var fs = require('fs');
var path = require('path');
var index = fs.readFileSync('index.html');

var headers = {

  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"

};

var handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var locationArray = request.url.split('/');
  locationArray = locationArray.slice(-2); // this gives [ 'classes', 'messages' ]

  var pathname = url.parse(request.url).pathname;
  console.log(pathname);


  requestMethods[request.method](request, response, headers);
  // if (locationArray[0] !== "classes" && (locationArray[1] !== "room1" || locationArray[1] !== "messages")) {
  //    requestMethods['ERROR'](response, response, headers);
  // } else {
  //    requestMethods[request.method](request, response, headers);
  // }
};


var requestMethods = {
  GET: function(request, response, headers) {
    response.writeHead(200, headers); //okay
    var responseMessage = index;
    response.end(responseMessage);
  },
  POST:  function(request, response, headers) {
    var body = '';
    response.writeHead(201, headers); //created
    request.on('data', function( data) {
      body += data;
      messageLog.push(JSON.parse(body));
    });
    response.end();
  },
  ERROR: function(request, response, headers) {
    response.writeHead(404, headers); //ERROR NOT FOUND
    response.end();
  },
  OPTIONS: function (request, response, headers) {
    response.writeHead(200, headers); //OPTIONS
    response.end();
  }
};

exports.handleRequest = handleRequest;

