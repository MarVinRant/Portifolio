const draggables = document.querySelectorAll('.draggable');

// --- 1. Alinhamento inicial dos ícones na Home (Estilo Dock) ---
function positionIcons() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // No celular, deixa só a logo principal centralizada no topo e esconde o resto
        draggables.forEach(icon => {
            if (icon.querySelector('.logo-destaque')) {
                icon.style.display = 'flex';
                icon.style.left = '50%';
                icon.style.top = '110px'; 
                icon.style.transform = 'translateX(-50%)';
            } else {
                icon.style.display = 'none'; 
            }
        });
        return; 
    }

    // --- Configuração para PC (Desktop) ---
    // Filtro maroto: se eu esquecer de apagar os outros ícones do HTML, o JS esconde e só usa os 4 principais
    const visibleIcons = Array.from(draggables).filter(icon => {
        const text = icon.querySelector('span').innerText.toLowerCase();
        const isMain = text.includes('rantech') || text.includes('html') || text.includes('css') || text.includes('java');
        if (!isMain) {
            icon.style.display = 'none';
        }
        return isMain;
    });

    const iconWidth = 90;
    const gap = 25; // Espaçamento entre um ícone e outro na fileira de baixo
    const totalWidth = (visibleIcons.length * iconWidth) + ((visibleIcons.length - 1) * gap);
    
    // Calcula onde começar a desenhar a fileira pra ficar perfeitamente centralizada na horizontal
    let startLeft = (window.innerWidth / 2) - (totalWidth / 2);
    const bottomMargin = 140; // Altura em relação ao rodapé da página (ajustar aqui se quiser mais alto ou baixo)
    const initialTop = window.innerHeight - bottomMargin;

    visibleIcons.forEach((icon, index) => {
        icon.style.display = 'flex';
        icon.style.transform = ''; // Tira o efeito de centralizar do mobile se voltar pro PC
        
        // Só mexe na posição de início se o usuário ainda não tiver arrastado o ícone com o mouse
        if (!icon.dataset.dragged) {
            icon.style.left = `${startLeft + (index * (iconWidth + gap))}px`;
            icon.style.top = `${initialTop}px`;
        }
    });
}

// Rodar sempre que a página carregar ou mudar de tamanho
window.addEventListener('load', positionIcons);
window.addEventListener('resize', positionIcons);


// --- 2. Sistema de arrastar os ícones (Exclusivo para o PC) ---
draggables.forEach(icon => {
    let isDragging = false;
    let startX, startY, initialX, initialY;

    icon.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialX = icon.offsetLeft;
        initialY = icon.offsetTop;
        
        icon.style.zIndex = 1000; // Joga pra frente de tudo na hora do arraste
        icon.dataset.dragged = "true"; // Trava a posição pra não dar reset caso a janela mude de tamanho
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


// --- 3. Envio do Formulário direto pro WhatsApp ---
const contactForm = document.getElementById('whatsapp-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        const nome = document.getElementById('nome').value;
        const whatsapp = document.getElementById('whatsapp').value;
        const projeto = document.getElementById('projeto').value;

        // MEU NÚMERO DE CONTATO: Lembrar de atualizar o DDD caso mude de chip no futuro
        const meuNumero = "5511987291623"; 
        
        const mensagem = `Olá Marcos! Meu nome é ${nome}. Estive olhando o seu portfólio e tenho interesse em desenvolver um(a) ${projeto}. Meu número de contato é ${whatsapp}. Podemos conversar sobre um orçamento?`;

        const url = `https://wa.me/${meuNumero}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, '_blank');
    });
}

// --- 4. Máscara de formatação do número de celular ---
const inputWhatsapp = document.getElementById('whatsapp');

if (inputWhatsapp) {
    inputWhatsapp.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
        
        if (value.length > 0) {
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); // Coloca os parênteses no DDD
        }
        if (value.length > 9) {
            value = value.replace(/(\d{5})(\d)/, '$1-$2'); // Tracinho do celular
        }
        
        e.target.value = value.substring(0, 15); // Trava no limite de caracteres do formato
    });
}