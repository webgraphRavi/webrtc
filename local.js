const path = require("path");

require("dotenv").config();

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
app.use("/static", express.static(path.join(__dirname, "uploads")));
const io = require("socket.io").listen(server);
app.use(express.static(path.join(__dirname, './static/build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './static/build', 'index.html'));
});


const listner = server.listen(process.env.PORT || 9000, function () {
  console.log("Listening on", listner.address().port);
});

require("./socket")(io, "./../src/recordings/");
