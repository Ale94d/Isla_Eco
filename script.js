// ==========================================
// SENA Prom 2026 - Video Game Website JavaScript
// Funcionalidades: Partículas (Canvas), Navegación, Animaciones, Utilidades
// ==========================================

// Variables globales para el sistema de partículas
let particles = [];
let canvas, ctx;
let isAnimationRunning = false;

// Variables de estilo (Asumimos que están definidas en style.css, pero las usamos como fallback)
const CSS_VARS = {
    '--primary': '#7D57C2', // Color principal para notificaciones, etc.
    '--bg-surface': '#1A1625', // Fondo para modales/menú móvil
    '--text-primary': '#FFFFFF', // Texto principal
    '--text-secondary': '#B3AEC7', // Texto secundario
    '--border-subtle': '#3A3250',
    '--shadow-md': '0 4px 10px rgba(0, 0, 0, 0.4)',
    '--space-md': '15px',
    '--space-sm': '10px',
    '--space-lg': '25px',
    '--space-xl': '40px',
    '--radius-md': '8px',
    '--radius-lg': '12px',
    '--transition-normal': '0.3s ease',
};

// Función para obtener variables CSS o usar un fallback
function getCssVar(name) {
    const rootStyle = getComputedStyle(document.documentElement);
    let value = rootStyle.getPropertyValue(name).trim();
    
    // Si la variable no está definida en CSS, usa el fallback
    if (value === '') {
        value = CSS_VARS[name] || '#FFFFFF'; // Fallback final
    }
    return value;
}

// ==========================================
// INICIALIZACIÓN
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Inyección de estilos dinámicos (debe ser lo primero)
    injectAdditionalStyles(); 
    
    // Inicialización de módulos
    initializeParticles();
    initializeNavigation();
    initializeScrollAnimations();
    initializeMobileMenu();
    initializeScrollEffects();
    initializeLazyLoading(); // Agregado aquí para que se ejecute al inicio
});


// ==========================================
// SISTEMA DE PARTÍCULAS (Implementación con Canvas)
// ==========================================

function initializeParticles() {
    canvas = document.getElementById('particles-canvas');
    
    // Si no hay canvas, salimos
    if (!canvas) {
        console.warn('Canvas con ID "particles-canvas" no encontrado. Las partículas no se mostrarán.');
        return;
    }
    
    ctx = canvas.getContext('2d');
    resizeCanvas();
    
    // Solo activar en desktop para optimizar rendimiento móvil
    if (window.innerWidth > 768) {
        createParticles();
        startAnimation();
    }
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        // Si la animación no está corriendo y pasamos a desktop
        if (window.innerWidth > 768 && !isAnimationRunning) {
            createParticles();
            startAnimation();
        }
        // Si la animación está corriendo y pasamos a móvil
        if (window.innerWidth <= 768 && isAnimationRunning) {
            isAnimationRunning = false; // Detener la animación
        }
    });
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    // La altura del canvas se fija a la altura de la ventana para ocupar todo el fondo
    canvas.height = document.documentElement.scrollHeight; // Mejor usar la altura total del documento
    
    // También es bueno re-crear las partículas al redimensionar
    if (isAnimationRunning) {
        createParticles();
    }
}

function createParticles() {
    particles = [];
    // Recalcular la cantidad de partículas de manera más optimizada
    const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 10000));
    
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
    // ClearRect solo en la vista actual para optimizar
    ctx.clearRect(0, window.scrollY, canvas.width, window.innerHeight); 
    
    // Mejorar la limpieza del canvas completo
    ctx.fillStyle = 'rgba(26, 22, 37, 0)'; // Color de fondo semi-transparente para rastro
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Limpia todo el canvas con un rastro sutil
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpieza completa para evitar fantasmas

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
        
        // Mantener en pantalla (ajuste de límites)
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
                ctx.strokeStyle = getCssVar('--primary'); // Usar la variable principal de CSS
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
    // Corregir la variable de control para que no se ejecute dos veces
    if (!isAnimationRunning) {
        isAnimationRunning = true;
        function animate() {
            if (!isAnimationRunning) return; // Detener si se ha pausado
            animateParticles();
            requestAnimationFrame(animate);
        }
        animate();
    }
}

