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
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
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
        ctx.shadowBlur = 10;
        ctx.shadowColor = "gold";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for(let i=0; i<60; i++) particles.push(new Orbe());

function animate() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
animate();

// 2. GESTIÓN DE SONIDOS (SFX)
const sfx = {
    clic: new Audio('sonidos/clic.mp3'),
    magia: new Audio('sonidos/magia.mp3'),
    robot: new Audio('sonidos/robot.mp3'),
    guitarra: new Audio('sonidos/guitarra.mp3'),
    exito: new Audio('sonidos/exito.mp3')
};

function sonar(nombre) {
    const s = sfx[nombre];
    if(s) { 
        s.volume = 0.3; 
        s.currentTime = 0; 
        s.play().catch(()=>{}); 
    }
}

// 3. DATOS DE PERSONAJES
const npcs = {
    "Viajero": { role: "Náufrago Arcano", msg: "Mis recuerdos brillan como el oro... debo encontrar las gemas." },
    "Kai": { role: "Guardián Rockero", msg: "¡Eh, Viajero! El Oeste tiene ritmo. ¡Sigue el compás o te perderás!" },
    "Byte": { role: "Unidad de Lógica", msg: "Análisis completado. La energía dorada en esta zona es estable." },
    "Lysandra": { role: "Guardiana del Este", msg: "El bosque susurra tu nombre. La armonía mística te sanará." },
    "Smull": { role: "Espíritu del Bosque", msg: "¡Hola! Las plantas brillan cuando tú pasas cerca. ¡Qué divertido!" }
};

// 4. INTERACCIONES
document.querySelectorAll('.btn-primary, .nav-menu a').forEach(el => {
    el.addEventListener('click', () => sonar('clic'));
});

const modal = document.getElementById('modal');
document.querySelectorAll('.char-item').forEach(el => {
    el.addEventListener('click', () => {
        const id = el.getAttribute('data-id');
        
        // Sonido según el personaje
        if(id === 'Byte') sonar('robot');
        else if(id === 'Kai') sonar('guitarra');
        else sonar('magia');

        // Llenar datos en la ventana
        document.getElementById('modal-name').innerText = id;
        document.getElementById('modal-role').innerText = npcs[id].role;
        document.getElementById('modal-msg').innerText = npcs[id].msg;
        
        // Mostrar modal con Flexbox
        modal.style.display = 'flex';
    });
});

document.querySelector('.close').onclick = () => modal.style.display = 'none';

document.getElementById('registro-form').onsubmit = (e) => {
    e.preventDefault();
    sonar('exito');
    alert("¡Cuenta creada con éxito! Bienvenido a Isla Eco.");
};

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}