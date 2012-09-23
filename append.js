var fs = require('fs');
var stream = fs.createWriteStream("my_file.txt", {'flags':'a'}); 
stream.write("My second row\r\n");   
