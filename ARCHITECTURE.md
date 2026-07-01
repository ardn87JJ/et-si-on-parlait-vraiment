# Architecture

## Choix techniques

- React pour les composants et les transitions d’état ;
- Vite pour le développement et le build ;
- TypeScript en mode strict pour les contrats métier ;
- CSS natif pour le rendu, les animations et le responsive ;
- aucune bibliothèque d’état, de CSV, de roue ou d’animation.

Ce socle limite les dépendances tout en gardant des frontières claires pour les
évolutions futures.

## Organisation

```text
src/
  components/       composants visuels réutilisables
  config/           paramètres fonctionnels de la V1
  data/             lecture, nettoyage et validation du CSV
  domain/           types et moteur de tirage sans dépendance à React
  hooks/            orchestration de la roue et de la partie
  styles/           fondations, plateau et composants
  App.tsx            parcours accueil / partie
cartes.csv           source officielle des questions
public/assets/       ressources graphiques dérivées des fichiers officiels
```

## Flux des données

```text
cartes.csv
    ↓ import texte Vite
parseur CSV → validation → CardRepository
                              ↓
                      moteur de tirage
                     ↙               ↘
             carte du thème        Joker
                     ↘               ↙
                        état de partie
                              ↓
                       carte sur plateau
```

## Modèle métier

- `ThemeId` est une union fermée des cinq thèmes V1.
- `ConversationCard` représente une ligne validée du CSV.
- `JokerDefinition` prépare les cinq identités Joker sans figer leurs futures
  mécaniques.
- `DrawResult` distingue explicitement une carte classique d’un Joker.
- Le moteur reçoit sa source aléatoire en argument afin de rester testable.

Le dépôt CSV est le seul module autorisé à connaître le format brut du fichier.
L’interface ne manipule que des objets métier validés.

## Gestion de la partie

L’application possède deux scènes : `welcome` et `board`. Sur le plateau, une
machine d’état légère distingue `idle`, `spinning` et `card-visible`. Pendant
une rotation, les actions concurrentes sont désactivées. À l’arrêt, le thème
déterminé par l’angle déclenche exactement un tirage.

Une nouvelle carte conserve le thème courant. Une nouvelle rotation retire la
carte visible puis réactive la roue. Le dernier identifiant est exclu lorsque
le paquet le permet afin d’éviter une répétition immédiate.

## Roue

La roue est rendue en CSS pour conserver un texte net à toutes les tailles, en
reprenant les cinq couleurs de la référence officielle. Son angle final est
calculé avant l’animation : plusieurs tours complets, puis l’alignement du
centre du secteur choisi sous l’aiguille fixe. Une courbe d’accélération et de
décélération produit l’inertie.

## Jokers

La probabilité réside dans `src/config/game.ts`. Les Jokers sont indépendants
des thèmes. Leur catalogue contient un identifiant, un nom, une position dans
la planche officielle et un effet temporaire. L’ajout ultérieur des mécaniques
se fera derrière une stratégie par type de Joker, sans modifier la roue ni le
dépôt de cartes.

## Évolutivité

Les futurs packs pourront implémenter le même contrat de dépôt. Favoris,
historique et cartes personnalisées pourront se brancher sur les résultats de
tirage. Import/export et PDF resteront des adaptateurs périphériques. Aucun de
ces modules n’est implémenté en V1.

## Déploiement

GitHub Actions vérifie et construit l’application à chaque push sur `main`,
puis publie le dossier `dist` avec GitHub Pages. La base Vite et les ressources
publiques utilisent le sous-chemin `/et-si-on-parlait-vraiment/`.
