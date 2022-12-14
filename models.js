const {MongoClient} = require("mongodb");

const CONN_URL = "mongodb://127.0.0.1:27017";
const client = new MongoClient(CONN_URL);
const dbName = "dt_db";
const db = client.db(dbName);


async function main() {
    await client.connect();
    return "Connection established!";
}

main()
.then(console.log)
.catch(console.error);

module.exports.db = db;
