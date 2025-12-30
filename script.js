// FONDO DE ORBES DORADOS
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
            this.pulse = Math.random() * 0.01 + 0.005;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity += this.pulse;
            if (this.opacity > 0.8 || this.opacity < 0.1) this.pulse *= -1;
            if (this.x > canvas.width || this.x < 0) this.x = Math.random() * canvas.width;
            if (this.y > canvas.height || this.y < 0) this.y = Math.random() * canvas.height;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 204, 51, ${this.opacity})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#ffcc33";
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    for (let i = 0; i < 70; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}

// DATOS
const dataNPC = {
    "Viajero": { role: "Náufrago", msg: "Mis recuerdos brillan como el oro... debo encontrar las gemas.", art: "" },
    "Kai": { role: "Guardián Rockero", msg: "—¡Eh, Viajero! El Oeste tiene ritmo. ¡No pierdas el compás!", art: "" },
    "Flamius": { role: "Aliado Fuego", msg: "—Mi llama arde con la fuerza del sol para protegerte.", art: "" },
    "Byte": { role: "Unidad de Lógica", msg: "—Escudos activados. Analizando frecuencias doradas.", art: "" },
    "Lysandra": { role: "Guardiana Este", msg: "—El bosque susurra tu nombre. La armonía te sanará.", art: "" },
    "Smull": { role: "Espíritu Bosque", msg: "—¡Mira! Las flores brillan cuando tú pasas cerca.", art: "" },
    "Arvell": { role: "Vigía del Cielo", msg: "—Desde lo alto, todo parece un mar de oro y sombras.", art: "" }
};

// MODAL
const modal = document.getElementById('modal');
if (modal) {
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
    window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };
}

function scrollToSection(id) {
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({ behavior: 'smooth' });
}