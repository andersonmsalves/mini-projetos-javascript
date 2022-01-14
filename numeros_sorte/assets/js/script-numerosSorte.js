function gerarNumerosSorte(){
    let numerosSorte = []; // É array vazio para armazenar os valores.
    let sorteado;
    while(numerosSorte.length < 6){
        // Gerar um número aleatório:
        sorteado = Math.ceil(60 * Math.random());

        if(sorteado < 10){
            sorteado = "0" + sorteado;
        }

        // Verificar se o número esta contido no array:
        if(!numerosSorte.includes(sorteado)){
            numerosSorte.push(sorteado);
        }

        //console.log(numerosSorte);
    }

    let paragrafo = document.getElementById('numeros');

    numerosSorte = numerosSorte.sort();
    paragrafo.innerText = numerosSorte;

    console.log(numerosSorte);
}