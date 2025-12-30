/**
 * LÓGICA DE ISLA ECO - EL VIAJERO
 */

// 1. DATOS DE PERSONAJES
const PERSONAJES = {
    "Viajero": { 
        rol: "Náufrago del Tiempo", 
        msg: "El accidente fragmentó la gema nexo. Debo encontrar ambas mitades para volver a casa.",
        img: "none"
        color: "rgba(75, 0, 130, 0.95)"
    },
    "Kai": { 
        rol: "Guardián del Páramo", 
        msg: "La tecnología dorada no es un juguete. Si buscas la mitad de la gema, prepárate para luchar.",
        img: "img/kai.png"
        color: "rgba(85, 12, 138, 0.95)"
    },
    "Byte": { 
        rol: "Asistente Robótico", 
        msg: "Bip... Análisis completado. La energía mágica de la selva está corrompiendo mis circuitos.",
        img: "img/byte.png"
        color: "rgba(0, 102, 204, 0.95)"
    },
    "Flamius": { 
        rol: "Espíritu de Fuego", 
        msg: "El calor del núcleo es lo único que mantiene esta isla a flote. No dejes que se apague.",
        img: "img/flamius.png"
        color: "rgba(235, 82, 27, 0.95)"
    },
    "Lysandra": { 
        rol: "Sabia de la Selva", 
        msg: "La naturaleza tiene memoria. Ella sabe quién causó el accidente arcano.",
        img: "img/lysandra.png"
        color: "rgba(0, 191, 255, 0.95)"
    },
    "Smull": { 
        rol: "Brote de Cristal", 
        msg: "¡Las plantas brillan porque tienen hambre! No te acerques mucho a las raíces azules.",
        img: "img/smull.png"
        color: "rgba(34, 139, 34, 0.95)" //
    },
    "Arvell": { 
        rol: "Vigía de los Cielos", 
        msg: "Desde mi posición veo cómo las dos regiones chocan. El equilibrio es frágil.",
        img: "img/arvell.png"
        color: "rgba(218, 165, 32, 0.95)"
    }
};

// 2. VENTANA EMERGENTE (MODAL)
const modal = document.getElementById('modal-personaje');
const closeBtn = document.querySelector('.close-btn');

document.querySelectorAll('.char-circle').forEach(boton => {
    boton.addEventListener('click', () => {
        const nombre = boton.getAttribute('data-id');
        const data = PERSONAJES[nombre];

        if (data) {
            document.getElementById('modal-name').innerText = nombre;
            document.getElementById('modal-role').innerText = data.rol;
            document.getElementById('modal-msg').innerText = data.msg;
            
            const cuadroImagen = document.querySelector('.modal-img-frame');
            const imagenElemento = document.getElementById('modal-img');

            if (data.img === "none") {
                cuadroImagen.style.display = 'none';
            } else {
                cuadroImagen.style.display = 'block';
                imagenElemento.src = data.img;
            }
            
            modal.style.display = 'flex';
        }
    });
});
closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };

// 3. LÓGICA DEL CARRUSEL
let slideIndex = 0;
function moveSlide(n) {
    const slides = document.querySelectorAll('.carousel-item');
    slides[slideIndex].classList.remove('active');
    
    slideIndex = (slideIndex + n + slides.length) % slides.length;
    
    slides[slideIndex].classList.add('active');
}

// 4. FONDO DE ORBES DORADOS (PARTÍCULAS)
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function initParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255, 204, 51, 0.5)";
    
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    });
    
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', initParticles);
initParticles();
animateParticles();

// 5. DESPLAZAMIENTO SUAVE
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}