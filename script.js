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
        if(this.x > canvas.width) this.x = 0;
        if(this.y > canvas.height) this.y = 0;
    }
    draw() {
        ctx.fillStyle = 'rgba(125, 87, 194, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
for(let i=0; i<50; i++) particles.push(new Particle());
function animate() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
animate();

// Datos de Personajes
const dataNPC = {
    "Viajero": { role: "Náufrago", msg: "Mis recuerdos están fragmentados... pero sé que estas gemas son la clave.", art: "" },
    "Kai": { role: "Guardián Oeste", msg: "Viajero, ten cuidado con la gravedad en el Oeste. No todo lo que flota es seguro.", art: "url('img/kai.png')" },
    "Flamius": { role: "Aliado Fuego", msg: "Siento el frío de tu mundo, náufrago. Deja que mi llama te guíe.", art: "url('img/flamius.png')" },
    "Byte": { role: "Unidad Lógica", msg: "Procesando datos... Tu presencia es una variable inesperada en mi sistema.", art: "url('img/byte.png')" },
    "Lysandra": { role: "Guardiana Este", msg: "Hueles a salitre y metal. La armonía del bosque te sanará si se lo permites.", art: "url('img/lysandra.png')" },
    "Smull": { role: "Espíritu Bosque", msg: "¡Pequeño viajero! Ayúdame a despertar las flores y ellas te darán el paso.", art: "url('img/smull.png')" },
    "Arvell": { role: "Vigía del Cielo", msg: "Te vi caer desde las nubes. El viento tiene mucho que contarte sobre este lugar.", art: "url('img/arvell.png')" }
};

// Modal
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
window.onclick = (e) => { if(e.target == modal) modal.style.display = 'none'; }

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}