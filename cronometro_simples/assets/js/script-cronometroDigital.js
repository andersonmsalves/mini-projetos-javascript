'use strict'

var statusExecucao = "STOP";

// Selecionando os botoes de controle:
var botaoControle = document.getElementById('btn-controle');
botaoControle.addEventListener('click', acionarCronometro);
botaoControle.style.backgroundColor = 'green';

var botaoReset = document.getElementById('btn-resetar');
botaoReset.addEventListener('click', resetar);

// Selecionando p com id='cronometro:
var cronometro = document.getElementById('cronometro');

// Selecionando o elemento audio:
var somAviso = document.getElementById('som-aviso');

var horas = 0;
var minutos = 0;
var segundos = 0;
var milisegundos = 0;
//var delayMilisegundos = 50;


function acionarCronometro(){
    if(statusExecucao == "STOP"){
        statusExecucao = "RUN";
        botaoControle.innerText = "STOP";
        cronometro.style.background = 'black';
        botaoControle.style.backgroundColor = 'black';
        botaoControle.style.color = 'white';
        statusCronometro("Executando...")
    }else{
        statusExecucao = "STOP";
        statusInicial();
        statusCronometro("Parado.");
        cronometro.style.background = 'red';
    }

    
}

function statusInicial(){
    botaoControle.innerText = "START";
    botaoControle.style.backgroundColor = 'green';
    botaoControle.style.color = 'white';
}


function statusCronometro(status){
    console.log(`Cronometro ${status}`);
}

var loop = setInterval(function(){
    let cronometroFormatado;
    if(statusExecucao == "RUN"){
        if(milisegundos == 1000){
            milisegundos = 0;
            segundos++;
        }

        if(segundos == 60){
            segundos = 0;
            minutos++;
        }
        if(minutos == 60){
            minutos = 0;
            horas++;
        }
        //segundos++;
        milisegundos+=100;

        // Configuração do aviso sonoro:
        if(minutos % 5 == 0 && segundos >= 5 && segundos < 25){
            somAviso.play();
        }

        cronometroFormatado = `${horas} : ${minutos} : ${segundos} : ${milisegundos}`;
        cronometro.textContent = cronometroFormatado;
    
        //console.log(`Horas: ${horas}, Minutos: ${minutos}, Segundos: ${segundos}`);
    }
    
}, 100);

function resetar(){

    console.log("Botao resetar foi clicado");
    statusExecucao = "STOP";
    cronometro.style.background = 'black';

    statusInicial();

    horas = 0; minutos = 0; segundos = 0;
    cronometro.innerText = `00:00:00:0000`;
}
