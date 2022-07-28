const express = require("express");
const cors = require('CORS');
const {db} = require("./app")

const app = express();

console.log(db);


app.use(cors({
    origin: "*"
}));

app.get('/api/v3/app/', (req, res) => {
    res.send("Working");
});

app.post("/api/v3/app/events", (req, res) => {
    res.send("working")
})

module.exports = app;