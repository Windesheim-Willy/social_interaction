# Social interaction

[![Build Status](https://travis-ci.org/Windesheim-Willy/social_interaction.svg?branch=master)](https://travis-ci.org/Windesheim-Willy/social_interaction)

The social interaction creates the interaction of Willy. He listens and speaks with people.

For more information, check out the wiki about the social interaction [Wiki](https://windesheim-willy.github.io/WillyWiki/Components/social_interaction.html)

## Stylesheets
The source files for the stylesheet are written in SASS. The should be compiled to CSS files what a browser can process.
Gulp compiles the SASS files to CSS files.

Compile only once the SASS file:
```
docker-compose run social_interaction npm run sass:build
```

Compile the SASS file on every file change:
```
docker-compose run social_interaction npm run sass:watch
```