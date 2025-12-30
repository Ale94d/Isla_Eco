/**
 * SCRIPT CORREGIDO - ISLA ECO
 * Cambios realizados:
 * 1. Control de nulidad para evitar errores "cannot read property of null".
 * 2. Optimización del renderizado del Canvas.
 * 3. Corrección de la lógica del modal y carrusel.
 */

// 1. FONDO DE ORBES DORADOS (CANVAS)
const canvas = document.getElementById('particles-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let particles = [];

function resize() {
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

if (canvas && ctx) {
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.init();
        }
        init() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.3 - 0.15;
            this.speedY = Math.random() * 0.3 - 0.15;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width || this.x < 0) this.x = Math.random() * canvas.width;
            if (this.y > canvas.height || this.y < 0) this.y = Math.random() * canvas.height;
        }
        draw() {
            ctx.fillStyle = `rgba(255, 204, 51, ${this.opacity})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#ffcc33";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0; // Importante: Reset para rendimiento
        }
    }

    for (let i = 0; i < 80; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// 2. DATOS DE PERSONAJES
const dataNPC = {
    "Viajero": { role: "Náufrago", msg: "Mis recuerdos brillan como el oro... debo encontrar las gemas.", art: "url('img/viajero-art.png')" },
    "Kai": { role: "Guardián Oeste", msg: "—Viajero, la luz dorada te guiará donde la brújula falle.", art: "url('img/kai-art.png')" },
    "Flamius": { role: "Aliado Fuego", msg: "—Mi llama arde con la fuerza del sol para protegerte.", art: "url('img/flamius-art.png')" },
    "Byte": { role: "Unidad Lógica", msg: "—Procesando... la energía dorada detectada es de origen ancestral.", art: "url('img/byte-art.png')" },
    "Lysandra": { role: "Guardiana Este", msg: "—El bosque susurra tu nombre bajo el manto de las estrellas.", art: "url('img/lysandra-art.png')" },
    "Smull": { role: "Espíritu Bosque", msg: "—¡Mira! Las flores brillan cuando pasas.", art: "url('img/smull-art.png')" },
    "Arvell": { role: "Vigía del Cielo", msg: "—Desde lo alto, todo parece un mar de oro y sombras.", art: "url('img/arvell-art.png')" }
};

// 3. LÓGICA DEL MODAL (CON VERIFICACIÓN)
const modal = document.getElementById('modal');
const modalName = document.getElementById('modal-name');
const modalRole = document.getElementById('modal-role');
const modalMsg = document.getElementById('modal-msg');
const modalArt = document.getElementById('modal-art');
const closeBtn = document.querySelector('.close');

if (modal) {
    document.querySelectorAll('.char-item').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            const npc = dataNPC[id];
            if (npc) {
                if (modalName) modalName.innerText = id;
                if (modalRole) modalRole.innerText = npc.role;
                if (modalMsg) modalMsg.innerText = npc.msg;
                if (modalArt) modalArt.style.backgroundImage = npc.art;
                modal.style.display = 'block';
            }
        });
    });

    if (closeBtn) {
        closeBtn.onclick = () => modal.style.display = 'none';
    }

    window.onclick = (e) => {
        if (e.target == modal) modal.style.display = 'none';
    };
}

// 4. LÓGICA DEL CARRUSEL (CORREGIDA)
const track = document.getElementById('track');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
let currentIndex = 0;

if (track && nextBtn && prevBtn) {
    const slides = document.querySelectorAll('.slide');
    nextBtn.onclick = () => {
        currentIndex = (currentIndex + 1) % slides.length;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };
    prevBtn.onclick = () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };
}

// 5. NAVEGACIÓN SUAVE
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}