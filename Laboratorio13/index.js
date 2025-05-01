const http = require('http');
const url = require('url');

const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const controlPrecios = require('./controller/controller.js');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (request, response, next) => {
    response.render('landingpage.ejs')
});

/*app.get('/add', (request, response) => {
    response.render('add.ejs')
});*/

app.post('/add', controlPrecios.postAdd);
app.get('/add', controlPrecios.getAdd);
app.get('/list', controlPrecios.getList);

/*
app.post('/add', (request, response) => {
    const precio = new controlPrecios.Precio(request.body.precio);
    precio.save();
    response.redirect('/list');
});

app.get('/list', (request, response) => {
    const precios = controlPrecios.Precio.fetchAll();
    const total = controlPrecios.Precio.calcularPrecioTotal();
    response.render('list.ejs', { precios: precios });
});*/

app.listen(3000)