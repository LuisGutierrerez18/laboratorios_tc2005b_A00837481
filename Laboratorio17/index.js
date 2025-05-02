const http = require('http');
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

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