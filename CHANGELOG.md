# Changelog

Toutes les modifications importantes du projet sont consignées ici.

## [Non publié]

### Ajouté

- Analyse initiale des données et des ressources graphiques officielles.
- Documentation du contexte, de l’architecture et du périmètre produit.
- Règles de contribution et modèle de tâche.
- Socle React 19, Vite 7 et TypeScript strict.
- Écran d’accueil immersif et plateau de jeu mobile-first.
- Roue interactive à cinq thèmes avec inertie et aiguille fixe.
- Chargement, nettoyage et validation de `cartes.csv`.
- Moteur de tirage par thème avec exclusion de la dernière carte.
- Probabilité configurable et catalogue préparatoire des cinq Jokers.
- Apparition animée des cartes et actions de poursuite de la partie.
- Ressources WebP optimisées à partir des fonds et de la planche Joker.
- Déploiement automatique de la branche `main` vers GitHub Pages.

### Corrigé

- Chemins Vite et ressources graphiques compatibles avec le sous-chemin GitHub
  Pages `/et-si-on-parlait-vraiment/`.

### Vérifié

- Validation TypeScript.
- Build de production Vite.
- Démarrage du serveur de prévisualisation.
- Accessibilité HTTP des quinze ressources graphiques dérivées.
- Build de production vérifié avec le chemin GitHub Pages.
