// ventaCrud.js
// Operaciones CRUD para ventas

const { ObjectId } = require("mongodb");
const { getDb } = require("./db");

function toObjectId(id) {
  return typeof id === "string" ? new ObjectId(id) : id;
}

/**
 * Crea una venta en la colección "ventas"
 */
async function crearVenta(venta) {
  const db = await getDb();
  const coleccion = db.collection("ventas");

  const resultado = await coleccion.insertOne(venta);
  console.log("🧾 Venta creada con _id:", resultado.insertedId);
  return resultado.insertedId;
}

/**
 * Obtiene todas las ventas
 */
async function obtenerTodasLasVentas() {
  const db = await getDb();
  const coleccion = db.collection("ventas");

  const ventas = await coleccion.find({}).toArray();
  console.log("🧾 Lista de ventas:", ventas);
  return ventas;
}

/**
 * Obtiene una venta por su _id
 */
async function obtenerVentaPorId(id) {
  const db = await getDb();
  const coleccion = db.collection("ventas");

  const venta = await coleccion.findOne({ _id: toObjectId(id) });
  console.log("🧾 Venta encontrada:", venta);
  return venta;
}

/**
 * Actualiza el estado de una venta (PENDIENTE, COMPLETADA, DEVUELTA, etc.)
 */
async function actualizarEstadoVenta(id, nuevoEstado) {
  const db = await getDb();
  const coleccion = db.collection("ventas");

  const resultado = await coleccion.updateOne(
    { _id: toObjectId(id) },
    { $set: { estado: nuevoEstado } }
  );

  console.log("✏️ Ventas modificadas:", resultado.modifiedCount);
  return resultado.modifiedCount;
}

/**
 * Elimina una venta por _id
 */
async function eliminarVenta(id) {
  const db = await getDb();
  const coleccion = db.collection("ventas");

  const resultado = await coleccion.deleteOne({ _id: toObjectId(id) });
  console.log("🗑️ Ventas eliminadas:", resultado.deletedCount);
  return resultado.deletedCount;
}

module.exports = {
  crearVenta,
  obtenerTodasLasVentas,
  obtenerVentaPorId,
  actualizarEstadoVenta,
  eliminarVenta,
};
