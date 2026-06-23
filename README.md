# Portfolio "Fusée" - Maxens Sevilla

Ce projet est un portfolio one-page présentant mes 5 compétences du BUT MMI 2 (Développement Web) sous le thème d'une fusée qui décolle en montant dans l'espace.

## Stack Technique
- HTML5
- CSS3 (Vanilla)
- JavaScript Vanilla
- GSAP + ScrollTrigger (Animations)
- Lucide Icons (Icônes)
- Google Fonts (Outfit)

## Comment lancer le projet en local

1. Clonez ce dépôt ou téléchargez les fichiers.
2. Ouvrez le dossier `site-fusee`.
3. Lancez le fichier `index.html` dans n'importe quel navigateur moderne (Chrome, Firefox, Safari).
   - *Optionnel mais recommandé* : Utilisez une extension comme "Live Server" sur VSCode pour un meilleur confort de développement.

## Comment déployer sur GitHub Pages

1. Créez un nouveau dépôt sur votre compte GitHub (ex: `portfolio-mmi2`).
2. Uploadez tous les fichiers de ce dossier (`index.html`, le dossier `css/`, `js/`, `assets/`) sur la branche `main`.
3. Allez dans les paramètres du dépôt (Settings) > Pages.
4. Sous "Source", sélectionnez `Deploy from a branch`.
5. Sous "Branch", choisissez `main` et le dossier `/ (root)`.
6. Cliquez sur "Save". Votre site sera en ligne dans quelques minutes sous l'URL fournie par GitHub.

## Personnalisation (GSAP / Vitesse de la fusée)

Le fichier `js/main.js` contient toutes les animations.
- Pour modifier la vitesse ou le comportement de la fusée, cherchez la configuration `gsap.to('.rocket-container', {...})`.
- La valeur `y: () => -(window.innerHeight * 0.8)` indique que la fusée va monter jusqu'à 80% de la hauteur de l'écran par rapport à son point de départ.
- La fluidité est gérée par `scrub: 1`. Mettre `scrub: true` rendra le lien direct sans lissage, et augmenter le chiffre augmentera le lissage (lenteur d'inertie).

## Images 

Assurez-vous de remplacer les placeholders par vos véritables captures d'écran dans le dossier `assets/img/`. Les noms de fichiers appelés dans le HTML sont (par exemple) `persona-leo.png`, `kult-proto.png`, etc.
