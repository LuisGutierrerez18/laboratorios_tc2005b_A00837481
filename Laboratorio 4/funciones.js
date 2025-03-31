document.getElementById('formEj1').addEventListener('click', ejercicio1);
function ejercicio1(event){ //event es el evento que se genera al hacer click en el boton

    event.preventDefault(); // Evita que el formulario se envíe y la página se recargue
    
    let numero = parseInt(prompt('Numero'))
    
    if (isNaN(numero) || numero < 1) {
        alert("Por favor, introduce un número válido mayor a 0.");
        return;
    }
    
    /*El codigo que sigue los elementos tr (table row), td (table data), th (table header) 
    Son elementos de javascript con html para construir la tabla con la informacion requerida*/

    let result = "<h3>Tabla</h3><table border = '2'><tr><th>Número</th><th>Cuadrado</th><th>Cubo</th></tr>"
    for(i = 1; i<=numero; i++){
        // ${i} es una forma de combinar variables numericas en un string
        // En este caso, se está creando una fila de la tabla con el número, su cuadrado y su cubo
        // El resultado se va acumulando en la variable result
        result += `<tr>
                      <td>${i}</td> <!-- Número ingresado -->
                      <td>${i * i}</td> <!-- Número al cuadrado -->
                      <td>${i * i * i}</td> <!-- Número al cubo -->
                   </tr>`;
    }
    result += "</table>";
    //document.write(result);
    document.getElementById('resultado').innerHTML = result;
}

document.getElementById('formEj2').addEventListener('click', ejercicio2);
function ejercicio2(){
    let result = 0;
    // Generar dos numeros random (entre 1 y 100)
    let num1 = Math.floor(Math.random() * 100) + 1;
    let num2 = Math.floor(Math.random() * 100) + 1;
    
    // Mostrar los numeros en el html
    document.getElementById("Numero1").value = num1;
    document.getElementById("Numero2").value = num2;

    // Guardar el tiempo de respuesta
    let tiempoInicio = new Date();
    
    // Respuesta del usuario
    let respuesta = parseInt(prompt(`¿Cuánto es ${num1} + ${num2}?`));
    
    // Mostrar el tiempo de respuesta en segundos
    let tiempoFinal = new Date();
    let tiempo = (tiempoFinal - tiempoInicio) / 1000; 


    let resultHeader = '<h3>Resultado</h3>';

    if(respuesta === num1 + num2){
        resultHeader += `<h3>¡Correcto! ${num1} + ${num2} = ${num1 + num2}</h3>`;
    }
    else{
        resultHeader += `<h3>Incorrecto.</h3>`;
    }
    resultHeader += `<h3>Tu tiempo de respuesta fue ${tiempo}</h3>`;
    document.getElementById('resultadoEj2').innerHTML = resultHeader;
}