const http    = require('http');
const express = require('express');
const path    = require('path');
const fs      = require('fs');
const app     = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'luis',
    password: 'password',
    connectionLimit: 5,
    database: "test",
    //port: 3306 // Agregarlo por si es necesario
});

app.get('/', (request, response, next) => {
    response.setHeader('Content-Type', 'text/plain');
    response.send("Hola Mundo");
    response.end(); 
});

app.get("test_db", async (request, response, next) => {
    let conn; //Variable de conexión
    try{
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM books"); // Consulta a la base de datos en formato string 
        console.log(rows);
        const jsonS=JSON.stringify(rows); // Convertir a JSON
        //response.writeHead(200,{'Content-Type': 'text/html'});
        response.end(jsonS);
    }catch(e){
        console.log(e);
    }
});
const server = http.createServer( (request, response) => {    
    console.log(request.url);
});
app.listen(3000);