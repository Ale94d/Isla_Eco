// Fondo de Partículas
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
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
    }
    update() {
        this.x += this.speedX; this.y += this.speedY;
        if(this.x > canvas.width) this.x = 0;
        if(this.y > canvas.height) this.y = 0;
    }
    draw() {
        ctx.fillStyle = 'rgba(142, 102, 255, 0.4)';
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    }
}
for(let i=0; i<60; i++) particles.push(new Particle());
function animate() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
animate();

// Datos de Personajes (Mensajes dirigidos al Viajero)
const dataNPC = {
    "Viajero": { role: "Náufrago", msg: "Mis recuerdos están fragmentados... pero sé que estas gemas son la clave.", art: "url('img/viajero-art.png')" },
    "Kai": { role: "Guardián Oeste", msg: "—Viajero, ten cuidado con la gravedad en el Oeste. No todo lo que flota es seguro.", art: "url('img/kai-art.png')" },
    "Flamius": { role: "Aliado Fuego", msg: "—Siento el frío de tu mundo, viajero. Deja que mi llama caliente tu alma.", art: "url('img/flamius-art.png')" },
    "Byte": { role: "Unidad Lógica", msg: "—Viajero, tu presencia es una variable inesperada en mis cálculos lógicos.", art: "url('img/byte-art.png')" },
    "Lysandra": { role: "Guardiana Este", msg: "—Hueles a salitre, viajero. El bosque te dará la paz que buscas.", art: "url('img/lysandra-art.png')" },
    "Smull": { role: "Espíritu Bosque", msg: "—¡Hola viajero! ¿Me ayudas a despertar las flores mágicas?", art: "url('img/smull-art.png')" },
    "Arvell": { role: "Vigía del Cielo", msg: "—Te vi caer, viajero. Las corrientes de aire te llevarán a tu destino.", art: "url('img/arvell-art.png')" }
};

// Lógica del Modal
const modal = document.getElementById('modal');
document.querySelectorAll('.char-item').forEach(card => {
    card.onclick = () => {
        const id = card.getAttribute('data-id');
        const npc = dataNPC[id];
        document.getElementById('modal-name').innerText = id;
        document.getElementById('modal-role').innerText = npc.role;
        document.getElementById('modal-msg').innerText = npc.msg;
        document.getElementById('modal-art').style.backgroundImage = npc.art;
        modal.style.display = 'block';
    }
});

document.querySelector('.close').onclick = () => modal.style.display = 'none';

// Lógica del Carrusel
const track = document.getElementById('track');
let index = 0;
document.getElementById('nextBtn').onclick = () => {
    index = (index + 1) % 3;
    track.style.transform = `translateX(-${index * 100}%)`;
};
document.getElementById('prevBtn').onclick = () => {
    index = (index - 1 + 3) % 3;
    track.style.transform = `translateX(-${index * 100}%)`;
};

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}