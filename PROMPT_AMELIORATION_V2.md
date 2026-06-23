# Prompt V2 — Refonte en VOYAGE HORIZONTAL (Terre → Lune)
> À coller dans Antigravity, sur CE projet existant (`index.html`, `css/style.css`, `js/main.js`, `assets/`). Gemini 3.1 Pro / High.

## ⚠️ LE CONCEPT (lis bien, tu t'es trompé les fois d'avant)
Le site ne défile PLUS verticalement. Je veux un **VOYAGE SPATIAL HORIZONTAL : de la TERRE vers la LUNE**.
- La **fusée reste DROITE (verticale) et FIXE au CENTRE de l'écran**. Elle ne change pas de place.
- Quand on scrolle, c'est **tout le décor (étoiles, planètes, sections) qui défile de DROITE → GAUCHE** → sensation que la fusée avance.
- **Tout au DÉBUT** : on voit la **TERRE**, grande, sur le **bord gauche** de l'écran (on vient de la quitter). Elle dérive et sort par la gauche quand on avance.
- **Tout à la FIN** : on arrive à la **LUNE** — elle grandit jusqu'à remplir le dernier écran.
- **Écran de fin** : une belle phrase de clôture du style **« Cette année, la Lune. L'année prochaine… peut-être Mars. 🚀 »** (Mars n'apparaît PAS dans le voyage, seulement dans cette phrase comme promesse).

Schéma (le décor défile vers la gauche, la fusée est fixe au centre) :
```
[DÉBUT] 🌍 Terre → Comprendre → Concevoir → Exprimer → Développer → Entreprendre → 🌕 Lune [FIN]
                       (fusée fixe et verticale au centre ; le décor file de droite à gauche)
```

## 🚫 RÈGLE D'OR — NE TOUCHE PAS AU CONTENU
Garde **tout le texte et toute la structure** : les 5 compétences, leurs **AC/CE**, les **2 traces avant/après**, les **analyses**, les **badges intra↔extra**, les images. Tu changes UNIQUEMENT la **mise en page (horizontale)**, le **décor** et les **animations**. À la fin, vérifie que chaque texte est toujours là, intact.

## 1. SCROLL HORIZONTAL
- **GSAP + ScrollTrigger**, technique du **pin + translation horizontale** : le scroll vertical de l'utilisateur fait défiler les panneaux **horizontalement (droite → gauche)**.
- Chaque section = un **panneau plein écran (100vw)** posé côte à côte sur une grande bande horizontale.
- Ordre de DÉBUT (droite) vers FIN (gauche) : **Terre → Comprendre → Concevoir → Exprimer → Développer → Entreprendre → Lune**.
- Défilement fluide (scrub léger), petite inertie possible.

