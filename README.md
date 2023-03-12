# Stars Wars API

## Installation
Requires Node.js v14+ and configure Aws access key id and secret key to run.
```sh
npm install
npx serverless dynamodb install
```

## Local run
_Para correr de manera local, levantar la tabla necesaria en dynamoDB_
```sh
npm start
cd scripts
node setupTablePlanets.js
```

## Deploy
```sh
npm run deploy
```

## Test
```sh
npm test
```