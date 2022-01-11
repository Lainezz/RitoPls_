
function inicializarTodo(){

    let array = ["bmw", "audi","citroen", "seat", "tesla"];
    
    var divPrueba = document.querySelector("#formularioSecundario");

    var formulario = document.createElement("form");
    var inputUser = document.createElement("input");
    inputUser.setAttribute("type", "text");
    inputUser.setAttribute("id", "inputUser");
    inputUser.setAttribute("placeHolder", "introduzca nombre");

    var labelForUser = document.createElement("label");
    labelForUser.setAttribute("for", "inputUser");
    labelForUser.innerHTML = "Nombre";

    var elemSelect = document.createElement("select");
    
    for (var pepito of array) {
        console.log(pepito);
        var optionAux = document.createElement("option");
        optionAux.innerHTML = pepito;
        optionAux.setAttribute("value", pepito);
        elemSelect.appendChild(optionAux);
    }

    formulario.appendChild(labelForUser);
    formulario.appendChild(inputUser);
    formulario.appendChild(elemSelect);
    
    divPrueba.appendChild(formulario);


}



window.onload = inicializarTodo();