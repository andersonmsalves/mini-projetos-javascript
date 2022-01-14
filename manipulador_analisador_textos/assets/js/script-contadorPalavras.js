var palavras = new Array();

// Selecionar o campo de texto:
var campoTexto = document.getElementById("texto");

// Selecionar os campos de input:
var counterChars = document.getElementById("counter-chars");
var counterWords = document.getElementById("counter-words");

// Selecionar botoes:
var btnClear = document.getElementById("btn-clear-field");
var btnToUpper = document.getElementById("btn-to-upper");
var btnToLower = document.getElementById("btn-to-lower");
var btnPurify = document.getElementById("btn-purify");


// Listeners:
campoTexto.addEventListener('input', contar);
btnClear.addEventListener('click', limparCampoTexto);
btnToUpper.addEventListener('click', paraUpperCase);
btnToLower.addEventListener('click', paraLowerCase);
btnPurify.addEventListener('click', purificarTexto);

function purificarTexto(){
    let texto = campoTexto.value.trim();
    console.log(texto);

    while(texto.includes("  ")){
        texto = texto.replace("  ", " ");
    }

    texto = texto.toLowerCase();

    campoTexto.value = texto;
    contar();
}


function paraUpperCase(){
    campoTexto.value = campoTexto.value.toUpperCase();
}


function paraLowerCase(){
    campoTexto.value = campoTexto.value.toLowerCase();
}


function contar(){
    contarCaracteres();
    contarPalavras();
}


function contarCaracteres(){
    let texto = campoTexto.value;
    //console.log(texto);

    let tamanhoTexto = texto.length;
    //console.log(tamanhoTexto);

    if(tamanhoTexto == 0){
        counterChars.value = 0;
    }else{
        counterChars.value = tamanhoTexto;
    }
}


function contarPalavras(){
    //console.log("Função contar palavra foi chamada");
    let texto = campoTexto.value;
    texto = texto.trim(); // Remove os espaços no inicio e fim do texto.
    //console.log(texto);

    while(texto.includes("  ")){

        texto = texto.replace("  ", " ");
    }
    
    palavras = texto.split(" ");
    
    if(palavras.length == 0){
        counterWords.value = 0;
    }else{
        counterWords.value = palavras.length;
    }
}


function limparCampoTexto(){
    campoTexto.value = "";
    resetarContadores();
}


function resetarContadores(){
    counterChars.value = 0;
    counterWords.value = 0;
}

