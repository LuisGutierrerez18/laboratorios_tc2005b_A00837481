const http = require("http");
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Routes
app.get('/',(req,res)=>{

    let frases = [];
    frases.push("Hola mundo");
    frases.push("Laboratorio 12");
    frases.push("Luis Gutierrez");
    frases.push("Matricula: A00837481");
    
    res.render('index',{
        frases_a_escribir: frases
    }); 
});
app.get('/form', (req, res)=>{
    // form html
    res.render('form'); 
});

app.post('/cuadrado',(req, res)=>{
    const numero = parseFloat(req.body.numero); //parseFloat convierte el string a un numero
    const resultado= numero*numero;
    res.render('resultado',{
        resultado: resultado
    });
});

app.use((req,res)=>{
    res.status(404).send(`
        <html>
            <head>
                <title>404 Not Found</title>
            </head>
            <body>
                <h1>404 Not Found</h1>
                <p>La pagina no existe.</p>
            </body>
        </html>
    `);
}); // 404 not found 


app.listen(3000);


