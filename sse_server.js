var http = require("http");
var fs = require("fs");

http.createServer(function (req, res) {
  var index = "./sse.htm";
  var fileName = "." + req.url;
  var interval;

  if (fileName === "./stream") {
    res.writeHead(200, {"Content-Type":"text/event-stream", "Cache-Control":"no-cache", "Connection":"keep-alive"});
    res.write("retry: 100\n");

    interval = setInterval(function() {
      res.write("data: " + (new Date()) + "\n\n");
    }, 1000);   
  } 
  else {
    fs.exists(fileName, function(exists) {
      if (exists) {
        fs.readFile(fileName, function(error, content) {
          if (error) {
            res.writeHead(500);
            res.end();
          } else {
            res.writeHead(200, {"Content-Type":"text/html"});
            res.end(content, "utf-8");
          }
        });
      } else {
        res.writeHead(404);
        res.end();
      }
    });
  } 

}).listen(80, "127.0.0.1");
console.log("Server running at http://127.0.0.1:80/");