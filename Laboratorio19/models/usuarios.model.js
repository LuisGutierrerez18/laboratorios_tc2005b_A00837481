const db = require('../utils/db.js');
const bcrypt = require('bcryptjs');

exports.login = function(correo,contrasena){
    return {
        nombre:"Samuel",
        id:1,
        activo:true
    };
}
exports.User = class {
    constructor(my_username, my_name, my_password) {
        this.username = my_username;
        this.name = my_name;
        this.password = my_password;
    }

    async save() {
        try {
            const query = 
                `INSERT INTO users (username, name, password) 
                VALUES (?, ?, ?)`;
            const values = [this.username, this.name, this.password];
            const result = await db.query(query, values); 
            return result;
        } catch (error) {
            throw error; 
        }
    }

    static async findUser(username) {
        try {
            const result = await db.query(
                `SELECT u.*, r.name AS role, p.accion AS privilege
                 FROM users u
                 JOIN tiene t ON u.id = t.id_usuario
                 JOIN roles r ON t.id_rol = r.id_rol
                 JOIN posee po ON r.id_rol = po.id_rol
                 JOIN privilegios p ON po.id_privilegio = p.id_privilegio
                 WHERE u.username = ?;`,
                [username]
            );
            return result;
        } catch (error) {
            throw error; 
        }
    }
};