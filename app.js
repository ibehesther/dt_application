const express = require("express");
const {MongoClient} = require("mongodb");
const Router = require("./routes");


const app = express();
const PORT = 3001;

const CONN_URL = "mongodb://127.0.0.1:27017";
const client = new MongoClient(CONN_URL);
const dbName = "dt_db";
const db = client.db(dbName);
const event = db.collection('events');

console.log(event)
async function main() {
    await client.connect();
    console.log("Connection established!");
    return "Done!";
}

main()
.then(console.log)
.catch(console.error)
.finally(() => client.close());

app.use(Router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

exports.db = db;