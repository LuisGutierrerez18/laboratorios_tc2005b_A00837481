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
            const result = await db.query(
                `INSERT INTO users (username, name, password) VALUES (?, ?, ?)`,
                [this.username, this.name, this.password]
            );
            return result;
        } catch (error) {
            throw error; 
        }
    }

    static async findUser(username) {
        try {
            const result = await db.query(
                'SELECT * FROM users WHERE username = ?',
                [username]
            );
            return result;
        } catch (error) {
            throw error; 
        }
    }
};