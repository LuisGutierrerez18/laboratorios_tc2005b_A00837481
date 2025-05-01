// Guardara la informacion de los precios de los productos

const precios = [];

class Precio {
    constructor(precio) {
        this.precio = parseFloat(precio);
    }
    save() {
        precios.push(this);
    }
    static fetchAll() {
        return precios;
    }
    static calcularPrecioTotal() {
        let total = 0;
        for (let i = 0; i < precios.length; i++) {
            total += precios[i].precio;
        }
        return total;
    }
}
module.exports = Precio;

