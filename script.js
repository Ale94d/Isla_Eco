// 1. FONDO DE ORBES DORADOS
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Orbe {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 1;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.y > canvas.height) this.y = 0;
    }
    draw() {
        ctx.fillStyle = `rgba(255, 204, 51, ${this.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "gold";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for(let i=0; i<70; i++) particles.push(new Orbe());

function animate() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
animate();

// 2. DATOS COMPLETOS DE PERSONAJES
const dataNPC = {
    "Viajero": { role: "Náufrago Arcano", msg: "Mis recuerdos brillan como el oro... debo encontrar las gemas." },
    "Kai": { role: "Guardián Rockero", msg: "¡Eh, Viajero! El Oeste tiene ritmo. ¡Sigue el compás!" },
    "Flamius": { role: "Aliado de Fuego", msg: "Mi llama arde con la fuerza del sol para protegerte." },
    "Byte": { role: "Unidad de Lógica", msg: "Análisis completado. La isla requiere energía dorada." },
    "Lysandra": { role: "Guardiana Este", msg: "El bosque susurra tu nombre. La armonía te sanará." },
    "Smull": { role: "Espíritu Bosque", msg: "¡Hola! Las plantas brillan cuando tú pasas cerca." },
    "Arvell": { role: "Vigía del Cielo", msg: "Te vi caer. Las corrientes de aire te guiarán." }
};

// 3. SONIDOS Y MODAL
const sfx = {
    clic: new Audio('sonidos/clic.mp3'),
    magia: new Audio('sonidos/magia.mp3'),
    robot: new Audio('sonidos/robot.mp3'),
    guitarra: new Audio('sonidos/guitarra.mp3'),
    exito: new Audio('sonidos/exito.mp3')
};

function sonar(n) {
    const s = sfx[n];
    if(s) { s.volume = 0.3; s.currentTime = 0; s.play().catch(()=>{}); }
}

const modal = document.getElementById('modal');
document.querySelectorAll('.char-item').forEach(el => {
    el.addEventListener('click', () => {
        const id = el.getAttribute('data-id');
        const npc = dataNPC[id];

        // Sonido por tipo de personaje
        if(id === 'Byte') sonar('robot');
        else if(id === 'Kai') sonar('guitarra');
        else sonar('magia');

        document.getElementById('modal-name').innerText = id;
        document.getElementById('modal-role').innerText = npc.role;
        document.getElementById('modal-msg').innerText = npc.msg;
        modal.style.display = 'flex';
    });
});

document.querySelector('.close').onclick = () => modal.style.display = 'none';

document.getElementById('registro-form').onsubmit = (e) => {
    e.preventDefault();
    sonar('exito');
    alert("¡Registro exitoso!");
};

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}