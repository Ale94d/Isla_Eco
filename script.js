// PARTICULAS
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resize);
resize();

class Orbe {
    constructor() {
        this.x = Math.random()*canvas.width; this.y = Math.random()*canvas.height;
        this.size = Math.random()*2+1; this.speedX = Math.random()*0.4-0.2;
        this.speedY = Math.random()*0.4-0.2; this.opacity = Math.random();
    }
    update() { this.x += this.speedX; this.y += this.speedY; if(this.x > canvas.width) this.x=0; if(this.y > canvas.height) this.y=0; }
    draw() { ctx.fillStyle = `rgba(255, 204, 51, ${this.opacity})`; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fill(); }
}
for(let i=0; i<70; i++) particles.push(new Orbe());
function animate() { ctx.clearRect(0,0, canvas.width, canvas.height); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate); }
animate();

// DATA PERSONAJES
const charData = {
    "Viajero": { role: "Náufrago", img: "img/viajero_full.png", msg: "El accidente lo cambió todo. Mi misión es encontrar las piezas de la Gema Nexo." },
    "Kai": { role: "Guardián Oeste", img: "img/kai_full.png", msg: "El Páramo de Silicio es duro, pero guarda la mitad tecnológica de la gema." },
    "Byte": { role: "Dron Lógico", img: "img/byte_full.png", msg: "Escaneando... Firma de energía detectada. La Gema Nexo es vital para la estabilidad." },
    "Flamius": { role: "Espíritu Arcano", img: "img/flamius_full.png", msg: "El fuego del accidente forjó un nuevo destino para nosotros." },
    "Lysandra": { role: "Sabia Este", img: "img/lysandra_full.png", msg: "La Selva de Cristal esconde la esencia mística de la Gema Nexo. Ten cuidado." },
    "Smull": { role: "Brote Místico", img: "img/smull_full.png", msg: "¡Las plantas cantan cuando las gemas están cerca!" }
};

// MODAL LOGIC
const modal = document.getElementById('modal');
document.querySelectorAll('.char-circle').forEach(el => {
    el.addEventListener('click', () => {
        const id = el.getAttribute('data-id');
        const data = charData[id];
        document.getElementById('modal-name').innerText = id;
        document.getElementById('modal-role').innerText = data.role;
        document.getElementById('modal-msg').innerText = data.msg;
        document.getElementById('modal-char-img').src = data.img;
        modal.style.display = 'flex';
    });
});
document.querySelector('.close').onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if(e.target == modal) modal.style.display = 'none'; };

// CARRUSEL LOGIC
let slideIdx = 0;
const slides = document.querySelectorAll('.carousel-item');
function moveSlide(n) {
    slides[slideIdx].classList.remove('active');
    slideIdx = (slideIdx + n + slides.length) % slides.length;
    slides[slideIdx].classList.add('active');
}

function scrollToSection(id) { document.getElementById(id).scrollIntoView({ behavior: 'smooth' }); }