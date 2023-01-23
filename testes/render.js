let http = require("http");
let fs = require("fs");

let handleRequest = (request, response) => {
  response.writeHead(200, {
    "Content-Type": "text/html",
    "Content-Length": body.length,
  });
  fs.readFile("./negotium_beta/nego.html", null, function (error, data) {
    if (error) {
      response.writeHead(404);
      respone.write("Whoops! File not found!");
    } else {
      response.write(data);
    }
    response.end();
  });
};

http.createServer(handleRequest).listen(8000);
