let tiempoInicio; // Variable global para almacenar el tiempo de inicio para encontrar el tiempo de respuesta 
// Esto nos garantiza que la variable sea utilizada en dos funciones diferentes
let num1, num2; // Variables globales para almacenar los números aleatorios generados

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
    //No se pudo utilizar document.write porque visual studio lo marcaba como deprecated
    //document.write(result);
    document.getElementById('resultado').innerHTML = result;
}

//document.getElementById('formEj2').addEventListener('click', ejercicio2);
function ejercicio2(){
    let result = 0;
    // Generar dos numeros random (entre 1 y 100)
    num1 = Math.floor(Math.random() * 100) + 1;
    num2 = Math.floor(Math.random() * 100) + 1;
    
    document.getElementById("Numero1").value = num1;
    document.getElementById("Numero2").value = num2;

    // Mostrar los numeros en el html
    document.getElementById("respuesta").value="";
    document.getElementById("resultadoEj2").innerHTML = "";
    
    tiempoInicio = new Date(); // Guardar el tiempo de inicio
}

// Verfica si la respuesta del usuario es correcta ejercicio 2
function verify(event){
    event.preventDefault(); // Evita que el formulario se envíe y la página se recargue
    
    // Guardar el tiempo de respuesta
    let respuesta = parseInt(document.getElementById("respuesta").value);
     
    // Mostrar el tiempo de respuesta en segundos
    let tiempoFinal = new Date();
     
    let tiempo = ((tiempoFinal - tiempoInicio) / 1000).toFixed(2);
    let resultHeader = `<h3 class = "verifyResult">Resultado</h3>`;
    if(respuesta === num1 + num2){
        resultHeader += `<h3 class = "verifyResult">¡Correcto!</h3>`;
    }else{
        resultHeader += `<h3 class = "verifyResult">Incorrecto.</h3>`;
    }
    resultHeader += `<h3 class = "verifyResult">Tu tiempo de respuesta fue ${tiempo}</h3>`;
    document.getElementById("resultadoEj2").innerHTML = resultHeader;
}
document.getElementById("formEj2").addEventListener("submit", verify);

//document.getElementById("formEj3").addEventListener("submit", ejercicio3)
function ejercicio3(event){
    event.preventDefault(); // Evita que el formulario se envíe y la página se recargue

    let input = document.getElementById("arrayInput").value;

    let arreglo = input.split(",").map(num=>parseInt(num)); // Convierte la cadena de texto en un arreglo de números
    // Split se utiliza para separar los números por comas

    if(arreglo.some(isNaN)){
        alert("Por favor, introduce solo números separados por comas.");
        return;
    }

    let negativo = 0;
    let positivo = 0;
    let cero = 0;

    for(let i = 0; i < arreglo.length; i++){
        if(arreglo[i] < 0){
            negativo++;
        }else if(arreglo[i] > 0){
            positivo++;
        }else{
            cero++;
        }
    }

    document.getElementById("resultadosEj3").innerHTML = `
        <h3 class="verifyResult">Resultados</h3>
        <p class = "respuestas">Números negativos: ${negativo}</p>
        <p class = "respuestas">Números positivos: ${positivo}</p>
        <p class = "respuestas">Ceros: ${cero}</p>
    `;
}
document.getElementById("formEj3").addEventListener("submit", ejercicio3)

function ejercicio4(event){
    event.preventDefault();

    let input = document.getElementById("matrixInput").value;
    let matrix = input.split(";").map(row=>row.split(",").map(num=>parseFloat(num))); // Convierte la cadena de texto en un arreglo de números
    if(matrix.some(row=> row.some(isNaN))){
        alert("Por favor, introduce solo números separados por comas.");
        return;
    }
    
    let promedios = matrix.map(row => {
        let suma = row.reduce((acc, num) => acc + num, 0); // Sumar los elementos de la fila. Acc es el acumulador y num es el número actual. Acc funciona como un contador
        return suma / row.length; // Calcular el promedio de la fila
    });
    
    document.getElementById("resultadosEj4").innerHTML = 
    `<h3 class="verifyResult">Resultados</h3>
     <h3 class = "respuestas">Promedio de las filas: </h3>
     <ul>
        ${promedios.map((promedio, index) => `<li>Fila ${index + 1}: ${promedio.toFixed(2)}</li>`).join("")} 
     </ul>
`;}// to fixed(2) muestra el resultado a dos decimales
document.getElementById("formEj4").addEventListener("submit", ejercicio4);

function ejercicio5(event){
    event.preventDefault();

    let input = document.getElementById("numberInput").value; 

    // Evita ingresar algo que no sea un numero
    if(isNaN(input)){
        alert("Por favor, introduce un número válido.");
        return;
    }

    let inverse = input.split("").reverse().join("");
    document.getElementById("resultadosEj5").innerHTML = `
        <h3 class="verifyResult">Resultado</h3>
        <h3 class = "respuestas">Número invertido: ${inverse}</h3>
    `;
}
document.getElementById("formEj5").addEventListener("submit", ejercicio5);