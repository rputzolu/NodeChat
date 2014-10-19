var sys = require("sys"),
my_http = require("http"),
path = require("path"),
url = require("url"),
filesys = require("fs");
my_http.createServer(function (request, response) {
    var my_path = url.parse(request.url).pathname;
    var full_path = path.join(process.cwd(), my_path);
    path.exists(full_path, function (exists) {
        if (!exists) {
            response.writeHeader(404, { "Content-Type": "text/plain" });
            response.write("404 Not Found\n");
            response.end();
        }
        else {
            //chek if path contains /static/
            if (full_path.indexOf('static') > -1) {

                filesys.readFile(full_path, "binary", function (err, file) {
                    if (err) {
                        response.writeHeader(500, { "Content-Type": "text/plain" });
                        response.write(err + "\n");
                        response.end();

                    }
                    else {
                        //ToDo: Dinamic content
                        response.writeHeader(200);
                        response.write(file, "binary");
                        response.end();
                    }
                });
            }
            else {
                response.writeHeader(404, { "Content-Type": "text/plain" });
                response.write("404 Dinamic content not allowed\n");
                response.end();
            }
        }
    });
//}).listen(process.env.PORT);
}).listen(8081);
sys.puts("Server Running on" + process.env.PORT);  