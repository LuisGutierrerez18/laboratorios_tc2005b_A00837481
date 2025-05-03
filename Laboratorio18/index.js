const http = require('http');
const url = require('url');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const usuariosRoutes = require('./routes/usuarios.routes.js');

const fs = require('fs');
const path = require('path');

const app = express();

// Middleware de proteccion de ruteo
const isAuth = require('./utils/is-auth.js');
const csrf = require('csurf');
const csrfProtection = csrf();


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/usuarios', usuariosRoutes);

// Inicializar la sesion
app.use(session({
    secret: 'tc2005b',
    resave: false,
    saveUninitialized: false,
}));
app.use(csrfProtection);

//middleware para vistas
app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.get('/', (req, res, next) => {
    res.render('landingpage.ejs');
});

app.get('/form', (req, res) => {
    res.render('form.ejs');
});

app.post('/form', (req, res) => {
    const nombre = req.body.nombre;
    const password = req.body.password;
    //let user = [];

    // Encripta la contrseña 
    bcrypt.hash(password,12)
        .then(hashedPassword => {
            users.push({ nombre, password: hashedPassword });
            fs.writeFileSync(usersFilePath, JSON.stringify(users));
        res.cookie('nombre', nombre);
        res.redirect('/saluda_usuario');
    })
});

app.get('/saluda_usuario', (req, res) => {
    const nombre = req.cookies.nombre;
    res.render('saluda_usuario.ejs', { nombre: nombre });
});

app.listen(3000);