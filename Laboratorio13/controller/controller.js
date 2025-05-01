const Precio = require('../models/model_precios.js');

//exports funciona para exportar funciones

/*exports.action = (request, response, next) => {
    response.render('view_file', { 
        atribute_1: 'Data 1', 
        atribute_2: 'Data 2'
    });
};*/

exports.getAdd = (request, response, next) => {
    response.render('add');
};

exports.postAdd = (request, response, next) => {
    const precio = new Price(request.body.precio);
    precio.save();
    response.redirect('/add');
}

exports.getList = (request, response, next) => {
    const precios = modelo.Precio.fetchAll();
    const total = modelo.Precio.calcularPrecioTotal();
    response.render('list', { precios: precios, total: total });
}
/*
const precios = modelo.Precio.fetchAll();
module.exports = Precio;*/

