var io      = require("socket.io-client")

var url     = "ws://localhost:7171";
var options = { transports: ['websocket'] };

var client  = io(url, options);



client.on("message", function (msg) {
  console.log("msg: " + msg);
  
  client.emit("talk","ana ya wa7sh");
});