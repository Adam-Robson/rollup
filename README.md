# Rollup

## Description

This repo first contained a bare-bones example of how to create an application using Rollup, including importing a module from `node_modules` and converting it from CommonJS. It has since been converted to es modules, that together, make a simple list of tasks.

*For the otiginal starter template, see https://github.com/rollup/rollup-starter-app*

## Getting started

Clone this repository and install its dependencies:

```bash
git clone https://github.com/Adam-Robson/rollup
cd rollup
npm install
```

The `dist` directory contains the build artifact.

## Scripts

`npm run clean` will empty out the public directory, preparing it for the next build.

`npm run build` builds the application to `dist/bundle.js`, along with a sourcemap file for debugging.

## License

To be determined.
