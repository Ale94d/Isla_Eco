// Partículas de fondo
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

// Diálogos de personajes basados en la trama
const dataNPC = {
    "Viajero": { 
        role: "NÁUFRAGO", 
        msg: "—Ese objeto que encontré entre los restos... me recuerda un mundo que ya no existe[cite: 1, 12]. Debo encontrar las Gemas para entender qué pasó." 
    },
    "Kai": { 
        role: "GUARDIÁN OESTE", 
        msg: "—¿Buscas la Gema del Caos? Demuestra que tu voluntad puede superar esta física rota[cite: 4, 9]. Y tal vez, invítame a un cereal cósmico[cite: 10]." 
    },
    "Lysandra": { 
        role: "GUARDIÁN ESTE", 
        msg: "—La Gema de la Armonía se gana purificando la tierra[cite: 21, 29]. Siente el abrazo del agua y escucha el susurro de la Linfa[cite: 20, 30]." 
    }
};

const modal = document.getElementById('character-modal');
document.querySelectorAll('.character-card').forEach(card => {
    card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const npc = dataNPC[id];
        document.getElementById('modal-name').innerText = id;
        document.getElementById('modal-role').innerText = npc.role;
        document.getElementById('modal-text').innerText = npc.msg;
        modal.style.display = 'block';
    });
});

document.querySelector('.close-modal').onclick = () => modal.style.display = 'none';

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('animate-show'); });
}, { threshold: 0.1 });
document.querySelectorAll('.animate-hidden').forEach(el => observer.observe(el));

function scrollToSection(id) { document.getElementById(id).scrollIntoView({ behavior: 'smooth' }); }