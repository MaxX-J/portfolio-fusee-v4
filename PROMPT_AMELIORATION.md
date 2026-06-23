# Prompt d'amélioration — Portfolio "fusée" (à coller dans Antigravity, Gemini 3.1 Pro / High)

> Travaille dans CE projet existant (`index.html`, `css/style.css`, `js/main.js`, `assets/`).
> **RÈGLE D'OR : ne touche pas au contenu textuel ni à la structure des sections** (les 5 compétences, AC/CE, traces avant/après, analyses, badges intra↔extra doivent rester intacts — c'est un livrable évalué). Tu n'améliores QUE le visuel, les animations et l'interactivité. Réutilise les classes existantes (`.rocket-container`, `.rocket-img`, `.exhaust-flames`, `.stars-bg`, `.gauge-fill`, `.stop`, `.skill-section`, `.trace.card`, `.content`). Garde le fallback `prefers-reduced-motion` et le responsive mobile.

## OBJECTIF
Transforme ce site en expérience spatiale **"vraiment waouh"** : une fusée vivante qui décolle, un ciel qui bouge et respire, et des interactions à découvrir. Inspiration : une intro de jeu vidéo / un site primé Awwwards, mais qui reste lisible et rapide.

## 1. LE CIEL QUI BOUGE (priorité n°1)
Remplace le simple fond qui glisse par un **vrai décor spatial animé**, idéalement sur un `<canvas>` plein écran en `position:fixed` derrière le contenu (`requestAnimationFrame`) :
- **Champ d'étoiles multi-couches (parallaxe de profondeur)** : 3 couches d'étoiles à vitesses différentes selon le scroll, avec un **scintillement** (twinkle) doux et aléatoire.
- **Dégradé de ciel piloté par l'altitude (le scroll)** : sol/horizon chaud en bas → bleu jour → crépuscule violet → **espace noir profond** en haut. Transition continue et fluide.
- **Nébuleuses** : 2-3 nuages colorés flous (blobs en `filter:blur`) qui dérivent très lentement, teintés avec les couleurs des compétences.
- **Étoiles filantes** occasionnelles (toutes les ~8-15 s, trajectoire + traînée).
- En atteignant les sections hautes, fais **passer une planète / une lune** lentement en arrière-plan (parallaxe lente).
- Le **curseur** laisse une fine **traînée lumineuse** (comète) qui suit la souris (desktop only).

## 2. LA FUSÉE VIVANTE (priorité n°1)
- Donne-lui de la vie : **léger flottement permanent** (idle hover/wobble en boucle) même à l'arrêt.
- **Inclinaison dynamique** selon la vitesse de scroll (penche un peu quand on descend vite, se redresse à l'arrêt).
- **Réacteur animé** : flamme qui vacille (dégradé bleu→orange→jaune) + **système de particules** (étincelles/fumée) qui s'échappe et **laisse une traînée** derrière la fusée pendant la montée.
- Au tout début (hero), une **mini-séquence de décollage** : compte à rebours visuel court ou bouffée de fumée + secousse, puis la fusée s'élance.
- Si tu peux, remplace `rocket.svg` par un **SVG plus détaillé** (hublot, ailerons, reflets) — sinon embellis l'existant en CSS.

## 3. INTERACTIONS À DÉCOUVRIR (sois créatif)
Ajoute des éléments cliquables/explorables, mais discrets et élégants :
- **Cartes de trace "flip"** : au survol/clic, la card se retourne (3D) et révèle au dos 2-3 **infos clés** (ex. KULT : "SUS ≈ 72/100", "10 testeurs", "DEEP" ; Steam : "API IGDB & Steam", "OAuth", "temps réel"). Invente des puces courtes cohérentes avec le texte déjà présent — **n'invente aucune fausse donnée**, reste fidèle au contenu.
- **Hublots / satellites cliquables** : près de chaque section, un petit élément flottant (satellite, planète, hublot) qui, au clic, ouvre une **bulle** avec une mini-info ou une citation de ma progression (le "mot de progression" de la section, animé).
- **Constellation interactive** dans le hero : quelques étoiles reliées qui, au survol, tracent une ligne et affichent "5 compétences".
- **Easter egg** : un clic sur la fusée déclenche un **"boost"** (accélération + flash de particules + petit son optionnel) — amusant, sans casser la navigation. Bonus : un mini Konami code qui fait apparaître une pluie d'étoiles.
- Indique subtilement qu'on peut interagir (curseur qui change, micro-pulsation des éléments cliquables) — sans surcharger.

## 4. MICRO-ANIMATIONS & POLISH
- Apparition des sections en **stagger** (titre, puis cards, puis analyse) avec un léger translate + fade.
- La **jauge d'altitude** devient une vraie **timeline de vol** : à chaque palier, le **nom de la compétence** apparaît en fondu à côté du cran allumé.
- **Flèche de progression** animée (trait qui se dessine, ou pulsation).
- Boutons/liens avec micro-interactions (glow au survol).
- Transition de **scroll douce** ; tu peux tester un léger **scroll-snap** par section (à désactiver si ça gêne la lecture).
- Petit **bouton son** (muet par défaut) pour activer une ambiance spatiale discrète + whoosh au décollage.

## CONTRAINTES TECHNIQUES
- **Performance d'abord** : canvas + `requestAnimationFrame`, `will-change` ciblé, pas de reflow inutile. Vise 60 fps et Lighthouse > 90.
- **`prefers-reduced-motion`** : si activé → pas de parallaxe/particules, juste des fondus doux ; le site reste 100 % lisible et navigable.
- **Mobile** : version allégée (moins de particules, fusée = indicateur de progression), interactions tactiles OK.
- Reste en **HTML/CSS/JS vanilla + GSAP/ScrollTrigger** (déjà en place). Tu peux ajouter du `<canvas>`. Pas d'autre grosse dépendance.
- **Accessibilité** : contrastes AA conservés, `alt` gardés, navigation clavier OK, le son jamais en autoplay.

## MÉTHODE
1. Montre-moi d'abord **brièvement ton plan** (ce que tu changes dans chaque fichier) + l'idée visuelle.
2. Puis implémente, en **commentant** le code des animations (vitesse fusée, densité d'étoiles, fréquence des étoiles filantes) pour que je puisse régler facilement.
3. Ne casse rien du contenu existant : à la fin, vérifie que les 5 compétences et tous leurs textes sont toujours là, intacts.
