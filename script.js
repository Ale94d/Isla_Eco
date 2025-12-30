:root {
    --bg-dark: #050308;
    --bg-purple: #0a0612;
    --bg-glow: #1a122b;
    --gold: #ffcc33;
    --morado: #9d7cff;
    --text: #f5f5f5;
}

* { margin:0; padding:0; box-sizing: border-box; }
html { scroll-behavior: smooth; font-size: 16px; }

body { 
    background: radial-gradient(circle, var(--bg-glow) 0%, var(--bg-purple) 60%, var(--bg-dark) 100%);
    background-attachment: fixed;
    color: var(--text);
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
}

#particles-canvas { position: fixed; top:0; left:0; z-index: -1; pointer-events: none; }

/* NAVBAR RESPONSIVA */
.navbar { position: fixed; width: 100%; z-index: 1000; background: rgba(10,6,18,0.95); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255,204,51,0.2); }
.nav-container { display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto; padding: 1rem; }
.nav-menu { display: flex; list-style: none; gap: 1.5rem; }
.nav-menu a { color: #fff; text-decoration: none; font-size: 0.9rem; font-weight: 500; }
.btn-nav { background: var(--gold); color: #000 !important; padding: 0.4rem 1rem; border-radius: 5px; font-weight: bold; }

/* SECCIONES GENERALES */
.section { padding: 5rem 1rem; }
.container { max-width: 1200px; margin: 0 auto; }
.title-center { text-align: center; color: var(--gold); font-size: 2.5rem; margin-bottom: 3rem; font-family: 'Poppins'; }

/* HERO (FLEXBOX DINÁMICO) */
.hero { min-height: 100vh; display: flex; align-items: center; padding-top: 5rem; }
.hero-container { display: flex; flex-wrap: wrap; gap: 2rem; align-items: center; justify-content: center; }
.hero-text { flex: 1; min-width: 300px; text-align: left; }
.hero-video { flex: 1; min-width: 300px; }
.hero-text h1 { font-size: 3.5rem; color: var(--gold); line-height: 1.1; }
.video-wrapper { border: 2px solid var(--gold); border-radius: 15px; overflow: hidden; box-shadow: 0 0 20px rgba(255,204,51,0.2); }
video { width: 100%; display: block; }

/* REGIONES (COLUMNAS RESPONSIVAS) */
.regiones-flex { display: flex; flex-wrap: wrap; gap: 2rem; }
.region-card { 
    flex: 1; min-width: 300px; background: rgba(26,18,43,0.7); padding: 2.5rem; 
    border-radius: 20px; border: 1px solid rgba(255,204,51,0.2); text-align: center;
}
.region-icon { font-size: 3rem; color: var(--gold); margin-bottom: 1rem; display: block; }

/* PERSONAJES (GRILLA FLEXIBLE) */
.characters-flex { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }
.char-item { 
    background: rgba(26,18,43,0.8); padding: 1.5rem; width: 140px; 
    border-radius: 15px; text-align: center; cursor: pointer; transition: 0.3s;
}
.char-item:hover { background: var(--gold); color: #000; transform: translateY(-5px); }

/* MODAL */
.modal { display: none; position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.9); z-index: 2000; align-items: center; justify-content: center; padding: 1rem; }
.modal-content { background: #1a122b; padding: 2.5rem; border-radius: 20px; border: 2px solid var(--gold); max-width: 500px; width: 100%; position: relative; text-align: center; }
.close { position: absolute; right: 1.5rem; top: 0.5rem; font-size: 2.5rem; color: var(--gold); cursor: pointer; }

/* MEDIA QUERIES (PARA MÓVILES) */
@media (max-width: 768px) {
    .nav-menu { display: none; } /* Oculta menú en móviles por ahora */
    .hero-text { text-align: center; }
    .hero-text h1 { font-size: 2.5rem; }
    .title-center { font-size: 2rem; }
    .hero-container { flex-direction: column; }
}

/* OTROS ELEMENTOS */
.btn-primary { background: var(--gold); color: #000; padding: 0.8rem 2rem; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.3s; }
.btn-primary:hover { box-shadow: 0 0 15px var(--gold); }
.tag { color: var(--morado); font-weight: bold; text-transform: uppercase; font-size: 0.75rem; }
.register-box { max-width: 500px; margin: 0 auto; background: rgba(26,18,43,0.8); padding: 3rem; border-radius: 20px; border: 1px solid var(--gold); }
.reg-form { display: flex; flex-direction: column; gap: 1rem; }
.reg-form input { padding: 0.8rem; border-radius: 5px; border: 1px solid var(--morado); background: #000; color: #fff; }
.download-card { text-align: center; background: rgba(255,204,51,0.05); border: 2px dashed var(--gold); padding: 3rem; border-radius: 20px; }
.btn-group { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }