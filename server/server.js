require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const server = express();

server.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true})
.then(console.log("Database connected"))
.catch(err => console.log(err));

const entrySchema = new mongoose.Schema({
    date: String,
    text: String
});

const Entry = mongoose.model("Entry", entrySchema);

server.get("/", function (req, res) {
    console.log("working");
});


server.post("/compose", async (req, res) => {
    const {date, text} = req.body;



});

const port = 5000;
server.listen(5000, function () {
    console.log("Server up and running on port " + port);
})