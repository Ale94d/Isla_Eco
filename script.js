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

const dataNPC = {
    "Viajero": { role: "NÁUFRAGO", msg: "—¿Dónde estoy? Todo lo que recuerdo es el estruendo del mar." },
    "Kai": { role: "GUARDIÁN OESTE", msg: "—Bienvenido al lado inestable de la isla. No toques nada que flote demasiado." },
    "Flamius": { role: "ESPÍRITU FUEGO", msg: "—¿Traes madera? Mi llama necesita avivarse para abrir el camino." },
    "Byte": { role: "ROBOT LOGIC", msg: "—01001000 Hola. Mis circuitos detectan una anomalía en tu ADN viajero." },
    "Lysandra": { role: "GUARDIANA ESTE", msg: "—La naturaleza te da la bienvenida, siempre que respetes su flujo." },
    "Smull": { role: "ESPÍRITU BOSQUE", msg: "—Las flores cantan cuando pasas. Debes ser el elegido." },
    "Arvell": { role: "VIGÍA CIELO", msg: "—Desde arriba vi tu barco caer. Tuviste suerte de aterrizar aquí." }
};

const modal = document.getElementById('character-modal');
document.querySelectorAll('.character-card').forEach(card => {
    card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const npc = dataNPC[id];
        const icon = card.querySelector('.character-avatar').innerText;
        document.getElementById('modal-name').innerText = id;
        document.getElementById('modal-role').innerText = npc.role;
        document.getElementById('modal-text').innerText = npc.msg;
        document.getElementById('modal-avatar').innerText = icon;
        modal.style.display = 'block';
    });
});

document.querySelector('.close-modal').onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if(e.target == modal) modal.style.display = 'none'; }

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('animate-show'); });
}, { threshold: 0.1 });
document.querySelectorAll('.animate-hidden').forEach(el => observer.observe(el));

function scrollToSection(id) { document.getElementById(id).scrollIntoView({ behavior: 'smooth' }); }