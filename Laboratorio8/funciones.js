const fs = require('fs'); 

// Funcion para calcular el average de un array
function calcAverage(numbers){
    let sum = 0;
    for(let i = 0; i < numbers.length; i++){
        sum += numbers[i];
    }
    const average = sum / numbers.length;
    console.log("El promedio es: " + average);
    return average;
}

// Funcion para escribir un archivo txt
function createTXT(fileName, content){
    fs.writeFileSync(fileName, content, 'utf-8');
    console.log(`El archivo ${fileName} ha sido creado`);
}


// Funcion para calcular el mínimo de un array
function calcMin(numbers){
    let min = numbers[0];
    for(let i = 1; i < numbers.length; i++){
        if(numbers[i] < min){
            min = numbers[i];
        }
    }
    console.log("El mínimo es: " + min);
    return min;
}

module.exports = {
    calcAverage,
    createTXT,
    calcMin
};