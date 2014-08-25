var io      = require("socket.io-client")
var url     = "ws://localhost:7171";
var options = { transports: ['websocket'] };
var client  = io(url, options);
var readlineSync = require("readline-sync");
var stdin = process.openStdin();
var Jetty = require("jetty");

var jetty = new Jetty(process.stdout);
jetty.clear();

username = readlineSync.question("Enter a username : ");
client.emit("join", username);

client.on("server_on", function () {
  jetty.moveTo([0,0]);
  console.log("Now you can start chatting ..\nYou can chat with specific user by typing your message in '[username]message_text' format");
  var stdin = process.openStdin();
  stdin.on('data', function (chunk) {
    chunk = chunk.slice(0, chunk.length - 1);
    chunk = chunk + "";
    var toUsername = chunk.replace(/.*\[|\].*/gi,'');
    if(toUsername == chunk) toUsername = "";
    else chunk = chunk.replace("["+toUsername+"]", "");
    client.emit("talk", username, toUsername, chunk);
  });

  client.on("toUsersTalk", function (sUsername, d) {
    if(username != sUsername) jetty.text(sUsername + ": " + d + "\n");
  });
});