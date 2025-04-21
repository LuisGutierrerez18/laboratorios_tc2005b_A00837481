const http = require("http");
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));


//Middleware
app.use((request, response, next)=>{
    console.log("Autenticación!");
    next(); //Le permite a la petición avanzar hacia el siguiente middleware
});

/*app.use((request,response,next)=>{
    console.log("Verificación de middleware!");
    response.send("Hola Mundo"); //Mandar la respuesta
});*/

// Routes
app.get("/", (req, res) => {
    res.setHeader("Content-type", "text/plain");
    res.send("GET URL index /");
});

app.post("/", (req, res) => {
    res.setHeader("Content-type", "text/plain");
    res.send("POST URL index /");
});

// Ruta para el calculo de la suma de dos numeros
app.get('/addition', (req, res) => {
    res.setHeader("Content-Type","text/HTML")
    res.send(`
        <html>
            <head>
                <title>Sumar</title>
            </head>
            <body>
                <form action="/addition" method="POST">
                    <input type="text" name="num1" placeholder="Número 1">
                    <input type="text" name="num2" placeholder="Número 2">
                    <button type="submit">Sumar</button>
                </form>
            </body>
        `);
});

app.post('/addition', (req, res) => {
    const num1 = Number(req.body.num1);
    const num2 = Number(req.body.num2);
    const sum = num1 + num2;
    res.setHeader("Content-Type","text/HTML")
    res.send(`
        <html>
            <head>
                <title>Resultado</title>
            </head>
            <body>
                <h3>La suma de ${num1} y ${num2} es ${sum}</h3>
            </body>
        </html>
    `);
});


// Ruta para el calculo de la resta de dos numeros
app.get('/resta', (req, res) => {
    res.setHeader("Content-Type","text/HTML")
    res.send(`
        <html>
            <head>
                <title>Resta</title>
            </head>
            <body>
                <form action="/resta" method="POST">
                    <input type="text" name="num1" placeholder="Número 1">
                    <input type="text" name="num2" placeholder="Número 2">
                    <button type="submit">Restar</button>
                </form>
            </body>
        `);
});

app.post('/resta', (req, res) => {
    const num1 = Number(req.body.num1);
    const num2 = Number(req.body.num2);
    const sum = num1 - num2;
    res.setHeader("Content-Type","text/HTML")
    res.send(`
        <html>
            <head>
                <title>Resultado</title>
            </head>
            <body>
                <h3>La resta de ${num1} y ${num2} es ${sum}</h3>
            </body>
        </html>
    `);
});

// Ruta para el calculo de la division de dos numeros
app.get('/division', (req, res) => {
    res.setHeader("Content-Type","text/HTML")
    res.send(`
        <html>
            <head>
                <title>Division</title>
            </head>
            <body>
                <form action="/division" method="POST">
                    <input type="text" name="num1" placeholder="Número 1">
                    <input type="text" name="num2" placeholder="Número 2">
                    <button type="submit">Dividir</button>
                </form>
            </body>
        `);
});

app.post('/division', (req, res) => {
    const num1 = Number(req.body.num1);
    const num2 = Number(req.body.num2);
    const sum = num1 / num2;
    res.setHeader("Content-Type","text/HTML")
    res.send(`
        <html>
            <head>
                <title>Resultado</title>
            </head>
            <body>
                <h3>La division de ${num1} y ${num2} es ${sum}</h3>
            </body>
        </html>
    `);
});

// Ruta para el calculo de la multiplicacion de dos numeros
app.get('/multiplication', (req, res) => {
    res.setHeader("Content-Type","text/HTML")
    res.send(`
        <html>
            <head>
                <title>Multiplicacion</title>
            </head>
            <body>
                <form action="/multiplication" method="POST">
                    <input type="text" name="num1" placeholder="Número 1">
                    <input type="text" name="num2" placeholder="Número 2">
                    <button type="submit">Multiplicar</button>
                </form>
            </body>
        `);
});

app.post('/multiplication', (req, res) => {
    const num1 = Number(req.body.num1);
    const num2 = Number(req.body.num2);
    const sum = num1 * num2;
    res.setHeader("Content-Type","text/HTML")
    res.send(`
        <html>
            <head>
                <title>Resultado</title>
            </head>
            <body>
                <h3>La multiplicacion de ${num1} y ${num2} es ${sum}</h3>
            </body>
        </html>
    `);
});

const server = http.createServer((request,response)=>{
    console.log(request.url);
});

app.listen(3000);


// Para entrar a cada una de las rutas interactivas, se debe ingresar a la siguiente URL:
// http://localhost:3000/addition
// http://localhost:3000/resta
// http://localhost:3000/multiplication
// http://localhost:3000/division