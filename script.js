document.addEventListener('DOMContentLoaded', () => {
    // 1. SISTEMA DE PARTÍCULAS
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize); resize();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = Math.random() > 0.5 ? '#ff4d00' : '#00f2ff';
        }
        update() { this.x += this.speedX; this.y += this.speedY; if (this.x > canvas.width) this.x = 0; if (this.y > canvas.height) this.y = 0; }
        draw() { ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
    }
    for (let i = 0; i < 80; i++) particles.push(new Particle());
    function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate); }
    animate();

    // 2. DIÁLOGOS
    const dataNPC = {
        "Kai": { region: "PÁRAMO OESTE", msg: "—¿Otro viajero? Escucha, en este basurero el caos no perdona. O te mueves rápido o te vuelves parte del paisaje. Tú decides de qué lado estás." },
        "Flamius": { region: "LA GRAN FORJA", msg: "—¡Cuidado donde pisas, viajero! El metal aquí quema más que el orgullo. Si traes fuego en el alma, quédate; si no, apártate." },
        "Byte": { region: "TERMINAL DE DATOS", msg: "—Escaneando... Sujeto 'Viajero' detectado. No pareces un error del sistema, pero tampoco una actualización. Quédate quieto." },
        "Lysandra": { region: "ALBORIA LUMINIS", msg: "—La linfa susurra tu llegada, viajero. No temas a la luz de este bosque; aquí la armonía protege a los que buscan la verdad." },
        "Smull": { region: "EL REFUGIO", msg: "—¡Oh! Un viajero... eres muy grande. No pareces malo como los monstruos de las sombras. Si caminas despacio, quizás podamos ser amigos." },
        "Arvell": { region: "RUTAS DEL CIELO", msg: "—¡Ey, viajero! El viento hoy está perfecto para una carrera, aunque dudo que tus pies sigan mi ritmo. ¿Te crees capaz?" }
    };

    // 3. INTERACCIONES (Efecto 3D y Modal)
    const modal = document.getElementById('character-modal');

    document.querySelectorAll('.character-card').forEach(card => {
        // Efecto 3D al mover el mouse
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(1000px) rotateX(${y * 15}deg) rotateY(${x * 15}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });

        // Abrir Modal
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            const npc = dataNPC[id];
            document.getElementById('modal-name').innerText = id;
            document.getElementById('modal-region').innerText = npc.region;
            document.getElementById('modal-text').innerText = npc.msg;
            document.getElementById('modal-region').style.color = card.getAttribute('data-region') === 'west' ? '#ff4d00' : '#00f2ff';
            modal.style.display = 'block';
        });
    });

    document.querySelector('.close-modal').onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if(e.target == modal) modal.style.display = 'none'; };
});