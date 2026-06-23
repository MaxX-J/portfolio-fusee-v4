# Prompt pour Gemini (Antigravity) — Portfolio pédagogique "fusée qui monte"

> Copie tout ce qui suit dans Antigravity. C'est un brief complet : Gemini doit créer le projet de site, pas juste répondre.

---

## RÔLE
Tu es un développeur front-end et motion designer senior. Tu construis un **site web portfolio** complet, propre, performant et original.

## OBJECTIF
Crée un **site one-page à défilement vertical** qui présente mon **portfolio pédagogique de BUT MMI 2** (IUT de Béziers, parcours Développement web). Le fil conducteur visuel est une **fusée qui décolle et monte** au fur et à mesure que l'utilisateur scrolle : chaque palier d'altitude = une de mes 5 compétences. En bas = la rampe de lancement (intro) ; en haut = l'espace (conclusion).

## QUI JE SUIS
- Maxens Sevilla, étudiant BUT MMI 2, parcours Développement web, IUT de Béziers.
- Profil : développement web + un peu de design/com.

## STACK TECHNIQUE
- **HTML5 + CSS3 + JavaScript vanilla** (pas de framework lourd). Un seul projet statique, déployable sur GitHub Pages.
- Animations au scroll avec **IntersectionObserver** + une lib légère autorisée : **GSAP + ScrollTrigger** (CDN) pour l'animation de la fusée et les parallaxes.
- Police via Google Fonts. Icônes via une lib légère (ex. lucide).
- Code commenté, structuré, fichiers séparés : `index.html`, `css/style.css`, `js/main.js`, et un dossier `assets/img/` pour mes captures.

## STRUCTURE DE LA PAGE (sections, dans l'ordre)
1. **Hero / Rampe de lancement** — mon nom, "Portfolio pédagogique — BUT MMI 2", sous-titre, et la fusée posée au sol avec un léger effet de fumée. Indice "scroll pour décoller".
2. **À propos** (court) — 2-3 phrases : qui je suis, et le principe "5 compétences = 5 paliers".
3-7. **Les 5 compétences** (une section plein écran chacune, voir contenu détaillé plus bas). Chaque section a SA couleur, son code AC/CE, et **2 traces "avant → après"** reliées par une flèche de progression.
8. **Conclusion / Espace** — la fusée atteint l'orbite ; petit mot de fin + contact.

## MÉCANIQUE "FUSÉE" (le coeur du concept)
- Une **fusée en SVG** reste visible (sticky / fixée sur un côté) et **monte verticalement** proportionnellement à la progression du scroll (0 % en bas de page = au sol, 100 % = en orbite). Pilote ça avec GSAP ScrollTrigger (scrub).
- Le **fond évolue avec l'altitude** : dégradé qui passe du sol (clair/horizon) → ciel → nuit étoilée → espace noir profond. Des **étoiles** apparaissent en montant (parallaxe).
- À chaque compétence atteinte, un **"palier d'altitude"** s'illumine dans la couleur de la compétence (petite jauge/timeline verticale à côté de la fusée, avec 5 crans).
- Légère **traînée/flammes** sous la fusée pendant le scroll actif.
- Tout doit rester **fluide (60 fps)** et **désactivable** si `prefers-reduced-motion` (accessibilité) : dans ce cas, transitions douces sans parallaxe.

## DESIGN SYSTEM
- Ambiance **spatiale, sombre, premium** ; beaucoup d'espace négatif ; typographie forte pour les titres.
- **Couleur par compétence** (à utiliser pour les accents de chaque section / crans de la jauge) :
  - Comprendre → `#C0392B`
  - Concevoir → `#E67E22`
  - Exprimer → `#C8961A`
  - Développer → `#1E8449`
  - Entreprendre → `#2C3E9E`
- Pour chaque compétence : un **bloc "Trace 1 (avant)"** et un **bloc "Trace 2 (après)"** côte à côte (cards), avec entre les deux une **flèche + le mot de la progression**. Sous les deux, un court paragraphe **"Ma progression"**.
- Chaque card de trace contient : titre du projet, contexte en 1-2 lignes, et un **emplacement image** (`<img>` avec un placeholder gris + le bon nom de fichier — je remplacerai par mes captures).
- Affiche un **badge "intra ↔ extra"** sur les compétences Exprimer et Développer.

## CONTENU EXACT À INTÉGRER (texte réel, en "je")

