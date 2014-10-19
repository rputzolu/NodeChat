var my_http = require("http"),
path = require("path"),
url = require("url"),
fs = require('fs');

my_http.createServer(function (request, response) {
    var url_parts = url.parse(request.url, true);
    var my_path = url_parts.pathname.toString();
	if(my_path.indexOf("static") == -1)
	{
	//update or create the chat file
	console.log("Received following request: " + request.url + "\r\n");
    var query = url_parts.query;
    var staticpath = path.join(process.cwd(), 'static');
	var stream = fs.createWriteStream(path.join(staticpath, my_path + '.txt'), { 'flags': 'a' });
    var d = new Date();
	if(query['msg']!= undefined) {
    stream.write('<br>[' + d.toDateString() + ' ' + (d.toTimeString()).substring(0, 5) + ']' + '\r\n');
    stream.write(query.uid + ': ' + query['msg'] + '\r\n');
	//new
	response.writeHeader(200, { "Content-Type": "text/plain" });
    response.write("ok");
    response.end();
	}
}
else
{
	//serves the page
	
	var filename = path.join(process.cwd(),request.url);
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
}
}).listen(80, "127.0.0.1");
console.log("Server running at http://127.0.0.1:80");


