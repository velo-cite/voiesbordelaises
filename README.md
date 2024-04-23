# Observatoire

## Qu'est-ce que l'observatoire ?
Il s'agit d'une plateforme web permettant la visualisation d'un projet de réseau cyclable structurant.

Ce projet est un fork et adapatation de la plateforme [Cyclopolis](https://github.com/benoitdemaegdt/voieslyonnaises) et a pour objectif principal de suivre le développement du projet du "ReVE" de Bordeaux Métropole.
Le projet initial est entièrement développée par des bénévoles de l'association lyonnaise "La Ville à Vélo".
Ce dépot sera principalement mis à jour par des bénévoles de l'association "Vélo-Cité Bordeaux Métropole"

On y retrouve en particulier :
- une carte intéractive permettant de visualiser les tracés des voies cyclables.
- une page détaillée sur chacune des voies cyclables.

## Participer à la modification des cartes / Éditer un GeoJson

Modifier la ligne /content/reve/*.json avec [placemark](https://play.placemark.io/) puis réexporter le fichier sur le projet.

## Est-il possible de réutiliser Cyclopolis ou l'observatoire de Vélo-Cité pour un autre projet ?

Oui !

Vous êtes une association, ou un particulier ? Il y a un projet de réseau cyclable structurant dans votre ville et vous souhaitez suivre son développement ? Vous pouvez tout à fait réutiliser l'un des deux pour votre projet.

Cyclopolis et l'observatoire : 
- sont open source, le code est entièrement disponible sur Github.
- ont une licence ouverte, vous avez donc le droit de réutiliser le code pour votre projet.
- sont gratuits a opérer (pas de base de données, pas de serveur dédié, pas de coût de maintenance).

## Aide aux contributeurs/trices non développeurs/euses

le `status` de chaque tronçon peut prendre les valeurs définies [ici](types/index.ts#L13)

le `type` de chaque tronçon peut prendre les valeurs définies [ici](types/index.ts#L1)


## Quelques détails techniques
Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

## Setup

Make sure to install the dependencies:

```bash
npm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.
