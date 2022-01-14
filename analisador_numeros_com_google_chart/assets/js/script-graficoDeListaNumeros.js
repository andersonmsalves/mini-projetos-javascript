// Selecionando os botões:
var btnAdicionar = document.getElementById('btn-adicionar');
var btnProcessar = document.getElementById('btn-processar');
var btnRemover = document.getElementById("btn-remover");
var btnResetar = document.getElementById("btn-resetar");

// Selecionar campo contendo o dado a ser adicionado:
var numero = document.getElementById('numero');

// Selecionar select:
var elementoSelect = document.getElementById('lista-numeros');

// Selecionar o botao para gerar o grafico: 
var btnGerarGrafico = document.getElementById('btn-gerarGrafico');

// Selecionar div de Retorno:
var divRetorno = document.querySelector("div#dadosProcessados");
divRetorno.style.display = 'none';

// Selecionar div contendo o grafico:
var divGrafico = document.querySelector("div#graficoDados");
divGrafico.style.display = "none";

// Listener dos eventos de clicks nos botões:
btnAdicionar.addEventListener('click', adicionar);
btnRemover.addEventListener('click', remover);
btnResetar.addEventListener('click', resetar);
btnProcessar.addEventListener('click',processar);
btnGerarGrafico.addEventListener('click',gerarGrafico);

// Array para armazenar os valores inseridos pelo usuário:
var numeros = [];

function adicionar(){
    let dado = verificar();
    if(!numeros.includes(dado)){
        numeros.push(Number(dado));
        numero.focus();
        numero.value = 0;
        atualizarSelect();
        escondeDivs();
    }else{
        alert(`O número ${dado} já esta na lista.`);
        numero.focus();
        numero.value = 0;
    }

}

function remover(){
    let valor = Number(numero.value);
    let indiceValor = numeros.indexOf(valor);

    /*console.log(typeof valor);
    console.log(`Indice do valor a ser removido: ${indiceValor}`);*/

    if(indiceValor >= 0){
        escondeDivs();
        numeros.splice(indiceValor, 1);
        alert(`O valor ${valor} foi removido da lista`);
        atualizarSelect();
        numero.focus();
    }else{
        alert(`O valor ${valor} não esta na lista de números.`);
    }
    
}

function resetar(){
    numeros = new Array();
    atualizarSelect();
    numero.focus();
    numero.value = 0;
    escondeDivs();
}

function processar(){
    divRetorno.style.display = 'block';
    divGrafico.style.display = 'block';

    let qtdDados = numeros.length;
    let minimo = numeros[0];
    let maximo = numeros[0];
    let total = 0;
    let media;

    for(let idx in numeros){
        if(numeros[idx] < minimo){
            minimo = numeros[idx];
        }

        if(numeros[idx] > maximo){
            maximo = numeros[idx];
        }

        total += numeros[idx];
    }

    // Evitar a divisão por zero:
    if(qtdDados > 0){
        media = total / qtdDados;
    }else{
        media = 0;
    }

    // Calculo do desvio padrao:
    let desvPad = 0;
    let acumNumerador = 0;

    for(let idx in numeros){
        acumNumerador += (numeros[idx] - media)**2;
    }

    if(qtdDados > 0){
        desvPad = (acumNumerador / qtdDados)**(0.5);
    }
    

    // Resetar conteudo da div Informação dos dados:
    divRetorno.innerHTML = "";

    let titulo = document.createElement('h3');
    titulo.innerText = "Informação dos dados";

    let lista = document.createElement('ul');
    let itemQtdItens = document.createElement('li');
    let itemMinimo = document.createElement('li');
    let itemMaximo = document.createElement('li');    
    let itemMedia = document.createElement('li');
    let itemDesvPad = document.createElement('li');    

    itemQtdItens.innerText = `Qtd Números: ${qtdDados}`;
    itemMinimo.innerText = `Valor Mínimo: ${minimo}`;
    itemMaximo.innerText = `Valor Máximo: ${maximo}`;
    itemMedia.innerText = `Média: ${media.toFixed(2)}`;
    itemDesvPad.innerText = `Desvio padrão: ${desvPad.toFixed(2)}`;
    
    lista.appendChild(itemQtdItens);
    lista.appendChild(itemMinimo);
    lista.appendChild(itemMaximo);
    lista.appendChild(itemMedia);
    lista.appendChild(itemDesvPad);

    divRetorno.appendChild(titulo);
    divRetorno.appendChild(lista);

    /*console.log(`Valor Mínimo: ${minimo}`);
    console.log(`Valor Mínimo: ${maximo}`);
    console.log(`Média.......: ${media.toFixed(2)}`);*/
}

function escondeDivs(){
    divRetorno.style.display = 'none';
    divGrafico.style.display = 'none';
}

function verificar(){
    let dado = Number(numero.value.trim());
    
    if(typeof dado == 'number'){
        return dado;
    }
}

function atualizarSelect(){
    let tam = numeros.length;
    numeros = numeros.sort();

    //console.log(`Tamanho da lista ${tam}`);
    //console.log(`Número: ${numeros}`);

    //Resetar o elemento Select:
    elementoSelect.innerHTML = "";

    var option;

    for(let i=0; i < tam; i++){
        option = document.createElement('option');
        option.value = numeros[i];
        option.innerText = `Valor: ${numeros[i]}`;
        
        elementoSelect.appendChild(option);
    }
    

}

// Ideia inial:
//setInterval(atualizarSelect, 15000);

//////////////////////////////////////Parte de Grafico///////////////////////////////////////////
function gerarGrafico(){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart); 
}


function drawChart() {
  var dados = numeros; // numeros é um array
  var dadosArray = [];
  dadosArray[0] = ['Indice', "Valor"];
  
  for(let i = 0; i < dados.length ; i++){
      dadosArray.push([String(i),dados[i]]);
  }
  console.log(dadosArray);

  var data = google.visualization.arrayToDataTable(
    //[
    /*['Indice', 'Valor'],
    ['0',  5],
    ['1',  9],
    ['2',  7],
    ['3',  8]
    ]*/
    dadosArray
    );

  var campoTitulo = document.getElementById("titulo-grafico").value;
  var posicaoLegenda = document.getElementById("posicao-legenda").value;
  
  var tituloGrafico = campoTitulo ?  campoTitulo : "Título do gráfico";

  var options = {
    title: tituloGrafico,
    curveType: 'function',
    legend: { position: posicaoLegenda }
  };

  var chart = new google.visualization.LineChart(document.getElementById('graficoLinha'));

  chart.draw(data, options);
}

