const precioDelProducto = 1000;
const edadDelCliente = 25;

let precioFinal;
if (edadDelCliente < 18) {
    precioFinal = precioDelProducto * 0.8;
} else {
    precioFinal = precioDelProducto;
}

console.log("El precio final es de: $" + precioFinal);

const montoTotal = 1000;
const cantidadCuotas = 5;
const tasaInteresAnual = 0.1;

const tasaInteresMensual = tasaInteresAnual / 12;
const cuotaBase = montoTotal / cantidadCuotas;

let saldoRestante = montoTotal;
for (let i = 1; i <= cantidadCuotas; i++) {
    const intereses = saldoRestante * tasaInteresMensual;
    const cuotaConIntereses = cuotaBase + intereses;
    saldoRestante -= cuotaBase;
    console.log("Cuota " + i + ": $" + cuotaConIntereses);
}