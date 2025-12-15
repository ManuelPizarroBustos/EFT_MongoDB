// demoVentas.js
// Demostración CRUD sobre la colección "ventas"

const { crearLibro } = require("./libroCrud");
const {
  crearVenta,
  obtenerTodasLasVentas,
  obtenerVentaPorId,
  actualizarEstadoVenta,
  eliminarVenta,
} = require("./ventaCrud");
const { closeConnection } = require("./db");

/**
 * Crea un libro de ejemplo para usar en la venta
 */
function crearLibroParaVenta() {
  return {
    isbn: "978-956-999999-9",
    titulo: "Patrones de Diseño para Librerías",
    subtitulo: "Modelado relacional y NoSQL",
    categoria: {
      id: 2,
      nombre: "Arquitectura de software",
      descripcion: "Patrones y buenas prácticas",
    },
    editorial: {
      id: 2,
      nombre: "Editorial Arquitectos del Código",
      pais: "Chile",
    },
    autores: [
      {
        id: 2,
        nombre: "Ana",
        apellido: "González",
        nacionalidad: "Chilena",
      },
    ],
    precio: 24990,
    stock: {
      actual: 30,
      minimo: 3,
    },
    idioma: "Español",
    numeroPaginas: 420,
    fechaPublicacion: new Date("2023-10-01"),
    descripcion: "Libro sobre patrones de diseño aplicados al dominio de librerías.",
    activo: true,
    fechaCreacion: new Date(),
  };
}

/**
 * Crea un documento de venta embebiendo datos de cliente y detalle
 */
function crearVentaEjemplo(libroId, libroDoc) {
  const cantidad = 2;
  const subtotal = libroDoc.precio * cantidad;
  const descuento = 0;
  const impuestos = Number((subtotal * 0.19).toFixed(2)); // IVA 19%
  const total = subtotal - descuento + impuestos;

  return {
    fechaVenta: new Date(),
    cliente: {
      id: 1,
      rut: "11.111.111-1",
      nombre: "Juan",
      apellido: "Pérez",
      email: "juan.perez@example.com",
      telefono: "+56 9 1234 5678",
      direccion: "Av. Siempre Viva 123",
      ciudad: "Santiago",
    },
    metodoPago: "TARJETA_DEBITO",
    estado: "COMPLETADA",
    observaciones: "Compra de libro técnico",
    detalle: [
      {
        libroId: libroId,
        isbn: libroDoc.isbn,
        titulo: libroDoc.titulo,
        cantidad: cantidad,
        precioUnitario: libroDoc.precio,
        descuentoLinea: descuento,
        subtotalLinea: subtotal,
      },
    ],
    subtotal: subtotal,
    descuento: descuento,
    impuestos: impuestos,
    total: total,
    fechaCreacion: new Date(),
  };
}

async function main() {
  try {
    console.log("========== CREATE (libro + venta) ==========");

    // 1) Creamos un libro para usarlo en la venta
    const libro = crearLibroParaVenta();
    const libroId = await crearLibro(libro);

    // 2) Creamos la venta con el libro embebido en el detalle
    const ventaDoc = crearVentaEjemplo(libroId, libro);
    const ventaId = await crearVenta(ventaDoc);

    console.log("\n========== READ (todas las ventas) ==========");
    await obtenerTodasLasVentas();

    console.log("\n========== READ (venta por _id) ==========");
    await obtenerVentaPorId(ventaId);

    console.log("\n========== UPDATE (estado de la venta) ==========");
    await actualizarEstadoVenta(ventaId, "DEVUELTA");
    await obtenerVentaPorId(ventaId);

    console.log("\n========== DELETE (venta) ==========");
    await eliminarVenta(ventaId);
    await obtenerVentaPorId(ventaId); // Debería mostrar null

  } catch (error) {
    console.error("❌ Error en demoVentas:", error);
  } finally {
    await closeConnection();
  }
}

main();
