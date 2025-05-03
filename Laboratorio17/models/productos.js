const mariadb = require('mariadb');
const pool = require('../db.js').pool;

module.exports = class Productos{
    constructor(nombre,precio) {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
    }
    save(){
        return pool.query(
            'INSERT INTO productos (nombre, precio) VALUES (?, ?)',
            [this.nombre, this.precio]
        )
    }
    static fetchAll(){
        return pool.query('SELECT * FROM productos')
    }
}
 