
var personajes;

function doFetch(){
    fetch('http://ddragon.leagueoflegends.com/cdn/11.24.1/data/es_ES/champion.json')
            .then(response => response.json())
            .then(data => personajes=data.data);
}

function doFetchImage(idPersonaje){
    
    console.log("En Fetch de Imagen con psj: "+idPersonaje);
    fetch("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+idPersonaje+"_0.jpg")
        .then(response => response.blob())
        .then(imageBlob => {
            const imageObjectURL = URL.createObjectURL(imageBlob);
            crearDivPrueba(imageObjectURL);
        });
}

function handleForm(event){

    event.preventDefault();

    Object.entries(personajes).map(psj => {
        
        if(psj[1].id === event.target.name.value){
            console.log(psj[1].id);
            doFetchImage(psj[1].id);
        }
    });
}



function crearDiv(psj){   
    var elemDivPsjs = document.querySelector("#psjs");
    
    var elemDiv = document.createElement("div");
    elemDiv.setAttribute("id", psj.id);
    
    var elemImg = document.createElement("img");
    elemImg.setAttribute("src", "./sprites/"+psj.image.full);
    
    elemDiv.appendChild(elemImg);
    elemDivPsjs.appendChild(elemDiv);
}

function crearDivPrueba(urlImg){
    var divPsjs = document.querySelector("#psjs");
    
    var elemImg = document.createElement("img");
    elemImg.setAttribute("src", urlImg);
    elemImg.classList.add("imgSize")
    divPsjs.appendChild(elemImg);
}


window.onload = doFetch();