// ==========================================
// NAVEGACIÓN SUAVE Y ACTUALIZACIÓN DE ESTADO
// ==========================================

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Usar la versión con debounce para la actualización activa
    window.addEventListener('scroll', debouncedScrollHandler);
}

// Globalizar la función para usar en el HTML (botones, etc.)
window.scrollToSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Altura del navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
};

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = 'inicio'; // Por defecto, si está arriba de todo
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Ajuste para el navbar
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
            // Esperar el scroll suave antes de cerrar el menú, si es necesario
            setTimeout(() => {
                 hamburger.classList.remove('active');
                 navMenu.classList.remove('active');
            }, 300); // 300ms de transición del menú
        });
    });
}

// ==========================================
// ANIMACIONES DE SCROLL (Intersection Observer)
// ==========================================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Mostrar el elemento cuando le falta 50px para llegar abajo
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Detener la observación después de la animación
            }
        });
    }, observerOptions);
    
    // Elementos a observar para la animación
    const animateElements = document.querySelectorAll(
        '.story-card, .sector-card, .character-card, .system-card, .stat-item, .registration-form' // Añadido el formulario
    );
    
    animateElements.forEach(el => {
        // Aseguramos que tengan la clase base para la animación inicial (opcional)
        // el.classList.add('animate-hidden-base'); 
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
        
        if (!navbar) return;
        
        // 1. Efecto de transparencia del navbar
        if (currentScrollY > 50) {
            // Usar la clase 'scrolled' en lugar de estilos inline para mayor control en CSS
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // 2. Ocultar/mostrar navbar en scroll (Solo si no está en modo móvil activo)
        const isMobileMenuOpen = document.querySelector('.hamburger.active');
        if (!isMobileMenuOpen) {
             if (currentScrollY > lastScrollY && currentScrollY > 150) { // Scroll Down
                navbar.style.transform = 'translateY(-100%)';
            } else if (currentScrollY < lastScrollY) { // Scroll Up
                navbar.style.transform = 'translateY(0)';
            }
        } else {
             navbar.style.transform = 'translateY(0)'; // No ocultar si el menú está abierto
        }

        lastScrollY = currentScrollY;
        
        // 3. Parallax effect para el hero (Revisado)
        const hero = document.querySelector('.hero');
        if (hero) {
            const parallaxSpeed = 0.5;
            // Solo aplicar el efecto si no se ha scrolleado más allá del hero
            if (currentScrollY < hero.offsetHeight) {
                hero.style.transform = `translateY(${currentScrollY * parallaxSpeed}px)`;
            } else {
                 hero.style.transform = `translateY(0)`;
            }
        }
    });
}

// ==========================================
// FUNCIONES UTILITARIAS
// ==========================================

// Función para el botón de "Ver Tráiler" (Globalizada para el HTML)
window.playTrailer = function() {
    const modal = document.createElement('div');
    modal.className = 'trailer-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>Tráiler de Isla Eco</h3>
            <div class="trailer-placeholder" style="
                background: ${getCssVar('--border-subtle')}; 
                padding: 50px; 
                margin: 20px 0; 
                border-radius: 8px;">
                <p style="color: ${getCssVar('--primary')}">🎮 Tráiler próximamente disponible</p>
                <p>¡Mantente atento a las actualizaciones del proyecto!</p>
            </div>
        </div>
    `;
    
    // Estilos del modal - Usando getCssVar para consistencia
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
        background: ${getCssVar('--bg-surface')};
        border: 1px solid ${getCssVar('--border-subtle')};
        border-radius: ${getCssVar('--radius-lg')};
        padding: ${getCssVar('--space-xl')};
        max-width: 600px;
        width: 90%;
        text-align: center;
        position: relative;
    `;
    
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.style.cssText = `
        position: absolute;
        top: ${getCssVar('--space-md')};
        right: ${getCssVar('--space-md')};
        font-size: 24px;
        color: ${getCssVar('--text-secondary')};
        cursor: pointer;
        transition: 0.3s ease;
    `;
    
    closeBtn.addEventListener('mouseenter', function() {
        this.style.color = getCssVar('--text-primary');
    });
    closeBtn.addEventListener('mouseleave', function() {
        this.style.color = getCssVar('--text-secondary');
    });
    
    // Funcionalidad del modal
    function closeModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            if(document.body.contains(modal)) document.body.removeChild(modal);
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
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
};

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 0; 
        margin-right: ${getCssVar('--space-md')}; /* Espacio a la derecha */
        background: ${getCssVar('--bg-surface')};
        color: ${getCssVar('--text-primary')};
        padding: ${getCssVar('--space-sm')} ${getCssVar('--space-md')};
        border-radius: ${getCssVar('--radius-md')};
        border: 1px solid ${type === 'success' ? '#4CAF50' : getCssVar('--primary')}; /* Color dinámico */
        box-shadow: ${getCssVar('--shadow-md')};
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

