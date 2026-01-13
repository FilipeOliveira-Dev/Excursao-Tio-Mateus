// BOTÃO ALTERNAR ENTRE MODO CLARO E ESCURO
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        toggleBtn.textContent = 'Modo Claro';
    } else {
        toggleBtn.textContent = 'Modo Escuro';
    }
});

// FUNCAO PARA SUBMITER O FORMULÁRIO
const formulario = document.querySelector('.js-form');
const nome = document.querySelector('#name');
const date = document.querySelector('#birth-date');

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();
    const nomeCompleto = nome.value;
    const dataNascimento = date.value;
    
    // Formata a data de YYYY-MM-DD para DD/MM/AAAA
    const [ano, mes, dia] = dataNascimento.split('-');
    const dataFormatada = `${dia}/${mes}/${ano}`;
    
    alert("Formulário enviado com sucesso!");
    console.log(`Nome: ${nomeCompleto}, Data de Nascimento: ${dataFormatada}`);

    limparFormulario();
});

function limparFormulario() {
    nome.value = '';
    date.value = '';
}