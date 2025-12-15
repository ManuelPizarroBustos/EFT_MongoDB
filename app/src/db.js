// db.js
// Maneja la conexión a MongoDB

const { MongoClient } = require("mongodb");

// Debe coincidir con docker-compose.yml
const uri = "mongodb://root:secret@localhost:27017/?authSource=admin";
const dbName = "libreria_nosql";

let client;

/**
 * Retorna una instancia de la base de datos libreria_nosql
 */
async function getDb() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    console.log("✅ Conectado a MongoDB");
  }
  return client.db(dbName);
}

/**
 * Cierra la conexión a MongoDB (para finalizar el script)
 */
async function closeConnection() {
  if (client) {
    await client.close();
    client = null;
    console.log("🔌 Conexión a MongoDB cerrada");
  }
}

module.exports = { getDb, closeConnection };
