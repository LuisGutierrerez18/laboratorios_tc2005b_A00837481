exports.obtenerUsuarios = function(correo, contrasena){
    let usuarios = [];
    usuarios.push({
        nombre: "Samuel",
        id:1,
        activo: true
    });
    usuarios.push({
        nombre: "Lisa",
        id:2,
        activo: true
    });
    usuarios.push({
        nombre: "Bob",
        id:3,
        activo: false
    });
    usuarios.push({
        nombre: "Alicia",
        id:4,
        activo: true
    });

    return usuarios;
}