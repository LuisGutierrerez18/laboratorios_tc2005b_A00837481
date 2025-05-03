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

const Productos = require('./models/productos.js');


app.get('/', (request, response, next) => {
    response.render('landingpage.ejs');
});

app.get('/add', (req,res,next)=>{
    Productos.fetchAll()
    .then((productos) => {
        const total = productos.reduce((sum, producto) => sum + parseFloat(producto.precio), 0);
        res.render('add.ejs',{ productos: productos, precios: [], total: total });
    })
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

    const producto = new Productos(nombre, precio);
    producto.save()

    res.redirect('/add');
})

app.listen(3000);