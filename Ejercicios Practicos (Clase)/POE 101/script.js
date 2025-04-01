let log = console.log;

let mivalor1 = document.getElementById("para1");
let mivalor2 = document.getElementById("para2");

console.log(mivalor1);
console.log(mivalor2);

let pelicula1 = document.getElementById("Pelicula1");
console.log(pelicula1); // log(pelicula1);

//------------------------------------------
let list = document.querySelector(".list");
console.log(list);

//------------------------------------------
let h1Element = document.querySelector("h1");
console.log(h1Element);

//------------------------------------------
let listItems = document.querySelectorAll("ul>li");

log(listItems);

let listItem2 = document.querySelector(".list>li");
log(listItem2);

function manejoLista(){
    log("itm");
}

listItems.forEach((item) => {
    log(item);
});

listItems.forEach((item) => manejoLista(item));

//------------------------------------------
let listaSinOrden = document.createElement("ul");
document.body.appendChild(listaSinOrden);

// Creando elemento 1 de la lista
let elemento1Lista = document.createElement("li");
elemento1Lista.textContent = "HTML";
listaSinOrden.appendChild(elemento1Lista);
// Creando elemento 1 de la lista


let elemento2Lista = document.createElement("li");
elemento2Lista.textContent = "CSS";
let elemento3Lista = document.createElement("li");
elemento3Lista.textContent = "JS";


listaSinOrden.appendChild(elemento2Lista);
listaSinOrden.appendChild(elemento3Lista);

// Creando estilos CSS
let newH2 = document.createElement("h2");
newH2.textContent = "Hola Mundo";
document.body.appendChild(newH2);

let h2 = document.querySelector("h2");
log(h2);
h2.style.color = "blue";
h2.textContent = "Soy Azul";

log(h2);

// Eventos con JS
let newButton = document.createElement("button");
newButton.textContent = "Mostrar Alerta";
newButton.setAttribute("id", "btn");
document.body.appendChild(newButton);
newButton.addEventListener("click", function () {
    let result = confirm("Gracias Por hacerle click");
    if(result){
        log("Si funciona el click");
        return;
    }
    log("Me cancelaron");
      
});
 