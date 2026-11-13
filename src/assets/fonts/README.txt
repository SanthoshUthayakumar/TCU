Fonts (Bangers, Archivo Black, Archivo, Patrick Hand) are self-hosted through the @fontsource npm packages imported in src/main.jsx.
They are bundled into dist at build time, so no third-party font requests are made.
To use your own font files instead, drop .woff2 files here and add @font-face rules to src/styles/base/typography.css.
