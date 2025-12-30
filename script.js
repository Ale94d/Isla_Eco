// 1. FONDO DE ORBES MÁGICOS DORADOS
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
            this.size = Math.random() * 2.5 + 1;
            this.speedX = Math.random() * 0.2 - 0.1;
            this.speedY = Math.random() * 0.2 - 0.1;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.fadeDirection = Math.random() > 0.5 ? 0.005 : -0.005; // Dirección del parpadeo
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Efecto de parpadeo suave
            this.opacity += this.fadeDirection;
            if (this.opacity > 0.8 || this.opacity < 0.1) this.fadeDirection *= -1;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 204, 51, ${this.opacity})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = "rgba(255, 204, 51, 0.4)";
            ctx.fill();
            ctx.closePath();
        }
    }

    for (let i = 0; i < 70; i++) particles.push(new Particle());

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

// 2. DATOS DE PERSONAJES (KAI ROCKERO & BYTE TECH)
const dataNPC = {
    "Viajero": { role: "Náufrago", msg: "Mis recuerdos brillan como el oro... debo encontrar las gemas.", art: "" },
    "Kai": { role: "Guardián Rockero", msg: "—¡Eh, Viajero! El Oeste no solo tiene tecnología, tiene ritmo. ¡Sigue el compás!", art: "" },
    "Flamius": { role: "Aliado Fuego", msg: "—Mi llama arde con la fuerza del sol para protegerte.", art: "" },
    "Byte": { role: "Unidad de Lógica", msg: "—Análisis completado. Los sistemas de la isla requieren energía dorada.", art: "" },
    "Lysandra": { role: "Guardiana Este", msg: "—El bosque susurra tu nombre. La armonía mística te sanará.", art: "" },
    "Smull": { role: "Espíritu Bosque", msg: "—¡Hola! Las plantas brillan cuando tú pasas cerca.", art: "" },
    "Arvell": { role: "Vigía del Cielo", msg: "—Te vi caer. Las corrientes de aire te llevarán a tu destino.", art: "" }
};

// 3. LÓGICA DEL MODAL
const modal = document.getElementById('modal');
const modalName = document.getElementById('modal-name');
const modalRole = document.getElementById('modal-role');
const modalMsg = document.getElementById('modal-msg');

if (modal) {
    document.querySelectorAll('.char-item').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            const npc = dataNPC[id];
            if (npc) {
                modalName.innerText = id;
                modalRole.innerText = npc.role;
                modalMsg.innerText = npc.msg;
                modal.style.display = 'block';
            }
        });
    });

    document.querySelector('.close').onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };
}

// Navegación suave
function scrollToSection(id) {
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({ behavior: 'smooth' });
}