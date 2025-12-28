document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Lógica del Menú Hamburguesa
    // ==========================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            // Alternar una clase para mostrar/ocultar y animar el menú
            navMenu.classList.toggle('active'); 
            hamburger.classList.toggle('active'); // Opcional: animar el ícono
            
            // Estilo para el menú móvil que se muestra (se recomienda añadir esto al CSS también)
            if (navMenu.classList.contains('active')) {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '80px';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.backgroundColor = 'rgba(26, 22, 37, 0.95)';
                navMenu.style.padding = '16px';
                navMenu.style.borderTop = '1px solid var(--border-subtle)';
            } else {
                 // En CSS responsivo (max-width: 768px) debe volver a ser 'none'
                 // Para simplificar, lo manejamos aquí:
                 if (window.innerWidth <= 768) {
                    navMenu.style.display = 'none';
                 }
            }
        });
        
        // Cierra el menú cuando se hace clic en un enlace (en móvil)
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    navMenu.style.display = 'none';
                }
            });
        });
    }

    // ==========================================
    // 2. Lógica para Partículas de Fondo (Efecto Fantasía)
    // Usando Canvas para un efecto de "polvo estelar" o "luz dorada"
    // ==========================================
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return; // Salir si el canvas no existe

    const ctx = canvas.getContext('2d');
    let width, height, particles;

    // Configuración de las partículas basada en los colores Dorado/Morado
    const particleSettings = {
        count: 50,
        color: 'rgba(255, 215, 0, 0.8)', // Dorado con opacidad
        sizeMin: 1,
        sizeMax: 4,
        speed: 0.5,
    };

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        // Ajustar el número de partículas en pantallas más pequeñas
        particleSettings.count = width > 768 ? 50 : 30;
        createParticles();
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * (particleSettings.sizeMax - particleSettings.sizeMin) + particleSettings.sizeMin;
            this.vx = Math.random() * particleSettings.speed * 2 - particleSettings.speed;
            this.vy = Math.random() * particleSettings.speed * 2 - particleSettings.speed;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Reiniciar la partícula si sale de la pantalla
            if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
            }
        }

        draw() {
            ctx.fillStyle = particleSettings.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < particleSettings.count; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

});