// Debounce para optimizar eventos de scroll pesados
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

// Aplicar debounce a la función de actualización de enlaces activos
const debouncedScrollHandler = debounce(updateActiveNavLink, 100);

// Lazy loading para imágenes (Asumiendo que hay imágenes con data-src)
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                // img.classList.remove('lazy'); // Asegúrate de quitar la clase si la usas
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '0px 0px 200px 0px' // Precarga 200px antes de que entre en la vista
    });
    
    images.forEach(img => imageObserver.observe(img));
}


// ==========================================
// ESTILOS ADICIONALES DINÁMICOS
// ==========================================

function injectAdditionalStyles() {
    // Usar getCssVar para que la inyección sea consistente
    const primaryColor = getCssVar('--primary');
    
    const additionalStyles = `
        /* Animación de entrada general */
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
        
        /* Estado activo de la navegación */
        .nav-link.active {
            color: ${primaryColor} !important;
        }
        
        .nav-link::after {
            background-color: ${primaryColor} !important;
        }

        .nav-link.active::after {
            width: 100% !important;
        }

        /* Estilos del Navbar al hacer scroll */
        .navbar.scrolled {
             background: rgba(26, 22, 37, 0.98) !important;
             box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }
        
        /* Animación del menú hamburguesa */
        .hamburger {
            display: none; /* Debería estar en el CSS, pero lo dejamos por si acaso */
            cursor: pointer;
            width: 30px;
            height: 25px;
            position: relative;
            z-index: 100;
        }
        
        .hamburger span {
            display: block;
            width: 100%;
            height: 3px;
            background-color: ${getCssVar('--text-primary')};
            border-radius: 5px;
            margin: 5px 0;
            transition: 0.3s ease;
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
        
        /* Media Query para móvil */
        @media (max-width: 768px) {
             .hamburger {
                 display: block;
             }
            
            .nav-menu {
                position: fixed;
                left: -100%;
                top: 80px;
                flex-direction: column;
                background: ${getCssVar('--bg-surface')};
                width: 100%;
                text-align: center;
                transition: 0.3s;
                box-shadow: ${getCssVar('--shadow-md')};
                padding: ${getCssVar('--space-lg')} 0;
                height: calc(100vh - 80px); /* Ocupar el resto de la pantalla */
                overflow-y: auto;
            }
            
            .nav-menu.active {
                left: 0;
            }
            
            .nav-menu li {
                margin: ${getCssVar('--space-sm')} 0;
            }
            
            .nav-menu li a {
                 font-size: 1.2rem;
                 padding: ${getCssVar('--space-md')} 0;
                 display: block;
            }
        }
    `;

    // Inyectar estilos adicionales
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
}

// ==========================================
// INICIALIZACIÓN FINAL Y ERRORES
// ==========================================

// Manejo de visibilidad de la página para optimizar partículas
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        isAnimationRunning = false; // Pausar
    } else {
        if (window.innerWidth > 768) {
            startAnimation(); // Reanudar
        }
    }
});

// Manejo de errores globales
window.addEventListener('error', function(e) {
    console.error('Error en la página:', e.error);
    // showNotification('¡Un error ha ocurrido! Consulta la consola.', 'error');
});

// Feedback de carga
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    // Mover la notificación para que no dependa de la carga si es muy lenta
    // showNotification('¡Página cargada completamente! 🎮', 'success'); 
});

// Globalizar la función de tráiler para que sea accesible desde el HTML
window.playTrailer = playTrailer;

console.log(`
🎮 SENA Prom 2026 - Website Loaded
Desarrollado con ❤️ para el proyecto SENA
Tecnologías: HTML5, CSS3, JavaScript ES6+ (Canvas-based particles)
`);