## 2. LA FUSÉE (fixe, centrée, verticale, vivante)
- `position: fixed`, **centrée**, **pointe vers le haut**. Elle **ne bouge pas** ; tout passe autour d'elle.
- **Flottement permanent** (léger bob en boucle).
- **Réacteur animé** vers le bas : flamme qui vacille (bleu→orange→jaune) + **particules** (étincelles/fumée) qui laissent une **traînée** vers la droite (puisqu'on avance vers la gauche).
- **Réaction à la vitesse de scroll** : micro-vibration quand on défile vite, retour au calme à l'arrêt.

## 3. LE DÉCOR QUI DÉFILE (priorité waouh)
Fond spatial animé sur un **`<canvas>` fixe plein écran** (`requestAnimationFrame`) :
- **Étoiles multi-couches en parallaxe horizontale** (2-3 profondeurs, vitesses différentes), avec **scintillement**.
- **TERRE au départ** : grande, partiellement visible sur le **bord gauche** au tout début ; elle s'éloigne et sort de l'écran quand on avance (nuages, bleu océan, atmosphère lumineuse).
- **LUNE à l'arrivée** : apparaît dans le dernier tiers et **grandit** jusqu'à remplir l'écran de fin (gris, cratères, terminateur lumineux).
- **Nébuleuses** colorées (blobs floutés) qui dérivent lentement, teintées des couleurs des compétences traversées.
- **Étoiles filantes** occasionnelles.
- **Ambiance qui évolue** : près de la Terre (bleuté, lumineux) → **espace noir profond** au milieu → lumière froide lunaire à l'approche de la Lune.
- **Traînée de comète** qui suit le curseur (desktop).

## 4. JAUGE = TRAJECTOIRE Terre → Lune
La jauge devient une **barre de trajectoire HORIZONTALE** (haut ou bas de l'écran) :
- Ligne **🌍 Terre ───●───●───●───●───●─── 🌕 Lune** avec **5 crans** (les 5 compétences), qui se **remplit de droite à gauche** au fil du voyage.
- Le cran de la compétence courante s'**allume dans sa couleur** et affiche son **nom** en fondu.
Couleurs : Comprendre `#C0392B` · Concevoir `#E67E22` · Exprimer `#C8961A` · Développer `#1E8449` · Entreprendre `#2C3E9E`.

## 5. PANNEAUX DE COMPÉTENCE (lisibilité !)
Chaque compétence = un panneau plein écran. Comme il y a pas mal de texte (analyse, évolution, difficulté) :
- Mets en avant **titre + AC/CE**, les **2 cards de trace (avant → après)** + la flèche de progression, puis l'**analyse** dans une zone **lisible**.
- Si le texte déborde, autorise un **léger scroll vertical INTERNE au panneau** (ou une colonne défilante), sans casser le scroll horizontal global. **La lisibilité prime sur l'effet.**
- Garde la couleur d'accent par compétence et le badge **intra↔extra** (Exprimer, Développer).

## 6. INTERACTIONS À DÉCOUVRIR (créatif, discret)
- **Cards de trace "flip" 3D** : au clic, révèlent au dos 2-3 puces clés FIDÈLES au contenu (ex. KULT : « SUS ≈ 72/100 », « 10 testeurs », « DEEP » ; Steam : « API IGDB & Steam », « OAuth », « temps réel »). **N'invente aucune fausse donnée.**
- **Hublot / satellite cliquable** près de chaque compétence : ouvre une bulle avec le **mot de progression** animé (« Écouter → Observer », etc.).
- **Easter egg** : clic sur la fusée = **boost** (accélération + flash de particules). Bonus Konami code = pluie d'étoiles.
- Signale subtilement ce qui est cliquable (curseur, micro-pulsation).

## 7. ÉCRAN DE FIN (Lune)
Dernier panneau : la **Lune** remplit l'écran, la fusée arrive, et le texte :
> « Orbite lunaire atteinte. **Cette année, la Lune. L'année prochaine… peut-être Mars.** 🚀 »
(garde un petit mot de remerciement si tu veux).

## CONTRAINTES
- **Performance** : canvas + `requestAnimationFrame`, `will-change` ciblé, 60 fps, Lighthouse > 90.
- **`prefers-reduced-motion`** : repli en **scroll vertical classique** (panneaux empilés), sans parallaxe ni particules, 100 % lisible.
- **Mobile** : le scroll horizontal pinné est pénible au doigt → sur petit écran, **bascule en vertical** (sections empilées), fusée en petit indicateur, décor étoilé léger.
- **Accessibilité** : navigation clavier (flèches gauche/droite), contrastes AA, `alt` conservés, son jamais en autoplay.
- Reste en **HTML/CSS/JS vanilla + GSAP/ScrollTrigger** ; un `<canvas>` autorisé. Pas d'autre grosse dépendance.

## MÉTHODE
1. Décris-moi d'abord ton **plan** en 5-6 lignes (scroll horizontal pinné, placement Terre/Lune, gestion du texte long, mobile).
2. Implémente en **commentant** les réglages clés (vitesse de défilement, densité d'étoiles, taille/position Terre & Lune).
3. **Vérifie à la fin** que les 5 compétences et tous leurs textes sont intacts.
