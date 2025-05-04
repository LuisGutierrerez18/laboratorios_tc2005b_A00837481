const model = require("../models/usuarios.model.js")
const bcrypt = require("bcryptjs");

module.exports.render_login = (req,res) =>{
    res.render("form",{csrfToken: req.csrfToken()});
};

module.exports.do_login = async(req,res) =>{
    try {
        const usuarios = await model.User.findUser(req.body.username);

        if (usuarios.length < 1) {
            return res.render("form", {
                registro: false,
                errorMessage: "El usuario no existe",
                csrfToken: req.csrfToken(),
            });
        }

        const usuario = usuarios[0];
        const doMatch = await bcrypt.compare(req.body.password, usuario.password);

        if (!doMatch) {
            return res.render("form", {
                registro: false,
                errorMessage: "Contraseña incorrecta",
                csrfToken: req.csrfToken(),
            });
        }

        req.session.username = usuario.username;
        req.session.isLoggedIn = true;
        req.session.role = usuario.role; 
        req.session.privileges = usuarios.map((u) => u.privilege); 

        if (req.session.role === "admin") {
            return res.render("usuarios/admin_view.ejs", {
                usuario: usuario,
                role: req.session.role,
                privileges: req.session.privileges,
            });
        } else {
            return res.render("usuarios/user_view.ejs", {
                usuario: usuario,
                role: req.session.role,
                privileges: req.session.privileges,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).render("form", {
            registro: false,
            errorMessage: "Error interno del servidor",
            csrfToken: req.csrfToken(),
        });
    }
};
module.exports.get_registro = async(req,res) =>{
    res.render("form", {
        registro:true,
        csrfToken: req.csrfToken()
    });
}

module.exports.post_registro = async(req,res) =>{
    try{
        const username = req.body.username;
        const name = req.body.name;
        const password = await bcrypt.hash(req.body.password,12);

        const user = new model.User(username, name, password);
        const savedUSer = await user.save();

        res.status(201).redirect("/usuarios/login");
    }catch(error){
        console.error(error);
        res.status(500).json({
            msg:"Error al registrar el usuario"
        });
    }
}
