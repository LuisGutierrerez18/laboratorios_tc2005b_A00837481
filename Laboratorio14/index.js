const http = require('http');
const url = require('url');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const fs = require('fs');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.get('/', (req, res, next) => {
    res.render('landingpage.ejs');
});

app.get('/form', (req, res) => {
    res.render('form.ejs');
});

app.post('/form', (req, res) => {
    const nombre = req.body.nombre;
    res.cookie('nombre', nombre);
    res.redirect('/saluda_usuario');
});

app.get('/saluda_usuario', (req, res) => {
    const nombre = req.cookies.nombre;
    res.render('saluda_usuario.ejs', { nombre: nombre });
});

app.listen(3000);