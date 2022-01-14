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

setInterval(exibeHoraAtual, 1000);