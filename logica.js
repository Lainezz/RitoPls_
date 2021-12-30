
/*
Variable global que contendrá todos los personajes del LoL. Se seteará al cargar
la página, al realizar el primer fetch
*/
var personajes;

/*
Función que inicializa la página. Realiza una petición a la API del Lol para obtener los personajes, rellena el select, etc etc.
*/
async function inicializarPagina() {
    await fetch('http://ddragon.leagueoflegends.com/cdn/11.24.1/data/es_ES/champion.json')
        .then(response => response.json())
        .then(data => personajes = data.data);
    console.log(personajes);
    populateSelect();
}

/*
Función que realiza un fetch para coger la imagen del personaje indicado
*/
async function doFetchImage(namePersonaje) {

    let imageObjectURL;
    await fetch(`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${namePersonaje}_0.jpg`)
        .then(response => response.blob())
        .then(imageBlob => imageObjectURL = URL.createObjectURL(imageBlob));
    
    crearDiv(imageObjectURL);
}

/*
Función para manejar el submit del formulario
*/
function handleForm(event) {

    event.preventDefault();

    const inputName = event.target.name.value;
    const optionName = event.target.selectPsjs.value;
    let nombrePersonaje = "";

    if(inputName !== ""){
        nombrePersonaje = inputName;
    }else if(optionName !== ""){
        nombrePersonaje = optionName;
    }else if(selectRol !== ""){
        console.log("Error");
    }

    Object.entries(personajes).map(psj => {
        if (psj[1].name === nombrePersonaje) {
            doFetchImage(psj[1].name);
        }
    });
}

/*
Función para resetear los divs de los personajes. Para que no se acumulen uno 
al lado del otro.
*/
function resetPage() {
    var divPsjs = document.querySelector("#psjs div");
    if (divPsjs != null) {
        divPsjs.remove();
    }
}

/*
Función para crear un Div que contendrá la imagen de un personaje
*/
function crearDiv(urlImg) {
    resetPage();

    var divPsjs = document.querySelector("#psjs");
    var divCaja = document.createElement("div");
    var elemImg = document.createElement("img");
    elemImg.setAttribute("src", urlImg);
    divCaja.appendChild(elemImg);
    divPsjs.appendChild(divCaja);
}

/*
Función para rellenar el select del formulario principal que nos sirve para poder seleccionar un personaje
*/
function populateSelect() {
    var selectPsjs = document.querySelector("#selectPsjs");
    Object.entries(personajes).map(psj => {
        var option = document.createElement("option");
        option.setAttribute("id", psj[1].name);
        option.setAttribute("name", psj[1].name);
        option.setAttribute("value", psj[1].name);
        option.innerText = psj[1].name;
        selectPsjs.appendChild(option);
    });
}

window.onload = inicializarPagina();