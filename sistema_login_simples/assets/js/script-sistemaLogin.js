var usuarioExemplo = {
    usuario: "anderson",
    senha: "admin1234",
    lastLogin: null,
    linguagens: ['Javascript', "PHP", "Python", "C++", "FORTRAN"]
}

var usuarioLogado = false;
var numeroTentativasLogin = 0;
var horaLogin = null;

var configurarRelogio = setInterval(exibeHoraAtual, 1000);

// Selecionando as divs login e sistema:
var divLogin   = document.getElementById('login');
var divSistema = document.getElementById("sistema");

// Selecionar os campos de dados:
var username = document.getElementById("username");
var senha    = document.getElementById("senha");

// Selecionar botao logar:
var btnLogar = document.getElementById("logar");

// Listener do botao logar:
btnLogar.addEventListener('click', logarSistema)


function exibeHoraAtual(){
    let data = new Date();
    let horaAtual = data.getHours();
    let minutosAtual = data.getMinutes();
    let segundosAtual = data.getSeconds();
    let horaFormatada;

    let relogio = document.getElementById('relogio');

    if(horaAtual < 10)
        horaAtaul = '0' + horaAtual;
    if(minutosAtual < 10)
        minutosAtual = '0' + minutosAtual;
    if(segundosAtual < 10)
        segundosAtual = '0' + segundosAtual;

    horaFormatada = `${horaAtual}:${minutosAtual}:${segundosAtual}`;

    //alert(horaFormatada);
    relogio.innerText = horaFormatada;
}

function logarSistema(){

    if(numeroTentativasLogin < 3){

        console.log(`Nova tentativa de login.`);
        let preenchido = verificarPreenchimento();

        console.log("Dentro da funcao logarSistema:");
        console.log(`Retorno da função verificaPreenchimento: ${preenchido}`);
        
        if(preenchido){//Significa que o usuario colocou o username e senha, a tentativa de logar é valida
            
            numeroTentativasLogin += 1;
            console.log(`Numero de tentativas validas: ${numeroTentativasLogin}`);

            let dados = compararDadosEntrada();
            console.log(`Retorno da função compararDadosEntrada: ${dados}`);

            if(dados){

                usuarioLogado = true;
                
                horaLogin = obterHoraLogin();

                usuarioExemplo.lastLogin = horaLogin;                
                console.log(`Hora de login: ${usuarioExemplo.lastLogin}`);

                criarElementosNaDiv();

                atualizarTela(usuarioLogado);
            }

        }else{
            alert("Tentativa de logar não registrada, verifique o preenchimento dos campos");
        }

    }else{
        alert("Número maximo de tentativas de login atingido.")
    }
}

function verificarPreenchimento(){

    console.log("Em função verificarPreenchimento():")

    let tamUsername = username.value.length;
    let tamSenha = senha.value.length;

    if(tamUsername == 0 && tamSenha == 0){
        username.focus();
        alert("Preencha os campos de usuário e senha");
        return false;

    }else if(tamUsername == 0){

        username.focus();
        alert("Preencha o campo de usuário");
        return false;

    }else if(tamSenha == 0){
        senha.focus();
        alert("Preencha o campo senha");
        return false;
    }
    //console.log(`Len username: ${tamUsername}, Len tamSenha: ${tamSenha}`);

    return true;
}

function compararDadosEntrada(){
    console.log("Dentro da função compararDadosEntrada:");
    
    if(username.value !== usuarioExemplo.usuario && senha.value !== usuarioExemplo.senha){
        console.log("value error: username and password wrong");
        alert("Usuario e senha incorretos");
        
        return false;

    }else if(username.value !== usuarioExemplo.usuario){
        console.log("value error: username wrong");
        alert("Usuario incorreto");

        return false;
    
    }else if(senha.value !== usuarioExemplo.senha){
        console.log("value error: password wrong");
        alert("Senha incorreta");

        return false;
    }else{
        return true;
    }
}

function obterHoraLogin(){
    return relogio.innerText;
}

function atualizarTela(boolLogado){
    console.log("Dentro da função atualizar tela");
    if(boolLogado){
        alert(`usuario ${usuarioExemplo.usuario} logado, atualizando a tela...`);
        divLogin.style.display = 'none';
        divSistema.style.display = 'block';
    }else{
        divLogin.style.display = 'block';
        divSistema.style.display = 'none';
    }
}

function criarElementosNaDiv(){
    // Resetar informações:
    divSistema.innerHTML = "";

    // Preencher as informações do usuário:
    divSistema.innerHTML =`<h3>Infos de ${usuarioExemplo.usuario}:</h3>`;
    divSistema.innerHTML +=`<span>Hora login: ${usuarioExemplo.lastLogin}</span><br>`;
    divSistema.innerHTML += `<h4>Linguagens:</h4>`;
    divSistema.innerHTML += `<ul id="prog-lang">`;

    // Inserindo os valores do array linguagens em uma lista ou select:
    for(let linguagem of usuarioExemplo.linguagens){
        console.log(`Nome da linguagem: ${linguagem}`);
        divSistema.innerHTML += `<li value='${linguagem}'>${linguagem}</li>`;
    }

    divSistema.innerHTML +=`</ul>`
}