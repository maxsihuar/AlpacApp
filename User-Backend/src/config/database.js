require("dotenv").config();

const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

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

    }

}

function getDatabase() {

    return database;

}

module.exports = {
    connectDatabase,
    getDatabase
};