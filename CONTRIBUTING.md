# Contributing to Deep Sparkle

Please feel free to open a pull request and contribute!

## Project setup
```
npm install
```

## Setup config
In the `deep-sparkle/config` directory, create a `production.json` file based on `default.json`.

```json
{
  "discord": {
    "token": "<discord bot token>"
  },
  "global": {
    "allowed": {
      "channels": [
        "<channels to restrict responses to (optional)>"
      ]
    }
  },
  "modules": {
    "translate": {
      "apiUrl": "<Watson Language Translator API URL>",
      "apiKey": "<Watson Language Translator API Key>"
    }
  }
}
```

## Run unit tests

```
npm run test:unit
```

## Run test coverage report

```
npm run test:coverage
```

## Run linter
```
npm run lint
```

## Run bot
```
npm run start
```