var io     = require("socket.io");
var client = require("socket.io-client")

var server = io();

server.on("connection", function (socket) {
  var message = "Hello Idiot";
  socket.emit("message", message);
});

server.listen(7171);