const game = document.querySelector('.game');
const inimigo = document.querySelector('.enemy');
const levelInner = document.querySelector('span');
const player = document.querySelector('.person');
const canhao = document.querySelector('.cannon');
const tirosE = document.querySelector('.tirosE');
const tirosP = document.querySelector('.tirosP');

let jogadorVivo = true;  // Variável para controlar se o jogador está vivo

let level = 1;
let levelAndar = levelAndarFunc(level)
let levelAtirar = levelAtirarFunc(level)

let criarTiro;
let possoAtirar = true;

// functions

function levelAndarFunc(n) {
    if (n == 1) {
        return 1000
    } else if (n == 2) {
        return 800
    } else if (n == 3) {
        return 700
    } else if (n == 4) {
        return 500
    }
}

function levelAtirarFunc(n) {
    if (n == 1) {
        return 1000
    } else if (n == 2) {
        return 800
    } else if (n == 3) {
        return 700
    } else if (n == 4) {
        return 500
    }
}


function iniciarGameOver() {
    tela = document.createElement('div')
    tela.className = 'gameOver'

    h3 = document.createElement('h3')
    h3.innerHTML = 'Fim de jogo!'

    p = document.createElement('p')
    p.innerHTML = 'Obrigado por jogar'

    div = document.createElement('div')
    div.className = 'btns'

    buttonR = document.createElement('button')
    buttonR.innerHTML = 'Recomeçar'
    buttonR.onclick = function () {
        alert(' click recomeçar')
    };

    buttonV = document.createElement('button')
    buttonV.innerHTML = 'Voltar ao portifólio'
    buttonV.onclick = function (){
        window.location.href = 'https://www.Luansouzadev.com.br';
    };

    tela.appendChild(h3)
    tela.appendChild(p)
    div.appendChild(buttonR)
    div.appendChild(buttonV)
    tela.appendChild(div)

    game.appendChild(tela)
}

// player andar e atirar
document.addEventListener('keydown', (e) => {
    if ((e.key == 'a' || e.key == 'A' || e.key == 'ArrowLeft') && jogadorVivo) {
        if (parseInt(player.style.left) == 0) {
            return;
        }

        let posicaoAtual = parseInt(player.style.left || "1");
        posicaoAtual -= 1;
        player.style.left = posicaoAtual + '%';
    } else if ((e.key == 'd' || e.key == 'D' || e.key == 'ArrowRight') && jogadorVivo) {
        if ((parseInt(player.style.left) + 10) == 100) {
            return;
        }
        let posicaoAtual = parseInt(player.style.left);
        posicaoAtual += 1;
        player.style.left = posicaoAtual + '%';
    } else if ((e.key == ' ' || e.key == 'ArrowUp' || e.key == 'w' || e.key == 'W') && possoAtirar && jogadorVivo) {

        if (!player.style.left) {
            player.style.left = '1%';
        }

        criarTiro = document.createElement('div');
        criarTiro.className = 'fire';

        let posicaoCanhao = parseInt(player.style.left) + 4.5;
        criarTiro.style.left = posicaoCanhao + "%";
        canhao.classList.add('aaa');
        tirosP.appendChild(criarTiro);
        possoAtirar = false;

        // Movendo o tiro
        let tiroInterval = setInterval(() => {
            let posicaoTiro = parseInt(criarTiro.style.top || "90") - 10;
            criarTiro.style.top = posicaoTiro + '%';

            if (colidiu(criarTiro, inimigo)) {
                clearInterval(tiroInterval);

                criarTiro.remove();
                alert("Você acertou o inimigo!");
                level += 1
                levelInner.innerHTML = level
            }

            if (posicaoTiro <= -2000) {
                clearInterval(tiroInterval);
                criarTiro.remove();
            } // tiro passou, apagou o tiro
        }, 1);

        setTimeout(() => {
            canhao.classList.remove('aaa');
            possoAtirar = true;
        }, 800); // evita que vire uma metralhadora
    }
}) // funcionando

// Inimigo andar
function enemyAndar(n) {

    if (!jogadorVivo) return

    if (n == 1) {
        if (parseInt(inimigo.style.left) == 0) {
            posicaoAtual = 0;
            inimigo.style.left = posicaoAtual + '%';
        }
        let posicaoAtual = parseInt(inimigo.style.left || "30");
        posicaoAtual -= 5;
        inimigo.style.left = posicaoAtual + '%';
    } else {
        if (parseInt(inimigo.style.left) >= 88) {
            posicaoAtual = 88;
            inimigo.style.left = posicaoAtual + '%';
        }
        let posicaoAtual = parseInt(inimigo.style.left || "30");
        posicaoAtual += 5;
        inimigo.style.left = posicaoAtual + '%';
    }
} // arrumado - funcionando

// Controle de movimento do inimigo
setInterval(() => {
    let andar = Math.floor(Math.random() * 2) + 1;
    enemyAndar(andar);
}, levelAndar);

// Inimigo atirar
function enemyAtirar() {

    if (!jogadorVivo) return

    const inimigoAtirou = document.createElement('div');
    inimigoAtirou.className = 'enemyfire';

    let posicaoInimigo = parseInt(inimigo.style.left || "30") + 5;
    inimigoAtirou.style.left = posicaoInimigo + "%";
    tirosE.appendChild(inimigoAtirou);

    // Movendo o tiro do inimigo
    let enemyTiroInterval = setInterval(() => {
        let posicaoTiro = parseInt(inimigoAtirou.style.top || "10") + 25;
        inimigoAtirou.style.top = posicaoTiro + '%';

        if (colidiu(inimigoAtirou, player)) {
            clearInterval(enemyTiroInterval);
            inimigoAtirou.remove();
            player.classList.add('finalBoss');
            inimigo.classList.add('finalBoss');
            iniciarGameOver()
            alert("O inimigo acertou você!");
            jogadorVivo = false; // O jogador morreu


        }

        if (posicaoTiro === 100) {
            clearInterval(enemyTiroInterval);
            inimigoAtirou.remove();
        }
    }, 10);

    setTimeout(() => {
        const div = tirosE.querySelector('.enemyfire');
        if (div) {
            div.remove();
        }
    }, 1000);
}

// Iniciar o intervalo de tiro do inimigo
setInterval(() => {
    enemyAtirar();
}, levelAtirar);

// Função de colisão
function colidiu(el1, el2) {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();

    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    );
}  // funcionando


iniciarGameOver()
