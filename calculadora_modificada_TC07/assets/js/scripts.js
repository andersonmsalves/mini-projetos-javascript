// Variaveis globais necessárias:
var statusCalculadora = false;
var statusRelogio = "OFF";
var btnOnClicado = false;
var temOperador = false;
var temPonto = false;
var memoria = "";

// Funcionalidades ocorrendo ao mesmo tempo:
var func1;// = setInterval(ligarRelogio, 1000);

// Selecionando as telas:
var relogio = document.getElementById("rel");
var display = document.getElementById("display");

// Selecionando tag de video contendo o audio do click;
var somClick = document.getElementById("som-click");

// Selecionando todos os botoes:
var btnLigar    = document.getElementById("btn-on-c");
var btnCE       = document.getElementById("btn-ce");
var btnDesligar = document.getElementById("power-off");
var btnOne      = document.getElementById("1");
var btnTwo      = document.getElementById("2");
var btnThree    = document.getElementById("3");
var btnFour     = document.getElementById("4");
var btnFive     = document.getElementById("5");
var btnSix      = document.getElementById("6");
var btnSeven    = document.getElementById("7");
var btnEight    = document.getElementById("8");
var btnNine     = document.getElementById("9");
var btnZero     = document.getElementById("0");
var btnZeros    = document.getElementById("zeros");
var btnDot      = document.getElementById("dot");

// Listeners dos botoes Ligar e Desigar:
btnLigar.addEventListener('click', ligarCalculadora);
btnDesligar.addEventListener('click',desligarCalculadora);

// Listener do botão CE:
btnCE.addEventListener('click', function(){
    if(btnOnClicado){
        somClick.play();
        display.value = "0";
    }
})

// Listeners dos botoes numericos:
btnOne.addEventListener('click', addOne);
btnTwo.addEventListener('click', addTwo);
btnThree.addEventListener('click', addThree);
btnFour.addEventListener('click', addFour);
btnFive.addEventListener('click',addFive);
btnSix.addEventListener('click', addSix);
btnSeven.addEventListener('click', addSeven);
btnEight.addEventListener('click',addEight);
btnNine.addEventListener('click',addNine);

// Listeners dos botoes que precisam de excessoes:
btnDot.addEventListener('click', addDot);
btnZero.addEventListener('click', function(){
    if(btnOnClicado){
        somClick.play();
        if(display.value !== "0" && display.value.length <= 11){
            display.value += "0";
        }

    }else{
        alert("Calculadora desligada");
    }
})

btnZeros.addEventListener('click', function(){
    if(btnOnClicado){
        somClick.play();
        if(display.value !== "0" && display.value.length <= 10){
            display.value += "00";
        }

    }else{
        alert("Calculadora desligada");
    }
})


/////////////////////////////Funcões/////////////////////////////////////////
function operacao(operador){
    if(btnOnClicado){
        somClick.play();
        memoria += display.value + operador;
        display.value = "0";
        console.log(memoria);
    } 
}

function resultadoOperacoes(){
    if(btnOnClicado){
        somClick.play();
        let resultado = memoria + display.value
        console.log(resultado);
        display.value = (eval(resultado)).toFixed(2);
    }
}


function addOne(){
    somClick.play();
    let acao = acaoInicial() ? atualizarConteudoDisplay(1) : alert("calculadora desligada");
}

function addTwo(){
    somClick.play();
    let acao = acaoInicial() ? atualizarConteudoDisplay(2) : alert("calculadora desligada");
}

function addThree(){
    somClick.play();
    let acao = acaoInicial() ? atualizarConteudoDisplay(3) : alert("calculadora desligada");
}

function addFour(){
    somClick.play();
    let acao = acaoInicial() ? atualizarConteudoDisplay(4) : alert("calculadora desligada");
}

function addFive(){
    somClick.play();
    let acao = acaoInicial() ? atualizarConteudoDisplay(5) : alert("calculadora desligada");
}

