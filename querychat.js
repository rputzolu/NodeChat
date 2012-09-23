var sys = require("sys"),
my_http = require("http"),
path = require("path"),
url = require("url");

my_http.createServer(function (request, response) {
    sys.puts("I got kicked");
    var url_parts = url.parse(request.url, true);
    var my_path = url_parts.pathname;
    var query = url_parts.query;
    //    response.writeHeader(200, { "Content-Type": "text/plain" });
    //    response.write(my_path);
    //    response.end();
    var fs = require('fs');
    var staticpath = path.join(process.cwd(), 'static');
    var stream = fs.createWriteStream(path.join(staticpath, my_path + '.txt'), { 'flags': 'a' });
    var d = new Date();
    stream.write('[' + d.toDateString() + ' ' + (d.toTimeString()).substring(0, 5) + ']' + '\r\n');
    stream.write(query['uid'] + ': ' + query['msg'] + '\r\n');

    var full_path = path.join(staticpath, my_path + '.txt');
    fs.exists(full_path, function (exists) {
        if (!exists) {
            response.writeHeader(404, { "Content-Type": "text/plain" });
            response.write("404 Not Found\n");
            response.end();
        }
        else {
            fs.readFile(full_path, "binary", function (err, file) {
                if (err) {
                    response.writeHeader(500, { "Content-Type": "text/plain" });
                    response.write(err + "\n");
                    response.end();

                }
                else {
                    response.writeHeader(200);
                    response.write(file, "binary");
                    response.end();
                }

            });
        }
    });


}).listen(8080);
sys.puts("Server Running on 8080");  


