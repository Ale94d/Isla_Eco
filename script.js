:root {
    --bg-dark: #050308;
    --bg-glow: #1a122b;
    --gold: #ffcc33;
    --text: #f5f5f5;
}

* { margin:0; padding:0; box-sizing: border-box; }
body { background: radial-gradient(circle, var(--bg-glow) 0%, var(--bg-dark) 100%); background-attachment: fixed; color: var(--text); font-family: 'Inter', sans-serif; overflow-x: hidden; }

.container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
.section { padding: 60px 0; }
.title-center { text-align: center; color: var(--gold); font-size: 2.2rem; margin-bottom: 40px; }

/* INICIO (HERO) RESPONSIVO */
.hero { min-height: 100vh; display: flex; align-items: center; padding-top: 100px; }
.hero-flex { display: flex; flex-wrap: wrap; align-items: center; gap: 40px; justify-content: center; }
.hero-text { flex: 1; min-width: 320px; }
.hero-text h1 { font-size: 4rem; color: var(--gold); }
.hero-video { flex: 1; min-width: 320px; max-width: 550px; }
.video-wrapper { border: 2px solid var(--gold); border-radius: 15px; overflow: hidden; box-shadow: 0 0 20px rgba(255,204,51,0.2); }
video { width: 100%; display: block; }

/* HISTORIA */
.historia-grid { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; }
.historia-card { flex: 1; min-width: 300px; background: rgba(26,18,43,0.7); padding: 30px; border-radius: 20px; border: 1px solid var(--gold); }
.gold-icon { font-size: 2.5rem; color: var(--gold); margin-bottom: 15px; }

/* REGIONES */
.regiones-flex { display: flex; flex-wrap: wrap; gap: 20px; }
.region-card { flex: 1; min-width: 300px; background: rgba(26,18,43,0.8); padding: 30px; border-radius: 20px; border: 1px solid var(--gold); text-align: center; }
.region-icon { font-size: 3rem; color: var(--gold); margin-bottom: 10px; }

/* PERSONAJES */
.characters-flex { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; }
.char-circle { cursor: pointer; text-align: center; width: 100px; }
.char-circle i { width: 80px; height: 80px; background: #000; border: 2px solid var(--gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: var(--gold); margin: 0 auto 10px; transition: 0.3s; }
.char-circle:hover i { transform: translateY(-5px); box-shadow: 0 0 15px var(--gold); }

/* CAJAS CENTRADAS */
.flex-center { display: flex; justify-content: center; }
.centered-box { background: rgba(26,18,43,0.8); border: 2px solid var(--gold); padding: 40px; border-radius: 25px; width: 100%; max-width: 850px; }

/* GRID DE DESCARGA */
.download-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 30px; align-items: center; }
.download-col-btns { display: flex; flex-direction: column; gap: 15px; }
.btn-full { width: 100%; }

/* CARRUSEL */
.carousel { position: relative; height: 280px; border-radius: 15px; overflow: hidden; border: 1px solid var(--gold); }
.carousel-item { display: none; height: 100%; }
.carousel-item.active { display: block; }
.carousel-item img { width: 100%; height: 100%; object-fit: cover; }
.carousel-btn { position: absolute; top: 50%; background: rgba(0,0,0,0.6); color: var(--gold); border: none; padding: 15px; cursor: pointer; z-index: 5; }
.next { right: 0; }

/* NAVBAR */
.navbar { position: fixed; width: 100%; z-index: 1000; background: rgba(10,6,18,0.95); border-bottom: 1px solid rgba(255,204,51,0.2); }
.nav-container { display: flex; justify-content: space-between; align-items: center; padding: 15px 5%; }
.nav-menu { display: flex; list-style: none; gap: 20px; }
.nav-menu a { color: #fff; text-decoration: none; font-size: 0.9rem; }

/* MODAL */
.modal { display: none; position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.9); z-index: 2000; align-items: center; justify-content: center; }
.modal-content { background: var(--bg-glow); border: 2px solid var(--gold); max-width: 750px; width: 90%; border-radius: 20px; overflow: hidden; position: relative; }
.modal-body { display: flex; flex-wrap: wrap; }
.modal-img-frame { flex: 1; min-width: 300px; height: 350px; background: #000; }
.modal-img-frame img { width: 100%; height: 100%; object-fit: cover; }
.modal-text { flex: 1; min-width: 300px; padding: 30px; }
.close { position: absolute; right: 20px; top: 10px; font-size: 2.5rem; color: var(--gold); cursor: pointer; z-index: 10; }

/* BOTONES Y GENERAL */
.btn-primary { background: var(--gold); color: #000; padding: 12px 25px; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.3s; }
.btn-primary:hover { transform: scale(1.05); box-shadow: 0 0 15px var(--gold); }
.tag { color: var(--gold); font-weight: bold; text-transform: uppercase; font-size: 0.8rem; }
.dialogue { font-style: italic; color: #ccc; margin-top: 15px; border-left: 2px solid var(--gold); padding-left: 10px; }
.reg-form { display: flex; flex-direction: column; gap: 15px; }
.reg-form input { padding: 12px; border-radius: 5px; background: #000; color: #fff; border: 1px solid var(--gold); }

/* RESPONSIVO MÓVIL */
@media (max-width: 768px) {
    .nav-menu { display: none; }
    .hero-text { text-align: center; }
    .download-grid { grid-template-columns: 1fr; }
    .modal-body { flex-direction: column; }
    .modal-img-frame { height: 250px; }
}