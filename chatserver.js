//TODO: don't use file chat.txt
//store messages in a Javascript object: {[{datetime:_ ,id:_ , nikname:_ , message:_},{...},...]}

var my_http = require("http"), path = require("path"), url = require("url"), fs = require('fs');
var messages = {data: new Array()};
var msgIndex = 0;
var server = my_http.createServer(function (request, response) {


  var url_parts = url.parse(request.url, true);
  var my_path = url_parts.pathname.toString();
	console.log('GET' + my_path);
	if(my_path.indexOf("static") == -1){
    var query = url_parts.query;
    switch(query['action']) {
    case 'send':
            if(query['msg']!= undefined) {
              msg = new Object();
              msgIndex++;
              msg['msgIndex']=msgIndex;
              msg['nikname']=query.uid ;
              msg['message']=query.msg ;
              messages.data.push(msg);
            }
        break;
    case 'get':
        console.log(query);
        if(query['lastMsg']!=undefined){
            lastMsg=parseInt(query['lastMsg']);
            newMessages=messages.data.filter(function (el) {
            return el.msgIndex > lastMsg;
          });
        }
        else{
          lastMsg=0;
          newMessages=[];
        }

        response.writeHeader(200);
        response.write(JSON.stringify(newMessages));
        response.end();
        //todo
        break;
    }

  }
  else{ //serves file from disk.
	  response.writeHeader(200);
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
})//.listen(3500, '0.0.0.0');
var port = Number(process.env.PORT || 3500);
server.listen(port);
console.log("Server running at port " +  port);
