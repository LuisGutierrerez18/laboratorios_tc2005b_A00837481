const http = require('http');
const fs = require('fs');
const{ calcAverage, createTXT, calcMin } = require('./funciones.js'); // Importar las funciones desde el archivo funciones.js

const server = http.createServer((request, response) =>{
    console.log(request.url); // Log the requested URL
    response.setHeader('Content-Type', 'text/html'); // Set the content type to HTML

    if(request.method == "GET"){
        if(request.url == "/"){
            response.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <title>HTML</title>
                </head>
                <body>
                <h1>Laboratorio 10<//h1>
                </body>
                </html>
            `);
            response.end();
        }else if(request.url == "/average"){
            const numbers = [1, 2, 3, 4, 5]; // Example array of numbers
            const average = calcAverage(numbers);
            response.write(`<h2>"El promedio de arreglo: [1, 2, 3, 4, 5] es: " ${average}</h2>`);
            response.end();
        }else if(request.url == "/txt"){
            const content = "Hola, este es un archivo de texto.";
            createTXT('output.txt', content); // Escribe el contenido en un archivo txt
            response.write(`<h2>"El archivo ha sido creado</h2>`);
            response.end();
        }else if(request.url == "/min"){
            const numbers2 = [1, 2, 3, 4, 5]; // Example array of numbers
            const min = calcMin(numbers2);
            response.write(`<h2>"El minimo del arreglo [1, 2, 3, 4, 5] es: " ${min}</h2>`);
            response.end();
        }else if(request.url == "/form"){
            response.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <title>Formulario</title>
                </head>
                <body>
                    <h2>Formulario</h2>
                    <form action="/submit" method="POST">
                        <label> Nombre: <input type="text" name="nombre" required></label>
                        <button type="submit">Enviar</button>
                    </form>
                </body>
                </html>
            `);
            response.end();  
            }else{
                response.statusCode = 404; // Set the response status code to 404  
                response.write('<h1>404 Not Found</h1>');
                response.end();
            }
        }else if(request.url == "/submit" && request.method == "POST"){
            let body = '';
            request.on('data', (data) =>{ //request.on escucha los datos que llegan para despues mandarlos al servidor 
                body += data;
            });
            request.on('end',()=>{ //request.on escucha el final de la petición
                const nombre = body.split('=')[1]; // Extraer el nombre de la solicitud
                fs.writeFileSync('nombre.txt', nombre); // Guardar el nombre en un archivo

                response.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <title>HTML</title>
                </head>
                <body>
                    <h1>Nombre enviado correctamente</h1>
                </body>
                </html>'
                `);
                response.end();
            });      
    }else{
        response.statusCode = 404; // Set the response status code to 404  
        response.write('<h1>404 Not Found</h1>');
        response.end();
    }
    
});

// Inicializar el servidor
server.listen(3000, () => {
    console.log('Acceder al servidor via puerto 3000 de localhost');
});