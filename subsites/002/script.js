let tabuleiro = document.querySelector(".tabuleiro");

const inputNumber = document.querySelector('input');

inputNumber.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        criarquadrados(inputNumber.value);
        inputNumber.style.display = 'none';
    }
});

function criarquadrados(n) {
    for (let i = 0; i < n; i++) {
        let criar = document.createElement('div');
        criar.className = 'square';

        // Adiciona o evento de mouseover
        criar.addEventListener('mouseover', () => {
            criar.classList.add('claro'); // Classe adicionada imediatamente

            // Remove a classe após 5 segundos
            setTimeout(() => {
                criar.classList.remove('claro');
            }, 1000);
        });

        criar.addEventListener('touchmove', () => {
            criar.classList.add('claro'); // Classe adicionada imediatamente

            // Remove a classe após 5 segundos
            setTimeout(() => {
                criar.classList.remove('claro');
            }, 1000);
        });

        tabuleiro.appendChild(criar);
    }
}
