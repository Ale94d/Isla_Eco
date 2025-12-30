// ==========================================
// 1. SISTEMA DE PARTÍCULAS DE FONDO
// ==========================================
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() { 
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; 
}
window.addEventListener('resize', resize); 
resize();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }
    update() {
        this.x += this.speedX; 
        this.y += this.speedY;
        if(this.x > canvas.width) this.x = 0; 
        if(this.y > canvas.height) this.y = 0;
        if(this.x < 0) this.x = canvas.width;
        if(this.y < 0) this.y = canvas.height;
    }
    draw() { 
        ctx.fillStyle = 'rgba(125, 87, 194, 0.3)'; 
        ctx.beginPath(); 
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); 
        ctx.fill(); 
    }
}

for(let i=0; i<60; i++) particles.push(new Particle());

function animate() { 
    ctx.clearRect(0,0,canvas.width,canvas.height); 
    particles.forEach(p => {p.update(); p.draw();}); 
    requestAnimationFrame(animate); 
}
animate();

// ==========================================
// 2. BASE DE DATOS DE PERSONAJES (NPCs)
// ==========================================
const dataNPC = {
    "Viajero": { 
        role: "NÁUFRAGO / PROTAGONISTA", 
        msg: "—Ese objeto que encontré entre los restos... me recuerda un mundo que ya no existe. Debo encontrar las Gemas para entender qué pasó y cómo volver a casa." 
    },
    "Kai": { 
        role: "GUARDIÁN DEL CAOS", 
        msg: "—¿Buscas la Gema del Caos? Demuestra que tu voluntad puede superar esta física rota. Y tal vez, si me ayudas, te invite a un cereal cósmico." 
    },
    "Flamius": { 
        role: "ESPÍRITU DE FUEGO", 
        msg: "—Mi fuego se debilita con este desequilibrio. Ayúdame a estabilizar las llamas del Sector Oeste y te daré la fuerza necesaria para seguir." 
    },
    "Byte": { 
        role: "UNIDAD DE LÓGICA", 
        msg: "—Error 404: Estabilidad no encontrada. Resuelve mis acertijos binarios para desbloquear los protocolos de seguridad de la Colina Invertida." 
    },
    "Lysandra": { 
        role: "GUARDIÁN DE LA ARMONÍA", 
        msg: "—La Gema de la Armonía se gana purificando la tierra. Siente el abrazo del agua y escucha el susurro de la Linfa fluyendo de nuevo." 
    },
    "Smull": { 
        role: "ESPÍRITU DEL BOSQUE", 
        msg: "—¿Sientes el latido del Árbol Antiguo? Está muy débil. Necesitamos la Magia de Crecimiento para que la vida vuelva a brotar en el Sector Este." 
    },
    "Arvell": { 
        role: "VIGÍA DEL CIELO", 
        msg: "—Desde aquí arriba, las corrientes de aire cuentan historias. Sígueme por las rutas del viento y encontraremos los secretos que el pantano oculta." 
    }
};

// ==========================================
// 3. LÓGICA DE VENTANA MODAL
// ==========================================
const modal = document.getElementById('character-modal');

document.querySelectorAll('.character-card').forEach(card => {
    card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const npc = dataNPC[id];
        
        // Obtener el emoji del avatar de la tarjeta
        const icon = card.querySelector('.character-avatar').innerText;

        // Llenar la ventana modal
        document.getElementById('modal-name').innerText = id;
        document.getElementById('modal-role').innerText = npc.role;
        document.getElementById('modal-text').innerText = npc.msg;
        document.getElementById('modal-avatar').innerText = icon; // Pone el emoji en el modal
        
        modal.style.display = 'block';
    });
});

// Cerrar modal al hacer clic en la X
document.querySelector('.close-modal').onclick = () => {
    modal.style.display = 'none';
};

// Cerrar modal al hacer clic fuera de la ventana
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// ==========================================
// 4. ANIMACIONES AL HACER SCROLL
// ==========================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { 
        if(entry.isIntersecting) {
            entry.target.classList.add('animate-show'); 
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-hidden').forEach(el => observer.observe(el));

// ==========================================
// 5. NAVEGACIÓN SUAVE
// ==========================================
function scrollToSection(id) { 
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' }); 
}