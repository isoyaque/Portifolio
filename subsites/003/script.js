const dataInput = document.querySelector('#datainput')
const tarefaInput = document.querySelector('#tarefainput')
const rangeInput = document.querySelector('#rangeinput')
const botaocriar = document.querySelector('.botao')
const tarefasContainer = document.querySelector('.tarefas')

function criarTarefa(){
    let criarTarefa = document.createElement('div');
    criarTarefa.className = 'tarefa';

    let criarTitulo = document.createElement('p');
    criarTitulo.className = 'tarefa-nome';
    criarTitulo.textContent = tarefaInput.value;

    let criarLineData = document.createElement('p')
    let criarData = document.createElement('span')
    criarData.textContent = dataInput.value;
    criarLineData.className = 'tarefa-data';
    criarLineData.textContent = `Data limite` + criarData;

    let criarBotoes = document.createElement('div');
    criarBotoes.className = 'botoes'
    let criarBotaoConcluido = document.createElement('button');
    criarBotaoConcluido.textContent ='Concluido';
    criarBotaoConcluido.className = 'concluido'

    let criarBotaoExcluir = document.createElement('button');
    criarBotaoExcluir.textContent ='Excluir';
    criarBotaoExcluir.className = 'excluir'

    criarBotoes.appendChild(criarBotaoConcluido)
    criarBotoes.appendChild(criarBotaoExcluir)

    criarTarefa.appendChild(criarTitulo)
    criarTarefa.appendChild(criarLineData)

    criarTarefa.appendChild(criarBotoes)

    tarefasContainer.appendChild(criarTarefa)

}

botaocriar.addEventListener('click', criarTarefa)