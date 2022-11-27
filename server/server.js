require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const server = express();

server.use(cors());
server.use(express.json());

// server.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true})
.then(console.log("Database connected"))
.catch(err => console.log(err));

const entrySchema = new mongoose.Schema({
    date: String,
    content: String
});

const Entry = mongoose.model("Entry", entrySchema);

server.get("/entries", async (req, res) => {
    const entries = await Entry.find().exec();
    res.send(JSON.stringify(entries));

});


server.post("/compose", async (req, res) => {
    const {date, text} = req.body;

    const newEntry = new Entry({
        date: date,
        content: text
    });

    newEntry.save();

});



const port = 5000;
server.listen(port, function () {
    console.log("Server up and running on port " + port);
})