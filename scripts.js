const draggables = document.querySelectorAll('.draggable');

// --- 1. Lógica para Espalhar Aleatoriamente (Com Área Livre no Centro) ---
function randomizeIcons() {
    const safeTopMargin = 100; // Margem do menu superior
    const iconWidth = 90; 
    const iconHeight = 110; 

    // Calcula o espaço total útil da tela
    const maxLeft = window.innerWidth - iconWidth;
    const maxTop = window.innerHeight - iconHeight;

    // Define o tamanho da "Zona Proibida" no centro (onde fica o texto)
    const blockWidth = 750; // Margem de segurança horizontal
    const blockHeight = 350; // Margem de segurança vertical
    
    // Calcula as coordenadas exatas desse quadrado invisível no meio da tela
    const minX = (window.innerWidth / 2) - (blockWidth / 2);
    const maxX = (window.innerWidth / 2) + (blockWidth / 2);
    const minY = (window.innerHeight / 2) - (blockHeight / 2);
    const maxY = (window.innerHeight / 2) + (blockHeight / 2);

    draggables.forEach(icon => {
        let randomLeft, randomTop;
        let caiuNoCentro = true;
        let tentativas = 0;

        // O código vai sortear posições repetidamente até achar uma livre
        while (caiuNoCentro && tentativas < 100) {
            randomLeft = Math.floor(Math.random() * maxLeft);
            randomTop = Math.floor(Math.random() * (maxTop - safeTopMargin)) + safeTopMargin;

            // Verifica se a posição sorteada invadiu a zona proibida
            if (
                randomLeft + iconWidth > minX && randomLeft < maxX &&
                randomTop + iconHeight > minY && randomTop < maxY
            ) {
                caiuNoCentro = true; // Bateu no texto, sorteia de novo
            } else {
                caiuNoCentro = false; // Achou um espaço nas bordas!
            }
            tentativas++;
        }

        // Aplica as posições finais nas bordas
        icon.style.left = `${randomLeft}px`;
        icon.style.top = `${randomTop}px`;
    });
}

// O BUG ESTAVA AQUI: Faltou mandar a função rodar quando a página carrega!
window.addEventListener('load', randomizeIcons);
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


// --- 3. Lógica do Formulário de Contato (WhatsApp) ---
const contactForm = document.getElementById('whatsapp-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        const nome = document.getElementById('nome').value;
        const whatsapp = document.getElementById('whatsapp').value;
        const projeto = document.getElementById('projeto').value;

        // Lembre-se de colocar o seu número aqui!
        const meuNumero = "5511987291623"; 
        
        const mensagem = `Olá Marcos! Meu nome é ${nome}. Estive olhando o seu portfólio e tenho interesse em desenvolver um(a) ${projeto}. Meu número de contato é ${whatsapp}. Podemos conversar sobre um orçamento?`;

        const url = `https://wa.me/${meuNumero}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, '_blank');
    });
}

// --- 4. Máscara do campo de WhatsApp ---
const inputWhatsapp = document.getElementById('whatsapp');

if (inputWhatsapp) {
    inputWhatsapp.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, ''); 
        
        if (value.length > 0) {
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); 
        }
        if (value.length > 9) {
            value = value.replace(/(\d{5})(\d)/, '$1-$2'); 
        }
        
        e.target.value = value.substring(0, 15);
    });
}