function addSix(){
    somClick.play();
    let acao = acaoInicial() ? atualizarConteudoDisplay(6) : alert("calculadora desligada");
}

function addSeven(){
    let acao = acaoInicial() ? atualizarConteudoDisplay(7) : alert("calculadora desligada");
}

function addEight(){
    let acao = acaoInicial() ? atualizarConteudoDisplay(8) : alert("calculadora desligada");
}

function addNine(){
    let acao = acaoInicial() ? atualizarConteudoDisplay(9) : alert("calculadora desligada");
}

////////////////////////////////////////Excessoes///////////////////////////////////////
function addDot(){
    if(btnOnClicado){
        somClick.play();
        if(!display.value.includes(".")){
            display.value += '.';
        }
    }
}

function calcularRaiz(){
    if(btnOnClicado){
        somClick.play();
        let resultado = display.value ** (0.5);
        //console.log(resultado);
        display.value = resultado.toFixed(2);
    }
}

function calcularPorcentagem(){
    if(btnOnClicado){
        somClick.play();
        let percent = display.value / 100;
        memoria += String(percent) + "*";
        display.value = "";
    }
}


///////////////////////////////Função prelinimar/////////////////////////////////////
function acaoInicial(){
    somClick.play();
    if(btnOnClicado == true){
        return true;
    }
}



function verificarConteudoDisplay(){
    let tamConteudo = display.value.length;
    let conteudo = display.value;
    if(tamConteudo == 12){
        return "LEN ERROR";
    }

    if(conteudo == 0){
        return false;
    }
    if(tamConteudo > 1 || tamConteudo != 0){
        return true;
    }

}

function atualizarConteudoDisplay(numero, excessao=false, arg=false){
    console.log(`Retorno da verif conteudo: ${verificarConteudoDisplay()}`);
    if(verificarConteudoDisplay() == "LEN ERROR"){
        return alert("Limite de Tamanho Atingido");
    }
    if(excessao==true){
        console.log("Entrou no bloco de excessao");
        return null;
    }

    if(!verificarConteudoDisplay()){
        display.value = Number(numero);
    }else{
        display.value += Number(numero);
    }
    //console.log(`Valor no display: ${display.value}`)
}

function ligarCalculadora(){

    somClick.play();
    iniciarDisplay();

    if(btnOnClicado == false){
        enviarMensagem("A calculadora foi ligada");
        atualizaStatus();   
        func1 = setInterval(ligarRelogio, 1000);
    }else{
        limparMemoria();
        setTimeout(iniciarDisplay, 700);
    }
}


function iniciarDisplay(){
    memoria = "";
    display.value = 0;
}


function limparMemoria(){
    display.value = "CLEAR MEM";
}


function atualizaStatus(){
    btnOnClicado = true;
    statusCalculadora = true;
}


function desligarCalculadora(){
    somClick.play();

    enviarMensagem("A calculadora foi desligada");
    resetarParametros();
    resetarDisplays();
}


function enviarMensagem(textoMensagem){
    console.log(textoMensagem);
}


function resetarParametros(){
    btnOnClicado = false;
    statusCalculadora == false;
    clearInterval(func1);
}


function resetarDisplays(){
    display.value = "";
    relogio.value = "";
}


function obterHoraAtual(){
    let data = new Date();
    let horasAtual = data.getHours();
    let minutosAtual = data.getMinutes();
    let segundosAtual = data.getSeconds();
    
    let h = horasAtual < 10 ? '0' + horasAtual : horasAtual; 
    let m = minutosAtual < 10 ? '0' + minutosAtual : minutosAtual; 
    let s = segundosAtual < 10 ? '0' + segundosAtual : segundosAtual; 
    
    return `${h}:${m}:${s}`;
}


function exibirHora(horaFormatada){
    relogio.value = horaFormatada;
}


function ligarRelogio(){
    let horaAtual = obterHoraAtual();

    exibirHora(horaAtual);
}
