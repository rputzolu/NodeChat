Run the server:
node ./querychat.js

Run the client: https://firstproj-mercatino73.c9.io/static/viewer.html

insert message from querystring--> https://firstproj-mercatino73.c9.io/chat?uid=megaloman73&msg=hello everybody

todo --> modify viewer.html to insert messages via ajax 


todo --> implement long running pattern:  EventSource()

example: 

<!DOCTYPE html>
<html>
<body>

<h1>Getting server updates</h1>
<div id="result"></div>

<script>
if(typeof(EventSource) !== "undefined") {
    var source = new EventSource("demo_sse.php");
    source.onmessage = function(event) {
        document.getElementById("result").innerHTML =  event.data ;
    };
} else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support server-sent events...";
}
</script>

</body>
</html>


//Server side
//Code in PHP (demo_sse.php):

<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

$time = date('r');
echo "data: The server time is: {$time}\n\n";
flush();
?>


// Code in ASP (VB) (demo_sse.asp):

<%
Response.ContentType = "text/event-stream"
Response.Expires = -1
Response.Write("data: " & now())
Response.Flush()
%>


