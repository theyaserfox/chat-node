var io     = require("socket.io");
var server = io();
var events = require('events');

var emitter = function() {};
emitter.prototype = new events.EventEmitter;
var router = new emitter();

var pUsername = {}, pId = {};

server.on("connection", function (socket) {
  socket.emit("server_on");

  socket.on("join", function(username){
    pUsername[socket.id] = username;
    pId[username] = socket.id;
    console.log(username + " joined server");
  });

  socket.on("talk", function (username, toUsername, d) {
    if(toUsername == "") toUsername = "general chat";
    console.log("User " + username + " sent the message '" + d + "' to " + toUsername);
    router.emit("talk", username, toUsername, d);
  });

  router.on("talk", function (username, toUsername, d) {
    if(toUsername == "general chat" || socket.id == pId[toUsername]) socket.emit("toUsersTalk", username, d);
  });
});

server.listen(7171);