# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm dev
```

## Production

Build the application for production:

```bash
npm build
```

Locally preview production build:

```bash
npm preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Change of access token
by default the test access token (naRAbrD8qPXaXVASQ8Zy) is being used.
Access token can be change by url query paramater:
```bash
http://localhost:3000/?gitlabToken=someAnotherToken
```
Another options is to use env var 
```angular2html
GITLAB_TOKEN
```
