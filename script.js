// PARTÍCULAS DORADAS
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
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * 0.2 - 0.1;
        this.opacity = Math.random();
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.y > canvas.height) this.y = 0;
    }
    draw() {
        ctx.fillStyle = `rgba(255, 204, 51, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
animate();

// DATOS PERSONAJES
const dataNPC = {
    "Viajero": { role: "Náufrago", msg: "Mis recuerdos brillan como el oro..." },
    "Kai": { role: "Guardián Rockero", msg: "—¡Eh, Viajero! El Oeste tiene ritmo." },
    "Byte": { role: "Unidad Robótica", msg: "—Bip... Procesando datos... Origen de energía dorada detectado." },
    "Lysandra": { role: "Guardiana Este", msg: "—El bosque susurra tu nombre." },
    "Smull": { role: "Espíritu", msg: "—¡Hola! Las plantas brillan para ti." }
};

// MODAL
const modal = document.getElementById('modal');
document.querySelectorAll('.char-item').forEach(card => {
    card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const npc = dataNPC[id];
        if (npc) {
            document.getElementById('modal-name').innerText = id;
            document.getElementById('modal-role').innerText = npc.role;
            document.getElementById('modal-msg').innerText = npc.msg;
            modal.style.display = 'block';
        }
    });
});
document.querySelector('.close').onclick = () => modal.style.display = 'none';

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}