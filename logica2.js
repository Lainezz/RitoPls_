var personajes;

function obtenerPersonajes(){
    fetch('http://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/champion.json')
        .then(response => response.json())
        .then(data => personajes = data.data);
}

function obtenerImagen(nomPsj){

    fetch(`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${nomPsj}_0.jpg`)
        .then(response => response.blob())
        .then(imageBlob => {
            const imageObjectURL = URL.createObjectURL(imageBlob);
            crearDiv(imageObjectURL, nomPsj);
        });

}

function controlarSubmit(event){
    event.preventDefault();

    let nomPsj = event.target.name.value;
    
    Object.entries(personajes).map( psj => {
        
        console.log(psj[1].name);
        if(nomPsj === psj[1].name){
            obtenerImagen(nomPsj);
        }
    });
}

function crearDiv(imageObjectURL, nomPsj){
    var divPsjs = document.querySelector("#psjs");

    var divCaja = document.createElement("div");
    divCaja.classList.add("caja");
    divCaja.classList.add("d-flex");
    divCaja.classList.add("justify-content-center");
    
    var img = document.createElement("img");
    img.setAttribute("src", imageObjectURL);
    divCaja.appendChild(img);

    var p = document.createElement("p");
    var texto = document.createTextNode(nomPsj);
    p.appendChild(texto);
    divCaja.appendChild(p);

    divPsjs.appendChild(divCaja);
}


window.onload = obtenerPersonajes();