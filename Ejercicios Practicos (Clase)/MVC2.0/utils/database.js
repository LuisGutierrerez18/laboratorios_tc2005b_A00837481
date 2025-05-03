const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host:"localhost",
    user:"Luis",
    password:"hola123",
    connectionLimit:5,
    database: "user_test",
    port: 3306
});

module.exports = async () => {
    try{
        const connection = await pool.getConnection();
        return connection;
    }catch(error){
        throw error;
    }
}