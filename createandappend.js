var fs = require('fs'); 
var stream = fs.createWriteStream("my_file.txt"); 
stream.once('open', function(fd) { 
  stream.write("My first row\r\n"); 
  stream.write("My second row\r\n");   
}); 
