/**
 * ISLA ECO - LÓGICA INTEGRAL
 * Autor: El Viajero
 */

// 1. BASE DE DATOS DE PERSONAJES (Incluye a Arvell)
const charData = {
    "Viajero": { 
        role: "Náufrago", 
        img: "img/viajero.png", 
        msg: "El accidente lo fragmentó todo. Mi misión es encontrar las piezas de la Gema Nexo para restaurar el orden." 
    },
    "Kai": { 
        role: "Guardián del Oeste", 
        img: "img/kai.png", 
        msg: "Si buscas tecnología dorada y engranajes antiguos, el Páramo de Silicio es tu lugar. Ten cuidado con los restos del accidente." 
    },
    "Byte": { 
        role: "Dron Lógico", 
        img: "img/byte.png", 
        msg: "Análisis: Firma de energía detectada. La inestabilidad en la isla aumenta un 15% cada hora. Recomiendo precaución." 
    },
    "Flamius": { 
        role: "Espíritu Arcano", 
        img: "img/flamius.png", 
        msg: "Mi fuego no se apaga, ni siquiera tras la gran explosión. Represento la energía que aún late en el núcleo." 
    },
    "Lysandra": { 
        role: "Sabia del Este", 
        img: "img/lysandra.png", 
        msg: "La Selva de Cristal susurra secretos místicos. La naturaleza está herida, pero la magia pura aún puede salvarla." 
    },
    "Smull": { 
        role: "Brote Místico", 
        img: "img/smull.png", 
        msg: "¡Cuidado donde pisas! Las plantas brillan más de lo normal hoy y tienen mucha hambre de energía mágica." 
    },
    "Arvell": { 
        role: "Vigía del Aire", 
        img: "img/arvell.png", 
        msg: "Desde lo más alto de la isla, vigilo que nadie robe las gemas. Nada escapa a mi vista entre las nubes." 
    }
};

// 2. SISTEMA DE VENTANAS EMERGENTES (MODAL)
const modal = document.getElementById('modal');
const modalName = document.getElementById('modal-name');
const modalRole = document.getElementById('modal-role');
const modalMsg = document.getElementById('modal-msg');
const modalImg = document.getElementById('modal-char-img');
const closeBtn = document.querySelector('.close');

// Asignar clics a los círculos de personajes
document.querySelectorAll('.char-circle').forEach(el => {
    el.onclick = function() {
        const id = this.getAttribute('data-id');
        const data = charData[id];
        
        // Rellenar datos
        modalName.innerText = id;
        modalRole.innerText = data.role;
        modalMsg.innerText = data.msg;
        modalImg.src = data.img;
        
        // Mostrar ventana con animación flex
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Evita scroll al estar abierto
    };
});

// Cerrar ventana al pulsar la X
closeBtn.onclick = () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
};

// Cerrar ventana al pulsar fuera del cuadro
window.onclick = (e) => {
    if(e.target == modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

// 3. LÓGICA DEL CARRUSEL DE IMÁGENES
let slideIdx = 0;

function moveSlide(n) {
    const slides = document.querySelectorAll('.carousel-item');
    if (slides.length === 0) return;

    // Quitar clase activa actual
    slides[slideIdx].classList.remove('active');
    
    // Calcular siguiente índice
    slideIdx = (slideIdx + n + slides.length) % slides.length;
    
    // Activar nueva slide
    slides[slideIdx].classList.add('active');
}

// 4. FONDO ANIMADO DE PARTÍCULAS (Ambientación)
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
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vX = Math.random() * 0.4 - 0.2;
        this.vY = Math.random() * 0.4 - 0.2;
        this.size = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
        this.x += this.vX;
        this.y += this.vY;
        if(this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }
    draw() {
        ctx.fillStyle = `rgba(255, 204, 51, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Crear partículas
for(let i = 0; i < 70; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}
animate();

// 5. NAVEGACIÓN SUAVE (Smooth Scroll)
function scrollToSection(id) {
    const target = document.getElementById(id);
    if(target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
}