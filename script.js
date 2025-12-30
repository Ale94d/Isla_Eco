// 1. PARTICULAS (ORBES)
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resize);
resize();

class Orbe {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random();
    }
    update() {
        this.x += this.speedX; this.y += this.speedY;
        if(this.x > canvas.width) this.x=0; if(this.y > canvas.height) this.y=0;
    }
    draw() {
        ctx.fillStyle = `rgba(255, 204, 51, ${this.opacity})`;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fill();
    }
}
for(let i=0; i<80; i++) particles.push(new Orbe());
function animate() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
animate();

// 2. CARRUSEL FUNCIONAL
let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-item');

function moveSlide(n) {
    slides[slideIndex].classList.remove('active');
    slideIndex = (slideIndex + n + slides.length) % slides.length;
    slides[slideIndex].classList.add('active');
}

// 3. PERSONAJES Y DIÁLOGOS
const charInfo = {
    "Viajero": { role: "Náufrago Arcano", msg: "El accidente fragmentó mis recuerdos... y el mundo." },
    "Kai": { role: "Guardián de Engranajes", msg: "En el Páramo, la tecnología no espera a nadie." },
    "Byte": { role: "Asistente Lógico", msg: "Bip. Detectando alta inestabilidad en la Selva de Cristal." },
    "Flamius": { role: "Espíritu Ígneo", msg: "Mi llama mantendrá el calor en el núcleo central." },
    "Lysandra": { role: "Sabia de la Selva", msg: "La magia de cristal es poderosa, pero frágil." },
    "Smull": { role: "Brote Místico", msg: "¡Mira! Las plantas cantan después del accidente." }
};

const modal = document.getElementById('modal');
document.querySelectorAll('.char-card').forEach(card => {
    card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        document.getElementById('modal-name').innerText = id;
        document.getElementById('modal-role').innerText = charInfo[id].role;
        document.getElementById('modal-msg').innerText = charInfo[id].msg;
        modal.style.display = 'flex';
    });
});

document.querySelector('.close').onclick = () => modal.style.display = 'none';

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}