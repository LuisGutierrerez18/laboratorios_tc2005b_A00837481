const http = require('http');
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

const controlPrecios = require('./controller/controller.js');

const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'luis',
    password: 'password',
    connectionLimit: 5,
    database: "test",
    //port: 3306 // Agregarlo por si es necesario
});

app.get('/', (request, response, next) => {
    response.render('landingpage.ejs');
});

app.get('/add', (req,res,next)=>{
    res.render('add.ejs');
});
app.post('/add-precio', (req,res,next)=>{
    const precio = req.body.precio;
    const precioObj = new controlPrecios(precio);
    precioObj.save();
    res.redirect('/add');
})
app.post('/add-producto', (req,res,next)=>{
    const nombre = req.body.nombre;
    const precio = req.body.precio;

    productos.push({
        nombre: nombre,
        precio: precio
    });
    res.redirect('/add');
})

app.listen(3000);