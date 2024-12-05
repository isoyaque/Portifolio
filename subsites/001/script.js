const game = document.querySelector('.game');
const inimigo = document.querySelector('.enemy');
const levelInner = document.querySelector('span');
const player = document.querySelector('.person');
const canhao = document.querySelector('.cannon');
const tirosE = document.querySelector('.tirosE');
const tirosP = document.querySelector('.tirosP');

let jogadorVivo = true;  // Variável para controlar se o jogador está vivo
let emvida = true;  // Variável para controlar se o inimigo está vivo
let emvida2 = true;  

let criarTiro;
let possoAtirar = true;
let level = 1;
let tempoTiro = 1000 / level;

// functions

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
                inimigo.remove();
                alert("Você acertou o inimigo!");
                emvida = false
                level +=1
                levelInner.innerHTML=level

                Inimigodois()

            }

            if (posicaoTiro <= -2000) {
                clearInterval(tiroInterval);
                criarTiro.remove();
            }
        }, 1);

        setTimeout(() => {
            canhao.classList.remove('aaa');
            possoAtirar = true;
        }, 800);
    }
});

// Inimigo andar
function enemyAndar(n) {
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
}

// Controle de movimento do inimigo
setInterval(() => {
    let andar = Math.floor(Math.random() * 2) + 1;
    enemyAndar(andar);
}, tempoTiro);

// Inimigo atirar
function enemyAtirar() {
    if (!emvida) return;  // Se o inimigo morreu, ele não pode atirar

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
            player.remove();
            alert("O inimigo acertou você!");
            jogadorVivo = false; // O jogador morreu
            emvida = false;
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
}, 2000);

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
}


// Criar inimigo lvl 2

function Inimigodois(){
    let criarInimigo = document.createElement('div');
    criarInimigo.classList = 'enemy dois'

    let criarOlhoe = document.createElement('div')
    criarOlhoe.classList= 'o dir'
    let criarOlhod = document.createElement('div')
    criarOlhod.classList= 'o esq'

    criarInimigo.appendChild(criarOlhod)
    criarInimigo.appendChild(criarOlhoe)

    game.appendChild(criarInimigo)

    setInterval(enemyNovoAtirar, 750)
    setInterval(enemyNovoAtirar, 750)
}

function enemyNovoAtirar() {
    let inimidodois = document.querySelector('.dois')

    if (!emvida2) return;  // Se o inimigo morreu, ele não pode atirar

    const inimigoAtirou = document.createElement('div');
    inimigoAtirou.className = 'enemyfire';

    let posicaoInimigo = parseInt(inimidodois.style.left || "30") + 5;
    inimigoAtirou.style.left = posicaoInimigo + "%";
    tirosE.appendChild(inimigoAtirou);

    // Movendo o tiro do inimigo
    let enemyTiroInterval = setInterval(() => {
        let posicaoTiro = parseInt(inimigoAtirou.style.top || "10") + 25;
        inimigoAtirou.style.top = posicaoTiro + '%';

        if (colidiu(inimigoAtirou, player)) {
            clearInterval(enemyTiroInterval);
            inimigoAtirou.remove();
            player.remove();
            alert("O inimigo acertou você!");
            jogadorVivo = false; // O jogador morreu
            emvida = false;
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
    }, 750);
}

function enemyNovoAndar(n) {
    if (n == 1) {

        let inimidodois = document.querySelector('.dois')

        if (parseInt(inimidodois.style.left) == 0) {
            posicaoAtual = 0;
            inimidodois.style.left = posicaoAtual + '%';
        }
        let posicaoAtual = parseInt(inimidodois.style.left || "30");
        posicaoAtual -= 5;
        inimidodois.style.left = posicaoAtual + '%';
    } else {
        if (parseInt(inimidodois.style.left) >= 88) {
            posicaoAtual = 88;
            inimidodois.style.left = posicaoAtual + '%';
        }
        let posicaoAtual = parseInt(inimidodois.style.left || "30");
        posicaoAtual += 5;
        inimidodois.style.left = posicaoAtual + '%';
    }
}

setInterval(() => {
    let andar = Math.floor(Math.random() * 2) + 1;
    enemyNovoAndar(andar);
}, 1200);