const http = require("http");
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/form_method',(req,res)=>{
    res.setHeader('Content-type','text/html');
    const html = fs.readFileSync(path.resolve(__dirname,"./form.html"),'utf8');
    res.write(html);
    res.end();
});

app.get('/test_html', (request, response, next) => {
    response.setHeader('Content-Type', 'text/html');    
    response.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Código en HTML</title>
        </head>
        <body>
            <h1>hola mundo desde express</h1>
        </body>
        </html>
    `);
    response.end(); 
});

app.get('/test_ejs',(req,res, next)=>{
    let frases = [];
    frases.push("Hola mundo");
    frases.push("frase 2");
    frases.push("frase 3");
    frases.push("frase 4");
    
    res.render('index',{
        frases_a_escribir: frases
    }); 
});

const server = http.createServer((request,response)=>{
    console.log(request.url);
});

app.listen(3000);