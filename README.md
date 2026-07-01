# Et si on parlait vraiment ?

Adaptation numérique mobile-first d’un jeu de cartes de discussion. Il n’y a ni
score, ni chronomètre, ni victoire : la roue choisit un thème, une carte apparaît
sur le plateau et sert de point de départ à une conversation.

## Démarrage

Prérequis : Node.js 20 ou plus récent.

```bash
npm install
npm run dev
```

Commandes disponibles :

- `npm run dev` : serveur de développement Vite ;
- `npm run build` : vérification TypeScript et build de production ;
- `npm run lint` : analyse statique du code ;
- `npm run preview` : prévisualisation du build.

## Sources officielles

- `cartes.csv` : source de données en lecture seule, chargée directement par
  l’application ;
- `fonds.zip` : archive originale des fonds standard et premium ;
- `roue.jpeg` : référence visuelle officielle du plateau et de la roue ;
- `joker.jpeg` : planche visuelle officielle des cinq Jokers.

Pour remplacer les questions, conserver les colonnes `id`, `type`, `theme`,
`question` et `exploration`, puis remplacer `cartes.csv`. Aucun changement de
code n’est requis.

## Périmètre V1

La V1 comprend l’accueil, le plateau unique, une roue physique animée, le
tirage automatique par thème, l’apparition animée des cartes, une probabilité
configurable de Joker et les actions « Nouvelle carte » et « Relancer la roue ».

Les fonctionnalités futures sont recensées dans [ROADMAP.md](./ROADMAP.md).
L’organisation technique est décrite dans [ARCHITECTURE.md](./ARCHITECTURE.md).

## Mise en ligne

Chaque push sur `main` déclenche le workflow GitHub Pages. Après un déploiement
réussi, l’application est disponible à l’adresse :

<https://ardn87jj.github.io/et-si-on-parlait-vraiment/>

Le dépôt doit utiliser `Settings` → `Pages` → `GitHub Actions` comme source de
publication.
