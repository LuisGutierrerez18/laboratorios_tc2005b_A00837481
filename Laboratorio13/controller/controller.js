const Precio = require('../models/model_precios.js');

//exports funciona para exportar funciones

/*exports.action = (request, response, next) => {
    response.render('view_file', { 
        atribute_1: 'Data 1', 
        atribute_2: 'Data 2'
    });
};*/

exports.getAdd = (request, response, next) => {
    const precios = Precio.fetchAll();
    const total = Precio.calcularPrecioTotal();
    response.render('add', { precios: precios, total: total });
};

exports.postAdd = (request, response, next) => {
    const precio = new Precio(request.body.valor); //! Check Precio
    precio.save();
    const precios = Precio.fetchAll();
    const total = Precio.calcularPrecioTotal();
    response.redirect('/add');
}

exports.getList = (request, response, next) => {
    const precios = modelo.Precio.fetchAll();
    const total = modelo.Precio.calcularPrecioTotal();
    response.render('add`', { precios: precios, total: total });
}


