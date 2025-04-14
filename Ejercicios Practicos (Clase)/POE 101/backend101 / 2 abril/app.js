//console.log("Hola Mundo");

//fs es el módulo que contiene las funciones para 
//manipular el sistema de archivos
const filesystem = require('fs');

//Se escribe el segundo parámetro en el archivo del primer parámetro
filesystem.writeFileSync('hola.txt', 'Hola mundo desde node');

//-----------------
//ASYNC SORT
const arreglo = [5000, 60, 90, 100, 10, 20, 10000, 0, 120, 2000, 340, 1000, 50]; //Cada uno es el tiempo

/*for (let item of arreglo) {
    setTimeout(() => { // setTimeout ejecuta la función después de un tiempo
        console.log(item); // Imprime
    }, item);
}*/


//console.log("jojo te hackié");
//console.log("¿En dónde se ejecuta esta línea?");

const te_hackie = () => {
    console.log("jojo te hackié");
}
//setTimeout ejecuta la función recibida como primer parámetro 
//cuando hayan transcurrido los milisegundos del segundo parámetro
setTimeout(te_hackie, 7000);

console.log("¿En dónde se ejecuta esta línea?");