# Server

## Available Scripts

In this project, a variety of scripts are available in the `package.json` file to help with different aspects of the development process. Here's a brief explanation of each script:

## `start`

The `start` script uses `ts-node` to execute your TypeScript application without having to compile it first. It's great for development, but not recommended for production environments because it adds some overhead.

```bash
npm run start
```

## `build`

The `build` script uses the TypeScript compiler (`tsc`) to compile your TypeScript files into JavaScript. This script should be run before you deploy your application to a production environment.

```bash
npm run build
```

## `serve`

The `serve` script is used to start the server from the JavaScript files in the `dist` directory. You should run the `build` script first to ensure that the JavaScript files are up to date.

```bash
npm run serve
```

## `dev`

The `dev` script uses `concurrently` to run two processes at the same time in development mode. It watches for changes in your TypeScript files and recompiles them, and also uses `nodemon` to restart your server whenever JavaScript files in the `dist` directory change.

```bash
npm run dev
```

## `test`

The `test` script uses `jest` to run unit tests. Jest is a popular testing library for JavaScript and TypeScript.

```bash
npm run test
```

## `lint`

The `lint` script uses ESLint to analyze your code and find potential errors. By default, it checks all TypeScript files in the `src` and `tests` directories.

```bash
npm run lint
```

## `lint:fix`

The `lint:fix` script runs the `lint` script and automatically fixes any problems that ESLint can correct.

```bash
npm run lint:fix
```

## `prettier`

The `prettier` script uses Prettier to check if your code formatting conforms to the project's style. It checks all TypeScript files in the `src` and `tests` directories.

```bash
npm run prettier
```

## `prettier:fix`

The `prettier:fix` script runs the `prettier` script and automatically formats your code to conform to the project's style.

```bash
npm run prettier:fix
```

## `format`

The `format` script runs both the `prettier:fix` and `lint:fix` scripts to automatically format your code and fix any linting errors. This script can be very helpful before committing changes to ensure that your code follows the project's style guidelines and has no linting errors.

```bash
npm run format
```

Please note that in order to run these scripts, you need to have the necessary dependencies installed in your project. If you cloned this repository and haven't done so already, run `npm install` in your project directory to install the required dependencies.