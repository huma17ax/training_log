# training_log

This template should help get you started developing with Vue 3 in Vite.

## Features

- Vue 3 with TypeScript
- Vite for fast development and building
- Firebase Integration
  - Firestore Database for data storage
  - Firebase Hosting for deployment

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

1. Install dependencies:

```sh
npm install
```

2. Set up environment variables:

```sh
cp .env.example .env
```

Edit `.env` file with your Firebase configuration.

3. Initialize Firebase:

```sh
npm install -g firebase-tools
firebase login
firebase init
```

For detailed Firebase setup instructions, see [Firebase Setup Guide](docs/firebase-setup.md).

### Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Deploy to Firebase Hosting

```sh
npm run build
firebase deploy
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Documentation

- [Firebase Setup Guide](docs/firebase-setup.md) - Detailed instructions for Firebase configuration and deployment
- [Environment Variables](.env.example) - List of required environment variables

## Security

- Never commit `.env` files containing sensitive information
- Always use environment variables for Firebase configuration
- See `.gitignore` for list of files excluded from version control
