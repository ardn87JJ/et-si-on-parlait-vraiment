# Contexte du projet

## Intention

« Et si on parlait vraiment ? » est un support de conversation. L’application
doit évoquer un jeu de société posé sur une table, pas une succession d’écrans.
Le plateau reste donc visible pendant toute la partie et concentre chaque
interaction.

## Principes d’expérience

1. Immersion : bois, profondeur, ombres, inertie de la roue et mouvement des
   cartes doivent suggérer des objets physiques.
2. Simplicité : une action principale est proposée à chaque étape.
3. Bienveillance : aucune mesure de performance, aucun classement et aucune
   pression temporelle.
4. Continuité : après l’accueil, la partie se déroule sur un plateau unique.
5. Accessibilité : les animations respectent la préférence système de réduction
   des mouvements, les contrôles restent utilisables au clavier et les textes
   conservent un contraste lisible.

## Parcours V1

Accueil → plateau → rotation de la roue → thème sélectionné → tirage automatique
→ discussion → nouvelle carte du même thème ou nouvelle rotation.

## Thèmes

- Grandes questions
- Faire le point
- Histoires
- Talents
- Rêves & autre possible

## Données analysées

`cartes.csv` contient 70 cartes et cinq colonnes :

- 50 cartes standard, soit 10 par thème ;
- 20 cartes premium, soit 4 par thème ;
- 14 cartes au total par thème ;
- des identifiants uniques et aucune valeur manquante.

Quatre champs `exploration` contiennent des marqueurs de séparation éditoriaux
à leur fin. Le fichier officiel reste intact ; le dépôt de données supprime ces
marqueurs en mémoire lors du chargement.

## Ressources analysées

`fonds.zip` contient dix images PNG verticales de 1224 × 2044 : un fond standard
et un fond premium pour chacun des cinq thèmes. `roue.jpeg` (1254 × 1254) fixe
la palette, les symboles, la table en bois et la disposition générale.
`joker.jpeg` (906 × 337) rassemble cinq cartes noires et dorées : Carte Libre,
Carte Futur, Carte IA, Carte Miroir et Carte Opposée.

## Contraintes

- `cartes.csv` est l’unique source officielle des questions et reste en lecture
  seule ;
- aucune question ne doit être codée dans TypeScript ;
- les textes et mécaniques définitifs des Jokers ne sont pas supposés validés ;
- l’identité graphique fournie doit être prolongée, pas remplacée ;
- les fonctionnalités inscrites à la roadmap ne font pas partie de la V1.

