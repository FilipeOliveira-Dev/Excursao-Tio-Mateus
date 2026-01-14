const formulario = document.querySelector('.js-form');
const nome = document.querySelector('#name');
const date = document.querySelector('#birth-date');
let idEdicao = null;

// Configura a data máxima do input para hoje (bloqueia no calendário)
const hoje = new Date();
const anoAtual = hoje.getFullYear();
const mesAtual = String(hoje.getMonth() + 1).padStart(2, '0');
const diaAtual = String(hoje.getDate()).padStart(2, '0');
const dataHoje = `${anoAtual}-${mesAtual}-${diaAtual}`;
date.setAttribute('max', dataHoje);

// FUNCAO PARA SUBMETER O FORMULÁRIO
formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();
    const nomeCompleto = nome.value;
    const dataNascimento = date.value;

    if (dataNascimento > dataHoje) {
        return;
    }

    // Formata a data de YYYY-MM-DD para DD/MM/AAAA
    const [ano, mes, dia] = dataNascimento.split('-');
    const dataFormatada = `${dia}/${mes}/${ano}`;

    if (idEdicao) {
        atualizarParticipante(idEdicao, nomeCompleto, dataFormatada);
        alert("Cadastro atualizado com sucesso!");
        idEdicao = null;        
        document.querySelector('#tabela-participantes tbody').innerHTML = '';
        carregarParticipantes();
    } else {
        const id = Date.now();
        incluirCadastro(nomeCompleto, dataFormatada, id);
        salvarParticipante(nomeCompleto, dataFormatada, id);
        alert("Formulário enviado com sucesso!");
    }
    limparFormulario();
});


// FUNCAO PARA INCLUIR O ITEM NA TABELA
function incluirCadastro(nomeCompleto, dataFormatada, id){
    // Adiciona nova linha na tabela
    const tabelaBody = document.querySelector('#tabela-participantes tbody');
    const novaLinha = document.createElement('tr');
    const celulaNome = document.createElement('td');
    const celulaData = document.createElement('td');
    const celulaEditar = document.createElement('td');
    const celularExcluir = document.createElement('td');

    celulaNome.textContent = nomeCompleto;
    celulaData.textContent = dataFormatada;

    const btnEditar = document.createElement('button');
    btnEditar.classList.add('btn-item');
    btnEditar.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    btnEditar.onclick = () => editarCadastro(id, nomeCompleto, dataFormatada);
    celulaEditar.appendChild(btnEditar);

    const btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btn-item');
    btnExcluir.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    btnExcluir.onclick = () => excluirCadastro(id, novaLinha);
    celularExcluir.appendChild(btnExcluir);

    novaLinha.append(celulaNome, celulaData, celulaEditar, celularExcluir);
    tabelaBody.appendChild(novaLinha);
}


function salvarParticipante(nome, data, id) {
    const participantes = JSON.parse(localStorage.getItem('participantes')) || [];
    const novoParticipante = {
        id: id,
        nome: nome,
        data: data
    };
    
    participantes.push(novoParticipante);
    localStorage.setItem('participantes', JSON.stringify(participantes));
    
    console.log("Participante salvo com ID:", novoParticipante.id);
}

function atualizarParticipante(id, nome, data) {
    const participantes = JSON.parse(localStorage.getItem('participantes')) || [];
    const index = participantes.findIndex(p => p.id === id);
    
    if (index !== -1) {
        participantes[index].nome = nome;
        participantes[index].data = data;
        localStorage.setItem('participantes', JSON.stringify(participantes));
    }
}

function carregarParticipantes() {
    const participantes = JSON.parse(localStorage.getItem('participantes')) || [];
    participantes.forEach(participante => {
        incluirCadastro(participante.nome, participante.data, participante.id);
    });
}

function editarCadastro(id, txtNome, txtData){
    idEdicao = id;
    nome.value = txtNome;
    
    const [dia, mes, ano] = txtData.split('/');
    date.value = `${ano}-${mes}-${dia}`;
}


function excluirCadastro(idParaRemover, elementoDOM){
    if (elementoDOM) {
        elementoDOM.remove();
    }

    const participantes = JSON.parse(localStorage.getItem('participantes')) || [];
    // Filtra o array: mantém todos, exceto o que tem o ID que queremos apagar
    const listaAtualizada = participantes.filter(p => p.id !== idParaRemover);
    
    localStorage.setItem('participantes', JSON.stringify(listaAtualizada));
}

function limparFormulario() {
    nome.value = '';
    date.value = '';
}

carregarParticipantes();