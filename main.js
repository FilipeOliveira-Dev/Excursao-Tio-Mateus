// BOTÃO ALTERNAR ENTRE MODO CLARO E ESCURO
const toggleBtn = document.getElementById('theme-toggle');
const iconBtn = document.getElementById('.icon-btn');

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        toggleBtn.textContent = ' Modo Claro';
    } else {
        toggleBtn.textContent = ' Modo Escuro';
    }
});


const formulario = document.querySelector('.js-form');
const nome = document.querySelector('#name');
const date = document.querySelector('#birth-date');


// FUNCAO PARA SUBMITER O FORMULÁRIO
formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();
    const nomeCompleto = nome.value;
    const dataNascimento = date.value;

    // Formata a data de YYYY-MM-DD para DD/MM/AAAA
    const [ano, mes, dia] = dataNascimento.split('-');
    const dataFormatada = `${dia}/${mes}/${ano}`;

    incluirCadastro(nomeCompleto, dataFormatada);
    salvarParticipante(nomeCompleto, dataFormatada);
    alert("Formulário enviado com sucesso!");
    limparFormulario();
});


// FUNCAO PARA INCLUIR O ITEM NA TABELA
function incluirCadastro(nomeCompleto, dataFormatada){
    // Adiciona nova linha na tabela
    const tabelaBody = document.querySelector('#tabela-participantes tbody');
    const novaLinha = document.createElement('tr');
    const celulaNome = document.createElement('td');
    const celulaData = document.createElement('td');
    const editarCadastro = document.createElement('td');
    const excluirCadastro = document.createElement('td');

    celulaNome.textContent = nomeCompleto;
    celulaData.textContent = dataFormatada;
    editarCadastro.innerHTML = `<button class="btn-item">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>`;
    excluirCadastro.innerHTML = `<button class="btn-item">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>`;

    novaLinha.append(celulaNome, celulaData, editarCadastro, excluirCadastro);
    tabelaBody.appendChild(novaLinha);
}


function salvarParticipante(nome, data) {
    const participantes = JSON.parse(localStorage.getItem('participantes')) || [];
    participantes.push({ nome, data });
    localStorage.setItem('participantes', JSON.stringify(participantes));
}

function carregarParticipantes() {
    const participantes = JSON.parse(localStorage.getItem('participantes')) || [];
    participantes.forEach(participante => {
        incluirCadastro(participante.nome, participante.data);
    });
}

function limparFormulario() {
    nome.value = '';
    date.value = '';
}


carregarParticipantes();