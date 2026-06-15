const draggables = document.querySelectorAll('.draggable');

// --- 1. Lógica para Espalhar Aleatoriamente ---
function randomizeIcons() {
    // Definimos margens de segurança para os ícones não vazarem da tela
    const safeTopMargin = 100; // Espaço para não cobrir a barra de navegação
    const iconWidth = 90; 
    const iconHeight = 110; 

    // Calcula o espaço útil da tela
    const maxLeft = window.innerWidth - iconWidth;
    const maxTop = window.innerHeight - iconHeight;

    draggables.forEach(icon => {
        // Gera um número aleatório dentro do espaço útil
        const randomLeft = Math.floor(Math.random() * maxLeft);
        // Garante que o número aleatório do topo respeite a margem do menu
        const randomTop = Math.floor(Math.random() * (maxTop - safeTopMargin)) + safeTopMargin;

        // Aplica as posições no CSS
        icon.style.left = `${randomLeft}px`;
        icon.style.top = `${randomTop}px`;
    });
}

// Executa a função de espalhar assim que a janela carrega
window.addEventListener('load', randomizeIcons);

// Opcional: Se a pessoa redimensionar a janela, reorganiza para não sumir nada
window.addEventListener('resize', randomizeIcons);


// --- 2. Lógica de Arrastar ---
draggables.forEach(icon => {
    let isDragging = false;
    let startX, startY, initialX, initialY;

    icon.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialX = icon.offsetLeft;
        initialY = icon.offsetTop;
        
        icon.style.zIndex = 1000; 
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        
        icon.style.left = `${initialX + dx}px`;
        icon.style.top = `${initialY + dy}px`;
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            icon.style.zIndex = 1; 
        }
    });
});