### 1. Comprendre — couleur #C0392B
- **AC21.05** — Cartographier les expériences utilisateur (points de contact, de friction et de satisfaction, carte d'empathie) | **CE1.02** — en écoutant et observant les utilisateurs.
- **Trace 1 (avant) — Roomies** : application mobile pour colocataires. J'ai mené un questionnaire auprès de colocataires puis un persona de synthèse ("Léo"). → écoute du déclaratif. *(images : assets/img/persona-leo.png, assets/img/questionnaire-roomies.png)*
- **Trace 2 (après) — KULT** : application culturelle. Tests modérés + non modérés (10 personnes), échelles SUS (≈ 72/100) et DEEP, relevé des points de friction (agenda, navbar). → observation mesurée. *(image : assets/img/kult-proto.png)*
- **Ma progression** : je suis passé de "ce que l'utilisateur dit vouloir" (questionnaire/persona) à "ce que l'utilisateur fait vraiment" (tests mesurés). Mot-clé de la flèche : **Écouter → Observer**.

### 2. Concevoir — couleur #E67E22
- **AC22.03** — Co-construire une recommandation stratégique (en structurant un plan d'action) | **CE2.05** — en présentant de façon convaincante la réponse proposée.
- **Trace 1 (avant) — Pro'Signes (S1)** : analyse de la stratégie de com d'un organisme de formation (synergologie), puis propositions d'amélioration (identité, vidéos, témoignages). → propositions ponctuelles. *(image : assets/img/prosignes.png)*
- **Trace 2 (après) — Palma Rosa (MMI2)** : recommandation stratégique de relance d'un festival après bad buzz prix : diagnostic SWOT, cibles segmentées, plan d'action en axes (billetterie "Trust Tiering", éditorial "Road to Palmarosa", omnicanal). *(image : assets/img/palma-rosa.png)*
- **Ma progression** : de "proposer des améliorations" à "construire une stratégie structurée en plan d'action". Flèche : **Propositions → Plan stratégique**.

### 3. Exprimer — couleur #C8961A — badge "intra ↔ extra"
- **AC23.03** — Créer et décliner une identité visuelle | **CE3.01** — en veillant à la qualité esthétique des créations.
- **Trace 1 (avant, intra) — Affiche "Fête de la saucisse"** : thème et style (photo + dessin) imposés en cours. Faiblesse assumée : pas assez de recherches sur l'environnement graphique / la direction artistique. *(image : assets/img/affiche-saucisse.png)*
- **Trace 2 (après, extra) — Parution magazine de stage** : page pour Architruc & Baltaz'art (design/déco, Béziers). J'ai étudié et repris la charte de la marque (orange corail, lettering vertical, logo, univers épuré). *(image : assets/img/parution-architruc.png)*
- **Ma progression** : d'une esthétique intuitive ("faire joli") à une direction artistique documentée et fidèle à une identité de marque. Flèche : **Faire joli → Porter une identité**.

### 4. Développer — couleur #1E8449 — badge "intra ↔ extra"
- **AC24.02 → AC24.03** — Back office puis interactions riches / API | **CE4.03** — en produisant du code fonctionnel, sobre et réutilisable. **Bonus AC24.05** (référencement + perfs) | CE4.01.
- **Trace 1 (avant) — Planet Brick (S1)** : site communautaire LEGO en PHP/MySQL, rendu serveur, données figées. *(image : assets/img/code-planetbrick.png)*
- **Trace 2 (après) — Steam Tracker (S3)** : tracker de jeux en Node.js/Express, async/await, authentification OAuth, données en temps réel (APIs IGDB & Steam), architecture client-serveur découplée. *(image : assets/img/code-steam.png)*
- **Bonus SEO (intra → extra)** : exo de référencement rédactionnel en cours (intra) → SEO technique complet sur le site de stage Architruc (title/meta/canonical, robots.txt, sitemap.xml, Open Graph, WebP) (extra). *(images : assets/img/seo-exo.png, assets/img/seo-archi.png)*
- **Ma progression** : du rendu serveur figé à une API temps réel découplée, avec un code plus sobre et réutilisable. Flèche : **Rendu serveur → API temps réel**.

### 5. Entreprendre — couleur #2C3E9E
- **AC25.04** — Collaborer au sein des organisations | **CE5.02** — en favorisant la collaboration entre les parties prenantes. **Bonus AC25.01** — gérer un projet avec une méthode agile.
- **Trace 1 (avant) — TPA2 / Béziers Urban Trail** : projet de groupe (gestion classique). J'ai pris en charge le budget et les devis. *(image : assets/img/tpa2-budget.png)*
- **Trace 2 (après) — Croq'Berry / Pop's** : projet géré en Scrum (rôles PO/SM/équipe dev, board Jira backlog/kanban/burndown, analyse de risques ROAM, 3 sprints avec pivot). *(image : assets/img/croqberry.png)*
- **Ma progression** : d'une collaboration informelle à une collaboration structurée et agile (rituels, board partagé, feedback). Flèche : **Informel → Agile**.

## RESPONSIVE, ACCESSIBILITÉ, PERFS
- Mobile-first ; sur mobile, la fusée peut devenir un petit indicateur de progression en haut. Les cards avant/après passent en pile verticale.
- `prefers-reduced-motion` respecté. Contrastes AA. Images en `loading="lazy"`, attributs `alt` descriptifs. Navigation clavier OK.
- Pas de dépendance superflue ; score Lighthouse visé > 90.

## LIVRABLES
- L'arborescence complète du projet + tous les fichiers (`index.html`, `css/style.css`, `js/main.js`, placeholders dans `assets/img/`).
- Un `README.md` court : comment lancer en local et déployer sur GitHub Pages.
- Mets des **commentaires** clairs dans le JS de la fusée pour que je puisse régler la vitesse/les seuils.

## CONSIGNES DE QUALITÉ
- Tout le texte en français, à la 1re personne ("je").
- Garde le contexte de chaque projet très court (1-2 lignes) ; ce sont les images + la progression qui prouvent.
- Vise un rendu "wow" mais sobre et lisible — pas de surcharge d'effets.
- Commence par me proposer l'arborescence et un aperçu du design, puis génère le code complet.
