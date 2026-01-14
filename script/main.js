import './crud.js';

// BOTÃO ALTERNAR ENTRE MODO CLARO E ESCURO
const toggleBtn = document.getElementById('theme-toggle');

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        toggleBtn.textContent = ' Modo Claro';
    } else {
        toggleBtn.textContent = ' Modo Escuro';
    }
});
