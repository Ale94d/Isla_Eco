/**
 * LÓGICA DE ISLA ECO - EL VIAJERO
 */

// 1. DATOS DE PERSONAJES
const PERSONAJES = {
    "Viajero": { 
        rol: "Aetaryn", 
        msg: "Intenté marcharme, pero la isla no me dejó ir. No estoy atrapado por la fuerza… simplemente no hay camino de regreso",
        img: "none",
        color: "rgba(108, 106, 109, 0.95)"
    },
    "Kai": { 
        rol: "Khavar del Jardín de los Ecos", 
        msg: "El Oeste no rechaza a nadie, pero tampoco facilita las cosas. Si sigues avanzando por aquí, tendrás que aprender a convivir con una energía que nunca se queda quieta.",
        img: "kai.png",
        color: "rgba(85, 12, 138, 0.95)"
    },
    "Byte": { 
        rol: "Vyrtek Autónomo", 
        msg: "Registro actualizado: salida de la isla no disponible. Mi función ahora es ayudarte a adaptarte a un entorno que opera fuera de parámetros normales.",
        img: "byte.png",
        color: "rgba(0, 102, 204, 0.95)"
    },
    "Flamius": { 
        rol: "Ignar de la Forja Viva", 
        msg: "El fuego no solo destruye, también mantiene el movimiento. Mientras arda, la energía de la isla sigue fluyendo y no se apaga del todo.",
        img: "flamius.png",
        color: "rgba(235, 82, 27, 0.95)"
    },
    "Lysandra": { 
        rol: "Elyreth de Alboria", 
        msg: "La isla no te retiene por castigo. Tu llegada alteró un equilibrio que aún busca estabilizarse, y Alboria responde a cada decisión que tomas.",
        img: "lysandra.png",
        color: "rgba(0, 191, 255, 0.95)"
    },
    "Smull": { 
        rol: "Lúmyn Brotal", 
        msg: "Antes, todo crecía sin problemas… ahora algunas raíces se resisten. Cuando eso pasa, suele ser porque la isla siente que algo falta.",
        img: "smull.png",
        color: "rgba(34, 139, 34, 0.95)" //
    },
    "Arvell": { 
        rol: "Aeralyn Vigía", 
        msg: "Desde lo alto se nota el desequilibrio. No importa qué región elijas primero, ambas dependen de la misma decisión final.",
        img: "arvell.png",
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