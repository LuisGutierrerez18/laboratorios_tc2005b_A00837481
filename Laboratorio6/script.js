// Variable global para que todo el programa pueda hacer uso de esta 'base de datos'
let saved = ["perro123", "gato456789", "12Hola13"];

function create(event){
    event.preventDefault(); // Evita que el formulario se envíe y la página se recargue
    
    // Guardar la contraseña creada por el usuario
    let contCreada = document.getElementById("CrearCont").value;
    
    // Agregar la contraseña al array
    if(contCreada.length<8){
        alert("La contraseña debe tener al menos 8 caracteres");
        return;
    }
    saved.push(contCreada);
    document.getElementById("CrearCont").value = "";//Limpiar el input box
    alert("Contraseña creada correctamente"); 
}

function verificar(event){
    event.preventDefault();

    let input = document.getElementById("password").value; // Obtener la contraseña ingresada por el usuario

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
        resultado.style.color = "red";
    }
    
    document.getElementById("password").value = ""; // Limpiar el input box
}
document.getElementById("Crear").addEventListener("submit", create);
document.getElementById("Verificar").addEventListener("submit", verificar);