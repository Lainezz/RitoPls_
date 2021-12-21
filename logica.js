
//Variable global que contendrá todos los personajes del LoL. Se seteará al cargar
//la página, al realizar el primer fetch
var personajes;


function doFetch(){
    fetch('http://ddragon.leagueoflegends.com/cdn/11.24.1/data/es_ES/champion.json')
            .then(response => response.json())
            .then(data => personajes=data.data);
}

function doFetchImage(namePersonaje){
    
    console.log("En Fetch de Imagen con psj: "+namePersonaje);
    fetch(`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${namePersonaje}_0.jpg`)
        .then(response => response.blob())
        .then(imageBlob => {
            const imageObjectURL = URL.createObjectURL(imageBlob);
            crearDiv(imageObjectURL);
        });
}

//Función para manejar el submit del formulario
function handleForm(event){

    event.preventDefault();
    Object.entries(personajes).map(psj => {
        if(psj[1].name === event.target.name.value){
            console.log(psj[1].name);
            doFetchImage(psj[1].name);
        }
    });
}

//Función para resetear los divs de los personajes. Para que no se acumulen uno 
//al lado del otro.
function resetPage(){
    var divPsjs = document.querySelector("#psjs div");
    console.log(divPsjs);
    if(divPsjs!=null){
        divPsjs.remove();
    }
}


function crearDiv(urlImg){
    resetPage();
    
    var divPsjs = document.querySelector("#psjs");
    
    var divCaja = document.createElement("div");

    var elemImg = document.createElement("img");
    elemImg.setAttribute("src", urlImg);
    elemImg.classList.add("imgSize")
    divCaja.appendChild(elemImg);
    divPsjs.appendChild(divCaja);
}


window.onload = doFetch();