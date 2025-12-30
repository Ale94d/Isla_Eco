/**
 * 1. CONFIGURACIÓN DE ORBES DORADOS (CANVAS)
 */
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
        this.init();
    }

    init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1; // Tamaño de los orbes
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.fadeSpeed = Math.random() * 0.005 + 0.002;
        this.direction = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Efecto de parpadeo suave
        this.opacity += this.fadeSpeed * this.direction;
        if (this.opacity > 0.8 || this.opacity < 0.2) this.direction *= -1;

        // Reposicionar si salen de la pantalla
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Crear el brillo (Glow) del orbe
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(255, 204, 51, 0.5)";
        ctx.fillStyle = `rgba(255, 204, 51, ${this.opacity})`;
        
        ctx.fill();
        ctx.closePath();
    }
}

// Crear población inicial de orbes
for (let i = 0; i < 60; i++) {
    particles.push(new Orbe());
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

/**
 * 2. GESTIÓN DE SONIDOS (SFX)
 */
const sfx = {
    clic: new Audio('sonidos/clic.mp3'),
    magia: new Audio('sonidos/magia.mp3'),
    robot: new Audio('sonidos/robot.mp3'),
    guitarra: new Audio('sonidos/guitarra.mp3'),
    exito: new Audio('sonidos/exito.mp3')
};

function reproducirSFX(nombre) {
    const sonido = sfx[nombre];
    if (sonido) {
        sonido.volume = 0.3; // Volumen bajo para no ser irritante
        sonido.currentTime = 0;
        sonido.play().catch(() => {
            // El navegador bloquea audio sin interacción previa
        });
    }
}

/**
 * 3. DATOS DE PERSONAJES (NPC)
 */
const personajesData = {
    "Viajero": { rol: "Náufrago Arcano", msg: "Las estrellas se ven distintas desde esta isla..." },
    "Kai": { rol: "Guardián del Ritmo", msg: "¡Sube el volumen! El metal aquí tiene alma." },
    "Byte": { rol: "Unidad de Lógica", msg: "Procesando... La anomalía dorada está en su punto máximo." },
    "Lysandra": { rol: "Sabia del Este", msg: "La naturaleza no habla, pero canta si sabes escuchar." },
    "Smull": { rol: "Espíritu Guía", msg: "¡Cuidado donde pisas! Las flores doradas son delicadas." }
};

/**
 * 4. EVENTOS E INTERACCIONES
 */

// Sonido para todos los botones y enlaces del menú
document.querySelectorAll('.btn-primary, .nav-menu a, .btn-nav').forEach(el => {
    el.addEventListener('click', () => reproducirSFX('clic'));
});

// Lógica de Personajes y Modales
const modal = document.getElementById('modal');
document.querySelectorAll('.char-item').forEach(item => {
    item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        const data = personajesData[id];

        // Sonido específico por personaje
        if (id === 'Byte') reproducirSFX('robot');
        else if (id === 'Kai') reproducirSFX('guitarra');
        else reproducirSFX('magia');

        // Llenar modal
        document.getElementById('modal-name').innerText = id;
        document.getElementById('modal-role').innerText = data.rol;
        document.getElementById('modal-msg').innerText = data.msg;
        
        modal.style.display = 'block';
    });
});

// Cerrar Modal
document.querySelector('.close').onclick = () => {
    modal.style.display = 'none';
};

window.onclick = (event) => {
    if (event.target == modal) modal.style.display = 'none';
};

// Formulario de Registro
document.getElementById('registro-form').onsubmit = (e) => {
    e.preventDefault();
    reproducirSFX('exito');
    alert("¡Registro exitoso! Bienvenido a Isla Eco.");
};

/**
 * 5. NAVEGACIÓN SUAVE
 */
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}