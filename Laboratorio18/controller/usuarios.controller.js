const model = require("../models/usuarios.model.js")
const bcrypt = require("bcryptjs");

module.exports.render_login = async(req,res) =>{
    res.render("usuarios/login",{
        registro:false
    });
}

module.exports.do_login = async(req,res) =>{
    try {
        const usuarios = await model.User.findUser(req.body.username)

        if(usuarios.length < 1){
            res.render("usuarios/registro",{
                registro: false
            });
            return;
        }

        const usuario = usuarios[0];
        const doMatch = await bcrypt.compare(req.body.password, usuario.password);

        if(!doMatch) {
            res.render("usuarios/registro",{
                registro: false
            });
            return;
        }

        req.session.username = usuario.username;
        req.session.isLoggedIn = true;
        res.render('usuarios/logged',{
            user:usuario
        });

    }catch (error){
        res.render("usuarios/registro",{
            registro: false
        });
    }        
}
module.exports.get_registro = async(req,res) =>{
    res.render("usuarios/registro", {registro:true});
}

module.exports.post_reguistro = async(req,res) =>{
    try{
        const username = req.body.username;
        const name = req.body.name;
        const password = req.body.password;

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
