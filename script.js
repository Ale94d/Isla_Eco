<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Isla Eco | El Viajero</title>
    <link rel="icon" href="https://img.icons8.com/emoji/48/island-with-palm-tree.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <canvas id="particles-canvas"></canvas>

    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo"><i class="fas fa-sun"></i> ISLA ECO</div>
            <ul class="nav-menu">
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#historia">Historia</a></li>
                <li><a href="#regiones">Regiones</a></li>
                <li><a href="#personajes">Personajes</a></li>
                <li><a href="#registro">Registro</a></li>
                <li><a href="#descargar">Descargas</a></li>
            </ul>
        </div>
    </nav>

    <section id="inicio" class="hero">
        <div class="container hero-flex">
            <div class="hero-text">
                <h1>Isla Eco</h1>
                <p class="subtitle">El despertar de un náufrago</p>
                <p>Restaura el equilibrio entre la tecnología y la magia pura.</p>
                <button class="btn-primary" onclick="scrollToSection('descargar')">Jugar Ahora</button>
            </div>
            <div class="hero-video">
                <div class="video-wrapper">
                    <video controls poster="img/poster.jpg">
                        <source src="video/trailer.mp4" type="video/mp4">
                    </video>
                </div>
            </div>
        </div>
    </section>

    <section id="historia" class="section">
        <div class="container">
            <h2 class="title-center">Crónicas de la Isla</h2>
            <div class="historia-grid">
                <div class="historia-card">
                    <i class="fas fa-bolt gold-icon"></i>
                    <h3>El Accidente Arcano</h3>
                    <p>Una falla crítica en el núcleo fracturó la realidad, dejando rastros de poder inestable que dividieron el mundo.</p>
                </div>
                <div class="historia-card">
                    <i class="fas fa-gem gold-icon"></i>
                    <h3>Ecosistemas y Gema Nexo</h3>
                    <p>Recupera las dos mitades de la **Gema Nexo** en el Páramo y la Selva para salvar la isla.</p>
                </div>
            </div>
        </div>
    </section>

    <section id="personajes" class="section">
        <div class="container">
            <h2 class="title-center">Habitantes</h2>
            <div class="characters-flex">
                <div class="char-circle" data-id="Viajero"><i class="fas fa-user-astronaut"></i><p>Viajero</p></div>
                <div class="char-circle" data-id="Kai"><i class="fas fa-guitar"></i><p>Kai</p></div>
                <div class="char-circle" data-id="Byte"><i class="fas fa-robot"></i><p>Byte</p></div>
                <div class="char-circle" data-id="Flamius"><i class="fas fa-fire"></i><p>Flamius</p></div>
                <div class="char-circle" data-id="Lysandra"><i class="fas fa-wand-sparkles"></i><p>Lysandra</p></div>
                <div class="char-circle" data-id="Smull"><i class="fas fa-seedling"></i><p>Smull</p></div>
                <div class="char-circle" data-id="Arvell"><i class="fas fa-wind"></i><p>Arvell</p></div>
            </div>
        </div>
    </section>

    <section id="registro" class="section">
        <div class="container flex-center">
            <div class="centered-box">
                <h2 class="title-center">Registro</h2>
                <form class="reg-form">
                    <input type="text" placeholder="Usuario" required>
                    <input type="email" placeholder="Email" required>
                    <input type="password" placeholder="Contraseña" required>
                    <button type="submit" class="btn-primary">Registrarse</button>
                </form>
            </div>
        </div>
    </section>

    <section id="descargar" class="section">
        <div class="container flex-center">
            <div class="centered-box download-grid-container">
                <h2 class="title-center">Galería y Descargas</h2>
                <div class="download-grid">
                    <div class="download-col-carousel">
                        <div class="carousel">
                            <div class="carousel-inner">
                                <div class="carousel-item active"><img src="img/game1.jpg" alt="1"></div>
                                <div class="carousel-item"><img src="img/game2.jpg" alt="2"></div>
                                <div class="carousel-item"><img src="img/game3.jpg" alt="3"></div>
                            </div>
                            <button class="carousel-btn prev" onclick="moveSlide(-1)">&#10094;</button>
                            <button class="carousel-btn next" onclick="moveSlide(1)">&#10095;</button>
                        </div>
                    </div>
                    <div class="download-col-btns">
                        <p>Disponible para:</p>
                        <button class="btn-primary btn-full"><i class="fab fa-windows"></i> Windows</button>
                        <button class="btn-primary btn-full"><i class="fab fa-apple"></i> Mac OS</button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div id="modal" class="modal" style="display: none;">
        <div class="modal-content">
            <span class="close">&times;</span>
            <div class="modal-body">
                <div class="modal-img-frame"><img id="modal-char-img" src="" alt="Personaje"></div>
                <div class="modal-text">
                    <h2 id="modal-name"></h2>
                    <p id="modal-role" class="tag"></p>
                    <div id="modal-msg" class="dialogue"></div>
                </div>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>