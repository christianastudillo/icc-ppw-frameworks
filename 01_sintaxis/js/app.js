' use strict ';

const nombrePrincipal = 'Christian';
const apellido = 'Astudillo';
let ciclo = '5';
const activo = true


const direccion = {
    ciudad :  'cuenca',
    provincia : 'azuay'
}

console.table({nombre, apellido, ciclo, activo, direccion});
    

const calcularPromedio = (notas) => //promedio ;
    notas.reduce((acum, nota) => acum + nota, 0) / notas.length;

const esMayorDeEdad = (edad) => edad >= 18;

const getSaludo = (nombre, hora) => {
    if(hora < 12) 
        return `Buenos días, ${nombre}`;
    else if(hora < 18)
        return `Buenas tardes, ${nombre}`;
    else
        return `Buenas noches, ${nombre}`;
}

const getSaludo2 = (nombre, hora) => hora < 12 ? `Buenos días, ${nombre}` : `Buenas noches, ${nombre}`;

//Mostrar en html
document.getElementById('nombre').textContent = `Nombre: ${nombrePrincipal}`;
document.getElementById('apellido').textContent = `Apellido: ${apellido}`;
document.getElementById('ciclo').textContent = `Ciclo: ${ciclo}`;
