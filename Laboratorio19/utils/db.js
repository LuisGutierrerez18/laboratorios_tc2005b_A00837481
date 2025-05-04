const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'tc2005b',
    connectionLimit: 5,
    database: "test",
    //port: 3306 // Agregarlo por si es necesario
});

module.exports = {
    query: async (query, params) => {
        let conn;
        try {
            conn = await pool.getConnection();
            const result = await conn.query(query, params);
            return result;
        } catch (err) {
            throw err;
        } finally {
            if (conn) conn.release();
        }
    },
}