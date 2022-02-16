# Contributing to Deep Sparkle

Please feel free to open a pull request and contribute!

## Project setup
```
npm install
```

## Setup env
In the root `deep-sparkle` directory, create a `.env` file based on `.env.example`.

```
CLIENT_TOKEN='<discord bot token>'
CHANNEL_ID='<channel to restrict responses to (optional)>'
TRANSLATION_API_URL='<Watson Language Translator API URL>'
TRANSLATION_API_KEY='<Watson Language Translator API Key>'
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