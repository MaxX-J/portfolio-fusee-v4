/**
 * main.js - Portfolio "Fusée" Maxens Sevilla (V4 "Astéroïdes & Atterrissage")
 */

document.addEventListener('DOMContentLoaded', () => {

    gsap.registerPlugin(ScrollTrigger);

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth <= 768;

    const spaceTrack = document.getElementById('space-track');
    const nodes = document.querySelectorAll('.celestial-body');
    const mapNodes = document.querySelectorAll('.map-node');
    const rocket = document.querySelector('.rocket-wrapper');
    const sfx = document.getElementById('sfx-whoosh');

    // Configuration de la scène
    const NODE_SPACING = window.innerWidth * 1.5; // Distance entre chaque astéroïde
    let totalTrackWidth = 0;

    // ==========================================
    // 1. MISE EN PLACE DE LA SCÈNE 3D/2D
    // ==========================================

    if (!isMobile && !isReducedMotion) {
        const nodePositions = [];
        // Positionnement horizontal des planètes/astéroïdes sur le track
        nodes.forEach((node, index) => {
            let xPos = index * NODE_SPACING;
            
            // Rapprocher la lune (dernier élément) du dernier astéroïde
            if (index === nodes.length - 1) {
                xPos = (index - 1) * NODE_SPACING + (window.innerWidth * 0.7); 
            }
            
            nodePositions.push(xPos);
            gsap.set(node, { left: xPos, top: "50%" });
            totalTrackWidth = xPos;
        });

        // Pas de marge supplémentaire pour que la Lune soit exactement sur le bord droit
        gsap.set(spaceTrack, { width: totalTrackWidth });

        // Scroll Horizontal principal
        const horizontalTween = gsap.to(spaceTrack, {
            x: () => -(totalTrackWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: "#space-scene",
                pin: true,
                scrub: 1,
                end: () => "+=" + (totalTrackWidth),
                onUpdate: (self) => {
                    checkProximity(self.progress);
                    updateRocketFlames(self.getVelocity());
                }
            }
        });

        // Navigation Minimap (Téléportation / Scroll to)
        mapNodes.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const targetIndex = parseInt(btn.getAttribute('data-scroll-to'));
                const targetScroll = nodePositions[targetIndex];

                // On scroll la page (ScrollTrigger s'occupe de translater le track)
                // Ratio du scroll total
                const ratio = targetScroll / (totalTrackWidth - window.innerWidth);
                const scrollPos = ratio * (totalTrackWidth); // Approximatif, GSAP scrollTo plugin est mieux mais on fait simple

                window.scrollTo({
                    top: targetScroll, // Car 1px scrollY = 1px translationX via scrub:1
                    behavior: 'smooth'
                });
            });
        });

        // Navigation Clavier (Flèches gauche/droite)
        window.addEventListener('keydown', (e) => {
            // Ne pas scroller si une modale est ouverte
            if (document.querySelector('dialog[open]')) return;

            // GSAP convertit le scroll vertical en horizontal, donc on scroll verticalement
            if (e.key === 'ArrowRight') {
                window.scrollBy({ top: window.innerWidth / 2, behavior: 'smooth' });
            } else if (e.key === 'ArrowLeft') {
                window.scrollBy({ top: -window.innerWidth / 2, behavior: 'smooth' });
            }
        });

    }

    // ==========================================
    // 2. DÉTECTION DE PROXIMITÉ (Tolérante)
    // ==========================================
    function checkProximity(progress) {
        if (isMobile) return;

        // Progress va de 0 à 1.
        // x actuel du track :
        const currentX = progress * (totalTrackWidth - window.innerWidth);
        const centerScreen = currentX + (window.innerWidth / 2);

        nodes.forEach((node, index) => {
            // Seuls les astéroïdes (1 à 5) sont atterrissables
            if (index === 0 || index === nodes.length - 1) return;

            const nodeX = nodePositions[index];
            const distance = Math.abs(centerScreen - nodeX);

            // Si la fusée (centre) est à moins de 600px de l'astéroïde
            if (distance < 600) {
                node.classList.add('in-range');
            } else {
                node.classList.remove('in-range');
            }
        });
    }

    function updateRocketFlames(velocity) {
        if (!rocket) return;
        if (Math.abs(velocity) > 20) {
            rocket.classList.add('boosting');
        } else {
            rocket.classList.remove('boosting');
        }
    }


    // ==========================================
    // 3. ATTERRISSAGE & OVERLAYS (Dialogs)
    // ==========================================

    const landButtons = document.querySelectorAll('.btn-land');
    const takeoffButtons = document.querySelectorAll('.btn-takeoff');

    landButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const dialog = document.getElementById(targetId);

            if (dialog) {
                // Optionnel : Jouer un son (peut être bloqué par le navigateur si pas d'interaction préalable)
                try { sfx.currentTime = 0; sfx.play(); } catch (e) { }

                // Zoom effect sur la scène spatiale
                gsap.to('#space-track', { scale: 1.5, opacity: 0, duration: 0.5, ease: "power2.inOut" });
                gsap.to('.rocket-wrapper', { scale: 0, duration: 0.5 });

                setTimeout(() => {
                    dialog.showModal();
                    // Empêcher le scroll background
                    document.body.style.overflow = 'hidden';

                    // Forcer le scroll tout en haut de la fiche (corrige le bug de l'autofocus natif)
                    const content = dialog.querySelector('.fiche-content');
                    if (content) content.scrollTop = 0;
                    if (document.activeElement) document.activeElement.blur();
                }, 400);
            }
        });
    });

    takeoffButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const dialog = btn.closest('dialog');

            try { sfx.currentTime = 0; sfx.play(); } catch (e) { }

            dialog.close();
            document.body.style.overflow = ''; // Restore scroll

            // Marquer comme visité dans la minimap
            const targetId = dialog.id;
            const mapNode = document.querySelector(`.map-node[data-target="${targetId}"]`);
            if (mapNode) mapNode.classList.add('visited');

            // Dezoom effect retour à la scène
            gsap.to('#space-track', { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" });
            gsap.to('.rocket-wrapper', { scale: 1, duration: 0.8, ease: "back.out(1.5)" });
        });
    });

    // Fermeture via touche ECHAP native des <dialog>
    document.querySelectorAll('dialog').forEach(dialog => {
        dialog.addEventListener('close', () => {
            document.body.style.overflow = '';
            gsap.to('#space-track', { scale: 1, opacity: 1, duration: 0.5 });
            gsap.to('.rocket-wrapper', { scale: 1, duration: 0.5 });
        });
    });

    // ==========================================
    // 3.5 LIGHTBOX ET FLIP CARDS
    // ==========================================
    const images = document.querySelectorAll('.trace-img');
    images.forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation(); // Empêche le flip de la carte

            const lightbox = document.createElement('dialog');
            lightbox.className = 'lightbox-dialog';
            lightbox.innerHTML = `<img src="${img.src}" alt="${img.alt}" />`;

            lightbox.addEventListener('click', () => {
                lightbox.close();
                lightbox.remove();
            });

            document.body.appendChild(lightbox);
            lightbox.showModal();
        });
    });

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.tagName.toLowerCase() === 'img') return;
            card.classList.toggle('flipped');
        });
    });

    // Révélation au clic pour le mobile (si présent)
    if (isMobile) {
        document.querySelectorAll('.asteroid-container').forEach(container => {
            container.addEventListener('click', () => {
                const btn = container.querySelector('.btn-land');
                if (btn) btn.click();
            });
        });
    }

    // ==========================================
    // 4. MOTEUR CANVAS (Étoiles en parallaxe)
    // ==========================================

    if (!isReducedMotion) {
        const canvas = document.getElementById('spaceCanvas');
        const ctx = canvas.getContext('2d');

        let width, height;
        let stars = [];
        let shootingStars = [];

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initStars();
        }

        function initStars() {
            stars = [];
            const STAR_COUNT = isMobile ? 100 : 400;
            for (let i = 0; i < STAR_COUNT; i++) {
                stars.push({
                    x: Math.random() * width * 3, // Champ plus large
                    y: Math.random() * height,
                    r: Math.random() * 1.5,
                    baseAlpha: Math.random() * 0.5 + 0.1,
                    layer: Math.floor(Math.random() * 3) + 1,
                    twinkleSpeed: Math.random() * 0.05 + 0.01,
                    twinklePhase: Math.random() * Math.PI * 2
                });
            }
        }

        function spawnShootingStar() {
            if (Math.random() > 0.005) return;
            shootingStars.push({
                x: width + 50,
                y: Math.random() * height * 0.5,
                length: Math.random() * 80 + 20,
                speed: Math.random() * 15 + 15,
                angle: Math.PI + (Math.random() * 0.1 - 0.05), // Vers la gauche
                alpha: 1
            });
        }

        function render() {
            ctx.clearRect(0, 0, width, height);

            // On récupère le scroll global pour la parallaxe
            let scrollY = window.scrollY || 0;
            // Ratio
            let progress = totalTrackWidth > 0 ? scrollY / totalTrackWidth : 0;
            const time = Date.now() * 0.001;

            // Nébuleuses discrètes
            const gradient1 = ctx.createRadialGradient(width * 0.5, height * 0.5, 0, width * 0.5, height * 0.5, width * 0.6);
            gradient1.addColorStop(0, 'rgba(30, 40, 80, 0.05)');
            gradient1.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = gradient1;
            ctx.fillRect(0, 0, width, height);

            // Étoiles
            stars.forEach(s => {
                // Mouvement vers la gauche basé sur le scroll
                let xOffset = (progress * width * s.layer * 2);
                let drawX = s.x - xOffset;

                // Wrap around
                while (drawX < 0) drawX += width * 2;
                while (drawX > width * 2) drawX -= width * 2;

                let currentAlpha = s.baseAlpha + Math.sin(time * s.twinkleSpeed * 100 + s.twinklePhase) * 0.2;
                currentAlpha = Math.max(0, currentAlpha);

                if (drawX < width) {
                    ctx.beginPath();
                    ctx.arc(drawX, s.y, s.r, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
                    ctx.fill();
                }
            });

            // Étoiles filantes
            spawnShootingStar();
            for (let i = shootingStars.length - 1; i >= 0; i--) {
                let ss = shootingStars[i];
                ss.x += Math.cos(ss.angle) * ss.speed;
                ss.y += Math.sin(ss.angle) * ss.speed;
                ss.alpha -= 0.02;

                ctx.beginPath();
                ctx.moveTo(ss.x, ss.y);
                ctx.lineTo(ss.x - Math.cos(ss.angle) * ss.length, ss.y - Math.sin(ss.angle) * ss.length);
                ctx.strokeStyle = `rgba(255, 255, 255, ${ss.alpha})`;
                ctx.lineWidth = 2;
                ctx.stroke();

                if (ss.alpha <= 0 || ss.x < -100) {
                    shootingStars.splice(i, 1);
                }
            }

            requestAnimationFrame(render);
        }

        window.addEventListener('resize', resize);
        resize();
        render();
    }

});
