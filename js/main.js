const productos = [
    {
        id: 1, nombre: "Frutilla", precio: 1000
    },
    {
        id: 2, nombre: "Manzana", precio: 1500
    },
    {
        id: 3, nombre: "Ciruela", precio: 2000
    },
];

function buscarProducto(productos, nombreProducto) {
    const productoEncontrado = productos.find(
        (producto) => producto.nombre.toLowerCase() === nombreProducto.toLowerCase()
    );
    return productoEncontrado ? productoEncontrado : null;
}

const nombreProducto = prompt("Ingrese el nombre del producto:");
const productoEncontrado = buscarProducto(productos, nombreProducto);

if (productoEncontrado) {
    console.log(`${productoEncontrado.nombre} está disponible.`);
    console.log(`Precio: $${productoEncontrado.precio}`);
} else {
    console.log(`${nombreProducto} no está disponible.`);
}