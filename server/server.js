const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const server = express();

server.use(bodyParser.urlencoded({extended: true}));

server.get("/", function (req, res) {
    res.json({content: "this is the content"});
})

const port = 5000;
server.listen(5000, function () {
    console.log("Server up and running on port " + port);
})