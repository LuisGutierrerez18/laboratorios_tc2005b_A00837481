const http = require('http');
const fs = require('fs');
const{ calcAverage, createTXT, calcMin } = require('./funciones.js'); // Importar las funciones desde el archivo funciones.js

const server = http.createServer((request, response) =>{
    console.log(request.url); // Log the requested URL
    response.setHeader('Content-Type', 'text/html'); // Set the content type to HTML

    if(request.url == "/"){
        response.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>HTML</title>
            </head>
            <body>
               <h1>Laboratorio 8: Backend<//h1>
            </body>
            </html>
        `);
        response.end();
    }else if(request.url == "/average"){
        const numbers = [1, 2, 3, 4, 5]; // Example array of numbers
        const average = calcAverage(numbers);
        response.write(`<h2>"El promedio de arreglo es: [1, 2, 3, 4, 5]" ${average}</h2>`);
        response.end();}

    else if(request.url == "/txt"){
       const content = "Hola, este es un archivo de texto.";
       createTXT('output.txt', content); // Escribe el contenido en un archivo txt
       response.write(`<h2>"El archivo ha sido creado</h2>`);
       response.end();
    }
    else if(request.url == "/min"){
        const numbers2 = [1, 2, 3, 4, 5]; // Example array of numbers
        const min = calcMin(numbers2);
        response.write(`<h2>"El minimo del arreglo [1, 2, 3, 4, 5] es: " ${min}</h2>`);
        response.end();
    }
});

// Inicializar el servidor
server.listen(3000, () => {
    console.log('Acceder al servidor via puerto 3000 de localhost');
});