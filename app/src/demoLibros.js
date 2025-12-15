// demoLibros.js
// Demostración CRUD sobre la colección "libros"

const {
  crearLibro,
  obtenerTodosLosLibros,
  obtenerLibroPorIsbn,
  actualizarStockPorIsbn,
  eliminarLibroPorIsbn,
} = require("./libroCrud");
const { closeConnection } = require("./db");

/**
 * Documento de ejemplo para un libro,
 * basado en el caso de librería (adaptado desde el modelo relacional)
 */
function crearLibroEjemplo() {
  return {
    isbn: "978-956-123456-7",
    titulo: "Introducción a PL/SQL con Oracle 21c",
    subtitulo: "Buenas prácticas para desarrollo de librerías",
    categoria: {
      id: 1,
      nombre: "Programación",
      descripcion: "Libros de programación y bases de datos",
    },
    editorial: {
      id: 1,
      nombre: "Editorial BD Chile",
      pais: "Chile",
    },
    autores: [
      {
        id: 1,
        nombre: "Manuel",
        apellido: "Pizarro",
        nacionalidad: "Chilena",
      },
    ],
    precio: 19990,
    stock: {
      actual: 20,
      minimo: 5,
    },
    idioma: "Español",
    numeroPaginas: 350,
    fechaPublicacion: new Date("2024-01-15"),
    descripcion: "Libro técnico para aprender PL/SQL y buenas prácticas.",
    activo: true,
    fechaCreacion: new Date(),
  };
}

async function main() {
  const isbn = "978-956-123456-7";

  try {
    console.log("========== CREATE ==========");
    const libroEjemplo = crearLibroEjemplo();
    await crearLibro(libroEjemplo);

    console.log("\n========== READ (por ISBN) ==========");
    await obtenerLibroPorIsbn(isbn);

    console.log("\n========== READ (todos los libros) ==========");
    await obtenerTodosLosLibros();

    console.log("\n========== UPDATE (stock) ==========");
    await actualizarStockPorIsbn(isbn, 10);
    await obtenerLibroPorIsbn(isbn);

    console.log("\n========== DELETE ==========");
    await eliminarLibroPorIsbn(isbn);
    await obtenerLibroPorIsbn(isbn); // Debería mostrar null

  } catch (error) {
    console.error("❌ Error en demoLibros:", error);
  } finally {
    await closeConnection();
  }
}

main();
