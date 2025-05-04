const http = require('http');
const url = require('url');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// Encriptar contraseñas
const bcrypt = require('bcryptjs');
const usuariosRoutes = require('./routes/usuarios.routes.js');
const model = require('./models/usuarios.model.js');

const fs = require('fs');
const path = require('path');

const app = express();

// Middleware de proteccion de ruteo
const isAuth = require('./utils/is-auth.js');
const csrf = require('csurf');
const csrfProtection = csrf();


app.set('view engine', 'ejs');
app.set('views', 'views');

const usersFilePath = path.join(__dirname, 'data', 'users.json');
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
   //res.locals.isLoggedIn = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

let users = [];
if(fs.existsSync(usersFilePath)){
    users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));;
}

app.get('/', (req, res, next) => {
    res.render('landingpage.ejs');
});

app.get('/registro', (req, res) => {
    res.render('form.ejs',{ csrfToken: req.csrfToken() });
});

app.post('/registro', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const role_id = 2; // Para usuarios normales

    try {
        console.log("Password before hashing:", password);
        console.log("Revisando si el usuario existe");
        const existingUsers = await model.User.findUser(username);
        console.log("Usuario encontrado:", existingUsers);

        if (existingUsers.length > 0) {
            console.log("El usuario ya existe");
            return res.redirect('/registro');
        }

        console.log("Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 12);
        console.log("Hashed password:", hashedPassword);

        console.log("Creating new user...");
        const newUser = new model.User(username, username, hashedPassword, role_id);
        await newUser.save();

        res.cookie('nombre', username);
        res.redirect('/saluda_usuario');
    } catch (error) {
        console.error("Detalles del error:", error);
        res.status(500).json({
            msg: "Error al registrar el usuario"
        });
    }
});

app.get('/saluda_usuario', (req, res) => {
    const nombre = req.cookies.nombre;
    res.render('saluda_usuario.ejs', { errorMessage: null, nombre: nombre });
});

app.get('/login', (req, res) => {
    res.render('usuarios/login.ejs', { 
        errorMessage: null, 
        csrfToken: req.csrfToken()
    });
});

app.post('/login', async (req, res) => {
    const nombre = req.body.username;
    const password = req.body.password;

    try {
        console.log("Revisando si el usuario existe...");
        const existingUsers = await model.User.findUser(nombre);
        console.log("Usuario encontrado:", existingUsers);
        if (existingUsers.length === 0) {
            console.log("El usuario no existe");
            return res.render('usuarios/login.ejs', {
                errorMessage: 'El usuario no existe',
                csrfToken: req.csrfToken()
            });
        }

        const user = existingUsers[0];
        console.log("Usuario encontrado:", user);

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("Contraseña incorrecta");
            return res.render('usuarios/login.ejs', {
                errorMessage: 'Contraseña incorrecta',
                csrfToken: req.csrfToken()
            });
        }

        console.log("Contraseña correcta");
        req.session.isLoggedIn = true;
        req.session.role = user.role; // Asignar un rol por defecto si no existe
        req.session.username = user.username;
        req.session.privileges = existingUsers.map((u) => u.privilege)|| [];
        
        console.log("Rol del usuario: ", req.session.role);
        console.log("Privilegios del usuario:", req.session.privileges);

        if(req.session.role === "admin") {
            console.log("Usuario es admin --> redirigiendo a admin_view");
            return res.render("usuarios/admin_view.ejs", {
                usuario: user,
                role: req.session.role,
                privileges: req.session.privileges,
            });
        }else if(req.session.role === "cliente") {
            console.log("Usuario no es admin --> redirigiendo a user_view");
            return res.render("usuarios/user_view.ejs", {
                usuario: user,
                role: req.session.role,
                privileges: req.session.privileges,
            });
        }else {
            console.log("Rol no reconocido");
            return res.setatus(403).send("Acceso denegado");
        }
        //res.cookie('nombre', nombre);
        //res.redirect('/saluda_usuario');
    } catch (error) {
        console.error("Detalles del error:", error);
        res.status(500).json({
            msg: "Error al iniciar sesión"
        });
    }
});

app.listen(3000);