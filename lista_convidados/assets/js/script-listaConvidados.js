var convidados = [];

var selectConvidados = document.createElement('select');
var optionDefault = document.createElement('option');
optionDefault.innerText = 'Convidados';

selectConvidados.appendChild(optionDefault);

var divConvidados = document.getElementById("divConvidados");
divConvidados.appendChild(selectConvidados);

function adicionar(){
    const nome = verificarDado();

    if(nome == false){
        return console.log("Campo nome não preenchido");
    }else{
        if(!convidados.includes(nome)){
            convidados.push(nome);
            alert(`Convidado: ${nome} adiconado a lista`);
        }else{
            alert(`${nome} já esta na lista de convidados`);
        }
    }

}

function remover(){
    let nomeConvidado = document.getElementById("nome-convidado");
    nomeConvidado.value = nomeConvidado.value.trim().toUpperCase();
    const idxConvidado = convidados.indexOf(nomeConvidado.value)
    console.log(`Indice do convidado a ser removido: ${idxConvidado}`);

    if(convidados[idxConvidado] == 'undefined'){
        alert("Essa pessoa não esta na lista");
    }else{
        alert(`Convidado: ${convidados[idxConvidado]} foi removido`);
    }
    
    if(idxConvidado >= 0){
        convidados.splice(idxConvidado, 1);
    }
}

function listarConvidados(){
    // Resetar Select:
    selectConvidados.innerHTML = '';

    // Criar option default do select:
    let primeiroItem = document.createElement("option");
    primeiroItem.innerText = "Lista de Convidados";
    selectConvidados.appendChild(primeiroItem);

    // Ordenar a lista de convidados por nome;
    convidados = convidados.sort();

    // Loop para criar as options dentro do select:
    let tam = convidados.length;
    console.log(`Número de convidados: ${tam}`);
    for(let i = 0; i < tam; i++){
        let convidado = document.createElement('option');
        convidado.innerText = convidados[i];

        selectConvidados.appendChild(convidado);
    }
}

function verificarDado(){
    let nome = document.getElementById("nome-convidado");

    // Se o campo não estiver preenchido retorne false:
    if(nome.value.length == 0){
        alert("Preencha o campo nome");
        nome.focus();
        return false;
    
    // Se o campo estiver preenchido retorne esse valor:    
    }else{ 
        return nome.value.trim().toUpperCase();
    }
}