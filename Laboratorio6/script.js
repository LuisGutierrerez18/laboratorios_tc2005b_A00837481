function verificar(event){
    event.preventDefault();

    let saved = ["perro123", "gato456789", "12Hola13"];
    
    // Guardar la contraseña creada por el usuario
    let contCreada = document.getElementById("CrearCont").value;
    
    // Agregar la contraseña al array
    if(contCreada.length<8){
        alert("La contraseña debe tener al menos 8 caracteres");
        return;
    }
    saved.push(contCreada);
    document.getElementById("CrearCont").value = "";
    
    // Guardar la contraseña creada por el usuario
    let input = document.getElementById("password").value;


    // Verificar si la contraseña existe en el array
    let existe = saved.includes(input);

    let resultado = document.getElementById("resultado")//.style.fontStyle = "italic";
    // Revisar si la contraseña existe
    if(existe){
        alert("La contraseña existe y es correcta");
        resultado.innerHTML = "La contraseña existe y es correcta";
        resultado.style.fontStyle = "italic";
        resultado.style.color = "green";
    }
    else{
        alert("La contraseña no existe");
        resultado.innerHTML = "La contraseña no existe";
        resultado.style.fontStyle = "italic";
        resultado.style.color = "green";
    }
    
    document.getElementById("password").value = "";
}