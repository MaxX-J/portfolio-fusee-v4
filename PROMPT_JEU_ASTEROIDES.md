# Prompt — Portfolio "Jeu d'exploration spatiale" (atterrissage sur astéroïdes)
> À coller dans Antigravity (Gemini 3.1 Pro / High), sur CE projet existant. C'est une **refonte de l'expérience**, pas du contenu.

## 🎯 LE CONCEPT
Un **voyage spatial interactif, de la TERRE vers la LUNE**. Entre les deux flottent **5 astéroïdes = mes 5 compétences**. Le visiteur **navigue dans l'espace**, **atterrit** sur un astéroïde d'un clic pour **lire la compétence**, puis **redécolle** vers le suivant.
- La **fusée est HORIZONTALE** (couchée, pointe dans le sens du voyage). Elle file dans l'espace, ne se redresse pas à la verticale.
- **Départ : la Terre** (à gauche). **Arrivée : la Lune** (à droite/au bout). Phrase de fin : « Cette année, la Lune. L'année prochaine… peut-être Mars. 🚀 »

## 🚫 RÈGLE D'OR — NE CHANGE PAS LE CONTENU
Réutilise **tout le texte existant** des 5 compétences (AC/CE, 2 traces avant/après, images, analyses, badges intra↔extra). Tu ne fais que **changer la façon de le présenter** (scène spatiale + fiches en overlay). À la fin, vérifie que chaque texte est toujours là, intact.

## 1. LA SCÈNE SPATIALE
- Une grande scène horizontale (canvas + DOM). Le visiteur avance avec la **molette/scroll**, les **flèches ←/→**, ou en **glissant** (drag). Sur cette trajectoire sont posés, dans l'ordre :
  **🌍 Terre → ☄️ Comprendre → ☄️ Concevoir → ☄️ Exprimer → ☄️ Développer → ☄️ Entreprendre → 🌕 Lune**.
- La **fusée reste au centre de l'écran, à l'horizontale**, avec un léger flottement et une **traînée de réacteur** derrière elle ; c'est le décor qui défile.
- Chaque **astéroïde** porte le **nom de la compétence + son code AC**, flotte/tourne doucement, et est **teinté de sa couleur**. Quand la fusée s'en approche, il **pulse** et affiche un appel à l'action **« Atterrir »**.
- Étoiles en parallaxe, nébuleuses, étoiles filantes en fond (garde/réutilise le moteur canvas existant et mes planètes réalistes).

## 2. ATTERRISSAGE → FICHE → REDÉCOLLAGE (le cœur)
- **Clic sur l'astéroïde (ou bouton « Atterrir », ou touche Entrée quand on est dessus)** → courte **animation d'atterrissage** (la caméra zoome sur l'astéroïde, la fusée se pose, petite poussière/impact) → ouverture d'une **FICHE en overlay plein écran, lisible et défilable**.
- La fiche contient **tout le contenu de la compétence** (voir §3), bien mis en page, avec la **couleur de la compétence** en accent.
- En bas de la fiche : un bouton **« Redécoller 🚀 »** → animation de décollage → retour à la scène, et la fusée repart vers l'astéroïde suivant. L'astéroïde visité est **marqué comme exploré** (coché/illuminé).
- L'overlay se ferme aussi avec **Échap**. Pas de piège : l'atterrissage est en **1 clic**, le contenu s'ouvre immédiatement.

## 3. CONTENU DE CHAQUE FICHE (réutiliser l'existant)
Pour chaque compétence, la fiche reprend, dans l'ordre :
1. **Titre + code AC + CE** (ex. « Comprendre — AC21.05 | CE1.02 »).
2. Les **2 traces côte à côte : Trace 1 (avant) → flèche de progression → Trace 2 (après)**, chacune avec son image, son contexte court et son « mot de progression ».
3. Les blocs d'analyse : **Mon analyse**, **Mon évolution**, **Ma difficulté**.
4. Le badge **intra↔extra** sur Exprimer et Développer.
(Tu peux garder les **cards "flip"** pour révéler 2-3 infos clés au dos, mais sans casser la lisibilité.)

## 4. ACCESSIBILITÉ & NAVIGATION (important — c'est noté par une prof)
- Un **menu / mini-carte** toujours visible (coin de l'écran) listant les **5 astéroïdes** : cliquer dessus **téléporte** directement à la fiche de la compétence. Personne ne doit galérer à trouver le contenu.
- **Clavier** : ←/→ pour avancer/reculer dans l'espace, **Entrée** pour atterrir, **Échap** pour redécoller, **Tab** pour parcourir les astéroïdes.
- **Barre de progression Terre → Lune** (5 crans colorés) qui se remplit selon les astéroïdes explorés.
- Tout le contenu doit être **atteignable au clavier et lisible** même sans jouer.

## 5. ASSETS À UTILISER (déjà dans le projet)
- Planètes réalistes : `assets/img/earth.png`, `assets/img/moon.png`.
- Astéroïdes (teintés par compétence) : `assets/img/asteroid-comprendre.png`, `asteroid-concevoir.png`, `asteroid-exprimer.png`, `asteroid-developper.png`, `asteroid-entreprendre.png`.
- Fusée : `assets/img/rocket.svg` (mets-la **à l'horizontale**).
- Images de traces déjà présentes (`persona-leo.png`, `code-steam.png`, etc.) à réutiliser dans les fiches.
Couleurs : Comprendre `#C0392B` · Concevoir `#E67E22` · Exprimer `#C8961A` · Développer `#1E8449` · Entreprendre `#2C3E9E`.

## 6. MOBILE & REDUCED-MOTION
- **Mobile** : la scène spatiale devient une **liste verticale d'astéroïdes** (cartes) ; un **tap** ouvre la fiche plein écran, bouton « Redécoller/Fermer ». Décor étoilé léger.
- **`prefers-reduced-motion`** : pas d'animations d'atterrissage ni de parallaxe ; on a juste la **liste des compétences** avec leurs fiches ouvrables. 100 % lisible.

## 7. TECHNIQUE
- **HTML/CSS/JS vanilla + GSAP/ScrollTrigger** (déjà en place), `<canvas>` pour le décor. Pas d'autre grosse dépendance.
- **Perf** : `requestAnimationFrame`, `will-change` ciblé, 60 fps, Lighthouse > 90.
- Garde un **son optionnel** (muet par défaut) : whoosh à l'atterrissage/décollage.

## MÉTHODE (suis-la, tu t'es trompé les fois d'avant)
1. **Décris-moi d'abord ton plan** en 6-8 lignes : comment marche la navigation dans l'espace, comment se déclenche l'atterrissage, comment est structurée la fiche en overlay, le menu d'accessibilité, le repli mobile.
2. **Attends que je valide le plan** avant de tout générer.
3. Implémente en **commentant** les réglages clés (vitesse de déplacement, distance d'atterrissage, durée des transitions).
4. **Vérifie à la fin** que les 5 compétences et tous leurs textes sont intacts et atteignables.
