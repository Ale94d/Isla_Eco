// Partículas
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resize); resize();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }
    update() {
        this.x += this.speedX; this.y += this.speedY;
        if(this.x > canvas.width) this.x = 0; if(this.y > canvas.height) this.y = 0;
    }
    draw() { ctx.fillStyle = 'rgba(125, 87, 194, 0.3)'; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fill(); }
}
for(let i=0; i<60; i++) particles.push(new Particle());
function animate() { ctx.clearRect(0,0,canvas.width,canvas.height); particles.forEach(p => {p.update(); p.draw();}); requestAnimationFrame(animate); }
animate();

// DIÁLOGOS DE PERSONAJES HACIA EL VIAJERO
const dataNPC = {
    "Viajero": { role: "PROTAGONISTA", msg: "Mis recuerdos están fragmentados... pero sé que estas gemas son la clave.", img: "" },
    "Kai": { role: "GUARDIÁN", msg: "—Viajero, ten cuidado con la gravedad en el Oeste. No todo lo que flota es seguro.", img: "url('img/kai-draw.png')" },
    "Flamius": { role: "ALIADO", msg: "—Siento el frío de tu mundo, náufrago. Deja que mi fuego te guíe.", img: "url('img/flamius-draw.png')" },
    "Byte": { role: "LÓGICA", msg: "—Procesando datos... Tu presencia es una variable inesperada en mi sistema.", img: "url('img/byte-draw.png')" },
    "Lysandra": { role: "GUARDIANA", msg: "—Hueles a salitre y metal. La armonía del bosque te sanará si se lo permites.", img: "url('img/lysandra-draw.png')" },
    "Smull": { role: "ESPÍRITU", msg: "—¡Pequeño viajero! Ayúdame a despertar las flores y ellas te darán el paso.", img: "url('img/smull-draw.png')" },
    "Arvell": { role: "VIGÍA", msg: "—Te vi caer desde las nubes. El viento tiene mucho que contarte sobre este lugar.", img: "url('img/arvell-draw.png')" }
};

// Modal Logic
const modal = document.getElementById('character-modal');
document.querySelectorAll('.character-card').forEach(card => {
    card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const npc = dataNPC[id];
        document.getElementById('modal-name').innerText = id;
        document.getElementById('modal-role').innerText = npc.role;
        document.getElementById('modal-text').innerText = npc.msg;
        document.getElementById('modal-image-placeholder').style.backgroundImage = npc.img;
        modal.style.display = 'block';
    });
});

document.querySelector('.close-modal').onclick = () => modal.style.display = 'none';

// Carrusel Logic
const slide = document.querySelector('.carousel-slide');
let counter = 0;
document.getElementById('nextBtn').onclick = () => {
    if (counter >= 2) counter = -1;
    counter++;
    slide.style.transform = `translateX(${-counter * 100}%)`;
};
document.getElementById('prevBtn').onclick = () => {
    if (counter <= 0) counter = 3;
    counter--;
    slide.style.transform = `translateX(${-counter * 100}%)`;
};

function scrollToSection(id) { document.getElementById(id).scrollIntoView({ behavior: 'smooth' }); }

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('animate-show'); });
}, { threshold: 0.1 });
document.querySelectorAll('.animate-hidden').forEach(el => observer.observe(el));