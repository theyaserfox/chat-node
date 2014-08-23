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

client.on("server_on", function () {
  jetty.moveTo([0,0]);
  console.log("Now you can start chatting ..\n");
  var stdin = process.openStdin();
  stdin.on('data', function (chunk) {
    chunk = chunk.slice(0, chunk.length - 1);
    client.emit("talk", username, chunk);
  });

  client.on("toUsersTalk", function (sUsername, d) {
    if(username != sUsername) jetty.text(sUsername + ": " + d + "\n");
  });
});