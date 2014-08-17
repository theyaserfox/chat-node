var io     = require("socket.io");

var server = io();

server.on("connection", function (socket) {
  
  var message = "Hello Idiot";
  socket.emit("message", message);

  socket.on("talk", function (d) {
    console.log("msg: "+ d);
  });

});

server.listen(7171);