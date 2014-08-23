var io     = require("socket.io");
var server = io();
var events = require('events');

var emitter = function() {};
emitter.prototype = new events.EventEmitter;
var router = new emitter();

server.on("connection", function (socket) {
  socket.emit("server_on");

  socket.on("talk", function (username, d) {
    console.log(username + ": " + d);
    router.emit("talk", username, d);
  });

  router.on("talk", function (username, d) {
    socket.emit("toUsersTalk", username, d);
  });
});

server.listen(7171);