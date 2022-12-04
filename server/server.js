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
    const entries = await Entry.find().sort({"_id": -1}).limit(5);
    const count = await Entry.countDocuments();
    const data = {
        entries: entries,
        count: count
    }
    res.send(JSON.stringify(data));
});

server.get("/single/:id", async (req, res) => {
    const {id} = req.params;
    const singleEntry = await Entry.find({_id: id}).exec();
    res.send(JSON.stringify(singleEntry));
});

server.post("/entries", async (req, res) => {
    const entriesSkipped = req.body.length;
    const entries = await Entry.find().sort({"_id": -1}).skip(entriesSkipped).limit(5);
    res.send(JSON.stringify(entries));

});

server.post("/compose", async (req, res) => {
    const {date, text} = req.body;
    const newEntry = new Entry({
        date: date,
        content: text
    });

    newEntry.save(function (error) {
        if (error) {
            res.send(JSON.stringify({message: "Error when saving entry", succeed: false}));
        } else {
            res.send(JSON.stringify({message: "Entry saved succesfully", succeed: true}));
        }
    });

});

server.post("/delete", async (req, res) => {
    await Entry.deleteOne({_id: req.body.id})
    .then( () => {
        res.send(JSON.stringify({message: "Entry deleted succesfully", succeed: true}));
    })
    .catch((err) => {
        res.send(JSON.stringify({message: "Error when deleting entry", succeed: false}));
    })
    
});

const port = 5000;
server.listen(port, function () {
    console.log("Server up and running on port " + port);
})