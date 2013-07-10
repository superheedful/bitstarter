var express = require('express');
var fs = require('fs');
var buf = new Buffer(7000);
var strLength = 0;
fs.open("index.html", "r", function(err, file_handle) {
	if (!err) {
		console.log("fs.open file_handle " + file_handle);
		fs.read(file_handle, buf, 0, 7000, null, function(err, bytesRead, buf) {
			if (!err) {
				console.log("bytesRead =  " + bytesRead);
				strLength = bytesRead;
				console.log("buf.toString() =  " + buf.toString(encoding="utf8", 0, bytesRead));
				fs.close(file_handle);
			} else {
				console.error("fs.read error " + err);
			}
		});
	} else {
		console.error("fs.open error " + err);
	}
});
var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  response.send(buf.toString(encoding="utf8", start=0, strLength));
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
