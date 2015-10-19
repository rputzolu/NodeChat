var my_http = require("http"),
path = require("path"),
url = require("url");

var server = my_http.createServer(function (request, response) {
    console.log("I got kicked");
    var url_parts = url.parse(request.url, true);
    var my_path = url_parts.pathname.toString();
	console.log(my_path+'####');
	if(my_path.indexOf("static") == -1)
	{
//	var my_path = '/chat';
    var query = url_parts.query;
    //    response.writeHeader(200, { "Content-Type": "text/plain" });
    //    response.write(my_path);
    //    response.end();
    var fs = require('fs');
    var staticpath = path.join(process.cwd(), 'static');
	//var staticpath = path.join("http://127.0.0.1:8080/", 'static');
	console.log(staticpath + ' ' + my_path);
	var stream = fs.createWriteStream(path.join(staticpath, my_path + '.txt'), { 'flags': 'a' });
    var d = new Date();
	if(query['msg']!= undefined) {
    stream.write('<br>[' + d.toDateString() + ' ' + (d.toTimeString()).substring(0, 5) + ']' + '\r\n');
    stream.write(query.uid + ': ' + query['msg'] + '\r\n');
	response.writeHeader(200);
	response.end();
}
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
                    //response.writeHeader(200);
                    //response.write(file, "binary");
                    //response.end();
                }

            });
        }
    });

}
else
{
	response.writeHeader(200);
	var filename = path.join(process.cwd(),request.url);
	//###
	var fs = require('fs');
	fs.readFile(filename, "binary", function (err, file) {
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
	//###


 //   response.write(filename);
 //   response.end();

}
// }).listen(process.env.PORT, process.env.IP);
// console.log("Server running at" +  process.env.IP + ":" + process.env.PORT);
})//.listen(3500, '0.0.0.0');
//console.log("Server running at" +  3500 + ":" + '0.0.0.0');
var port = Number(process.env.PORT || 3500);
server.listen(port);

