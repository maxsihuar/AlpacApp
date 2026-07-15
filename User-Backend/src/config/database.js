require("dotenv").config();

const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

console.log("Working directory:", process.cwd());
console.log("URI:", process.env.MONGO_URI);
console.log("Database:", process.env.DATABASE_NAME);
const client = new MongoClient(uri);

let database = null;

async function connectDatabase() {

    try {

        await client.connect();

        database = client.db(process.env.DATABASE_NAME);

        console.log("✅ MongoDB conectado correctamente.");

    }
    catch (error) {

        console.error("❌ Error al conectar con MongoDB:", error);
        process.exit(1);


    }

}

function getDatabase() {

    return database;

}

module.exports = {
    connectDatabase,
    getDatabase
};