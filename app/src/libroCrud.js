// libroCrud.js
// Operaciones CRUD para libros

const { getDb } = require("./db");

/**
 * Crea un libro en la colección "libros"
 * Retorna el _id insertado
 */
async function crearLibro(libro) {
  const db = await getDb();
  const coleccion = db.collection("libros");

  const resultado = await coleccion.insertOne(libro);
  console.log("📚 Libro creado con _id:", resultado.insertedId);
  return resultado.insertedId;
}

/**
 * Obtiene todos los libros
 */
async function obtenerTodosLosLibros() {
  const db = await getDb();
  const coleccion = db.collection("libros");

  const libros = await coleccion.find({}).toArray();
  console.log("📚 Lista de libros:", libros);
  return libros;
}

/**
 * Busca un libro por su ISBN
 */
async function obtenerLibroPorIsbn(isbn) {
  const db = await getDb();
  const coleccion = db.collection("libros");

  const libro = await coleccion.findOne({ isbn });
  console.log("📚 Libro encontrado por ISBN:", libro);
  return libro;
}

/**
 * Actualiza el stock.actual de un libro según su ISBN
 */
async function actualizarStockPorIsbn(isbn, nuevoStock) {
  const db = await getDb();
  const coleccion = db.collection("libros");

  const resultado = await coleccion.updateOne(
    { isbn },
    { $set: { "stock.actual": nuevoStock } }
  );

  console.log("✏️ Libros modificados:", resultado.modifiedCount);
  return resultado.modifiedCount;
}

/**
 * Elimina un libro por su ISBN
 */
async function eliminarLibroPorIsbn(isbn) {
  const db = await getDb();
  const coleccion = db.collection("libros");

  const resultado = await coleccion.deleteOne({ isbn });
  console.log("🗑️ Libros eliminados:", resultado.deletedCount);
  return resultado.deletedCount;
}

module.exports = {
  crearLibro,
  obtenerTodosLosLibros,
  obtenerLibroPorIsbn,
  actualizarStockPorIsbn,
  eliminarLibroPorIsbn,
};
