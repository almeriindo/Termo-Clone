const altura = 6;
const largura = 5;

let coluna = 0;
let linha = 0;

let fim = false;
let palavras = ["ponte", "poste", "festa", "abrir", "longe", "anjos", "dente", "sabão"]
let palavraOriginal = ""
let palavra = "";

window.onload = function() {
    iniciar();
}

function iniciar() {
    
    palavraOriginal = palavras[Math.floor(Math.random() * palavras.length)];
    palavra = palavraOriginal.normalize('NFD').replace(/[\u0300-\u036f]/g, ""); //removendo acento da palavra

    //criando a tabela
    for(let l = 0; l < altura; l++) { 
        for(let c = 0; c < largura; c++) {

            let quadrado = document.createElement("span");
            quadrado.id = l.toString() + "-" + c.toString();
            quadrado.classList.add("quadrado");
            quadrado.innerText = "";
            
            document.getElementById("tabela").appendChild(quadrado);
            
        }
    }

    //escutando as teclas pressionadas (apenas quando soltas)
    document.addEventListener("keyup", (e) => {
        if(fim) return;

        if("KeyA" <= e.code && e.code <= "KeyZ") { //checando se é uma letra do alfabeto
            if(coluna < largura) {
                let posicaoAtual = document.getElementById(linha.toString() + "-" + coluna.toString());
                posicaoAtual.innerText = e.key;
                coluna++;
            }
        }

        if(e.code == "Backspace") { //tecla de apagar
            if(coluna > 0) coluna--;

            let posicaoAtual = document.getElementById(linha.toString() + "-" + coluna.toString());
            posicaoAtual.innerText = "";
        }

        if(e.code == "Enter") {
            atualizar();
            if(linha >= altura) fimDeJogo();
        }
    })
}

function atualizar() {

    let acertos = 0;
    let palavraTemp = palavra;

    for (let i = 0; i < largura; i++) { //checando quais letras estão certas
        let posicaoAtual = document.getElementById(linha.toString() + '-' + i.toString());
        let letra = posicaoAtual.innerText.toLowerCase();

        if (palavraTemp[i] == letra) {
            posicaoAtual.classList.add("certo");
            palavraTemp = palavraTemp.replace(palavraTemp[i], "0");
            acertos += 1;
        }
    }

    for (let j = 0; j < largura; j++) { //checando quais letras estão  no local errado ou se estão erradas
        let posicaoAtual = document.getElementById(linha.toString() + '-' + j.toString());
        let letra = posicaoAtual.innerText.toLowerCase();

        if(palavraTemp.includes(letra)) {
            if (!posicaoAtual.classList.contains("certo")) {
                posicaoAtual.classList.add("existe");
                for(let k = 0; k < palavraTemp.length; k++) {
                    if(palavraTemp[k] == letra) {
                        palavraTemp = palavraTemp.replace(palavraTemp[k], "0");
                    }
                }
            }
        } else {
            posicaoAtual.classList.add("errado");
        }
    }

    if(acertos >= largura || linha >= altura) { // checando se o jogo acabou (seja por vitória ou derrota)
        fimDeJogo();
    } else {
        linha++;
        coluna = 0;
    }

}

function fimDeJogo() {
    fim = true;
    document.getElementById("resposta").innerText = palavraOriginal;
}