const http    = require('http');
const express = require('express');
const path    = require('path');
const fs      = require('fs');
const app     = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const session = require('express-session');
app.use(session({
    secret: "mi string secreto que debe ser un string aleatoriio muy largo, no como este", // Cambia esto por una clave secreta
    resave: false, // La sesion no se guarda en cada peticion, sino solo cuando se modifica
    saveUninitialized: false, // Asegura q no se guarde una sesion para cada peticion q no lo necesite
}));

app.get('/', (request, response, next) => {
    response.setHeader('Content-Type', 'text/plain');
    response.setHeader('Set-Cookie', 'mi_cookie = 123 HttpOnly');
    response.send("Hola Mundo");
    response.end(); 
});

app.get('/test_cookie', (request, response, next) => {
    response.setHeader('Content-Type', 'text/plain');
    response.send(request.cookies.mi_cookie);
    response.end();
});

app.get('/test_session', (req,res)=>{
    req.session.mi_variable = "valor";
    req.session.id_user = 123;
    res.setHeader('Content-Type', 'text/plain');
    res.send(req.session.mi_variable);
    res.end();
});

app.get('/test_session_variable', (req,res)=>{
    res.setHeader('Content-Type', 'text/plain');
    res.send(req.session.mi_variable);
    res.end();
});

app.get('/logout', (req,res)=>{
    req.session.destroy(() => {
        res.redirect("/"); //Este código se ejecuta hasta que la sesión se elimina.
    });
});

const server = http.createServer( (request, response) => {    
    console.log(request.url);
});
app.listen(3000);