const model = require("../models/usuarios.models");

module.exports.test_json = async(req,res) =>{
    res.status(200).json({
        status:"success",
        message:"Prueba JSON"
    });
};

module.exports.index = async(req,res) =>{
    let usuarios = model.ObtenerUsuarios("user","pass");
    /*res.status(200).send({
        status:"success",
        message:"Get all users",
        usuarios: usuarios
    });*/
    res.render("./usuarios/obtener_usuarios",{
       usuarios: usuarios 
    });
};