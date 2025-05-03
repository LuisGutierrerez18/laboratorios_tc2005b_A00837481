const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'tc2005b',
    connectionLimit: 5,
    database: "test",
    //port: 3306 // Agregarlo por si es necesario
});

module.exports = {pool};