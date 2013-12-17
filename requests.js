var url = require('url');
var fs = require("fs");
var path = require('path')
    // thanks! http://blog.kevinchisholm.com/javascript/node-js/making-a-simple-http-server-with-node-js-part-iv/

var headers = {

  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"

};

var extensions = {
  ".html" : "text/html",
  ".css" : "text/css",
  ".js" : "application/javascript",
  ".png" : "image/png",
  ".gif" : "text/gif",
  ".jpg" : "text/jpg",
  ".ico" : "text/ico"
};

function getFile(filePath,res,page404,mimeType){
    //does the requested file exist?
    console.log('looking here: ',filePath)
    fs.exists(filePath,function(exists){
        //if it does...
        if(exists){
            //read the fiule, run the anonymous function
            fs.readFile(filePath,function(err,contents){
                if(!err){
                    //if there was no error
                    //send the contents with the default 200/ok header
                    res.writeHead(200,{
                        "Content-type" : mimeType,
                        "Content-Length" : contents.length
                    });
                    res.end(contents);
                } else {
                    //for our own troubleshooting
                    console.dir(err);
                };
            });
        } else {
            //if the requested file was not found
            //serve-up our custom 404 page
            fs.readFile(page404,function(err,contents){
                //if there was no error
                if(!err){
                    //send the contents with a 404/not found header 
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end(contents);
                } else {
                    //for our own troubleshooting
                    console.dir(err);
                };
            });
        };
    });
};

function handleRequest(req, res) {
    var
      fileName = req.url,
      ext = path.extname(fileName),
      localFolder = __dirname + '/public',
      page404 = localFolder + '/404.html';
    if (fileName === '/') {fileName ='/index.html'}
    console.log("Serving request type " + req.method + " for url " + req.url , localFolder, '\n', fileName);
 
    //do we support the requested file type?
    // if(!extensions[ext]){
    //     //for now just send a 404 and a short message
    //     res.writeHead(404, {'Content-Type': 'text/html'});
    //     res.end("<html><head></head><body>The requested file type is not supported</body></html>");
    // };
 
    //call our helper function
    //pass in the path to the file we want,
    //the response object, and the 404 page path
    //in case the requestd file is not found
    getFile((localFolder + fileName),res,page404,extensions[ext]);
};

exports.handleRequest = handleRequest;

