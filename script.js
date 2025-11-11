// ==========================================
// SENA Prom 2026 - Video Game Website JavaScript
// Funcionalidades: Partículas, Navegación, Animaciones
// ==========================================

// Variables globales
let particles = [];
let canvas, ctx;
let isAnimationRunning = false;

// ==========================================
// INICIALIZACIÓN
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeNavigation();
    initializeScrollAnimations();
    initializeMobileMenu();
    initializeScrollEffects();
});

// ==========================================
// SISTEMA DE PARTÍCULAS
// ==========================================

function initializeParticles() {
    canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    resizeCanvas();
    
    // Solo activar en desktop para optimizar rendimiento móvil
    if (window.innerWidth > 768) {
        createParticles();
        startAnimation();
    }
    
    window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticles() {
    particles = [];
    const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000));
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2,
            hue: Math.random() * 60 + 280 // Rango azul-púrpura
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        // Actualizar posición
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Rebotar en los bordes
        if (particle.x < 0 || particle.x > canvas.width) {
            particle.speedX *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
            particle.speedY *= -1;
        }
        
        // Mantener en pantalla
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        
        // Dibujar partícula
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = `hsl(${particle.hue}, 70%, 60%)`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        
        // Conectar partículas cercanas
        particles.forEach(otherParticle => {
            const distance = Math.sqrt(
                Math.pow(particle.x - otherParticle.x, 2) + 
                Math.pow(particle.y - otherParticle.y, 2)
            );
            
            if (distance < 100) {
                ctx.save();
                ctx.globalAlpha = (100 - distance) / 100 * 0.2;
                ctx.strokeStyle = `hsl(${particle.hue}, 50%, 50%)`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.stroke();
                ctx.restore();
            }
        });
    });
}

function startAnimation() {
    if (!isAnimationRunning) {
        isAnimationRunning = true;
        function animate() {
            animateParticles();
            requestAnimationFrame(animate);
        }
        animate();
    }
}

// ==========================================
// NAVEGACIÓN SUAVE
// ==========================================

function initializeNavigation() {
    // Smooth scroll para enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Actualizar navegación activa al hacer scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Altura del navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ==========================================
// MENÚ MÓVIL
// ==========================================

function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer click en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ==========================================
// ANIMACIONES DE SCROLL
// ==========================================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos que deben animarse
    const animateElements = document.querySelectorAll(
        '.story-card, .sector-card, .character-card, .system-card, .stat-item'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// ==========================================
// EFECTOS DE SCROLL
// ==========================================

function initializeScrollEffects() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const currentScrollY = window.scrollY;
        
        // Efecto de transparencia del navbar
        if (currentScrollY > 50) {
            navbar.style.background = 'rgba(26, 22, 37, 0.98)';
        } else {
            navbar.style.background = 'rgba(26, 22, 37, 0.95)';
        }
        
        // Ocultar/mostrar navbar en scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
        
        // Parallax effect para el hero
        const hero = document.querySelector('.hero');
        if (hero && currentScrollY < hero.offsetHeight) {
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${currentScrollY * parallaxSpeed}px)`;
        }
    });
}

// ==========================================
// FUNCIONES UTILITARIAS
// ==========================================

// Función para el botón de "Ver Tráiler"
function playTrailer() {
    // Crear modal para el tráiler
    const modal = document.createElement('div');
    modal.className = 'trailer-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>Tráiler de SENA Prom 2026</h3>
            <div class="trailer-placeholder">
                <p>🎮 Tráiler próximamente disponible</p>
                <p>¡Mantente atento a las actualizaciones del proyecto!</p>
            </div>
        </div>
    `;
    
    // Estilos del modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(13, 11, 20, 0.95);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: var(--bg-surface);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-lg);
        padding: var(--space-xl);
        max-width: 600px;
        width: 90%;
        text-align: center;
        position: relative;
    `;
    
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.style.cssText = `
        position: absolute;
        top: var(--space-md);
        right: var(--space-md);
        font-size: 24px;
        color: var(--text-secondary);
        cursor: pointer;
        transition: var(--transition-normal);
    `;
    
    closeBtn.addEventListener('mouseenter', function() {
        this.style.color = var('--text-primary');
    });
    
    // Funcionalidad del modal
    function closeModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Cerrar con ESC
    function handleEsc(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEsc);
        }
    }
    document.addEventListener('keydown', handleEsc);
    
    document.body.appendChild(modal);
    
    // Animar entrada
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

// Función para copiar texto al clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        showNotification('¡Copiado al portapapeles!');
    }).catch(function() {
        showNotification('No se pudo copiar al portapapeles');
    });
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: var(--space-md);
        background: var(--bg-surface);
        color: var(--text-primary);
        padding: var(--space-sm) var(--space-md);
        border-radius: var(--radius-md);
        border: 1px solid var(--primary);
        box-shadow: var(--shadow-md);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ==========================================
// EFECTOS ADICIONALES
// ==========================================

// Easter egg: Konami Code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Activar modo desarrollador
        document.body.classList.add('developer-mode');
        showNotification('¡Modo Desarrollador activado! 🎮', 'success');
        konamiCode = [];
    }
});

// Lazy loading para imágenes
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce a eventos de scroll pesados
const debouncedScrollHandler = debounce(updateActiveNavLink, 100);
window.addEventListener('scroll', debouncedScrollHandler);

// ==========================================
// ESTILOS ADICIONALES DINÁMICOS
// ==========================================

// Agregar estilos para elementos que se animan
const additionalStyles = `
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-link.active {
        color: var(--primary) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 80px;
            flex-direction: column;
            background: var(--bg-surface);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: var(--shadow-md);
            padding: var(--space-lg) 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu li {
            margin: var(--space-sm) 0;
        }
    }
`;

// Inyectar estilos adicionales
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// ==========================================
// INICIALIZACIÓN FINAL
// ==========================================

// Función para manejar cambios de visibilidad de la página
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pausar animaciones cuando la página no está visible
        isAnimationRunning = false;
    } else {
        // Reanudar animaciones cuando la página vuelve a estar visible
        if (window.innerWidth > 768) {
            startAnimation();
        }
    }
});

// Manejo de errores globales
window.addEventListener('error', function(e) {
    console.error('Error en la página:', e.error);
    // En producción, aquí se podría enviar el error a un servicio de logging
});

// Feedback de carga
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    showNotification('¡Página cargada completamente! 🎮', 'success');
});

console.log(`
🎮 SENA Prom 2026 - Website Loaded
Desarrollado con ❤️ para el proyecto SENA
Tecnologías: HTML5, CSS3, JavaScript ES6+
`);