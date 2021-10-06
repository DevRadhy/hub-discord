<h1 align="center">HubBOT</h1>

<p align="center">
  <a href="#introdução">Introduction</a> |
  <a href="#tecnologias">Technologies</a> |
  <a href="#contribuindo">Contributing</a>
</p>

## Introduction
A Discord bot for entertainment and guild management.

## Technologies
Project developed using the technologies below:

- Node.js
- Typescript
- Jest
- Docker
- Docker-compose
- TS-Node-Dev
- Node-CRON
- Discord.js

## Contributing
Before starting, read the [general community contribution guide](https://github.com/aHub-Tech/projects-template/blob/main/CONTRIBUTING.md).

You can clone the repository and install dependencies with the following commands.

Clonando repositório.
```bash
git clone https://github.com/aHub-Tech/hub-discord.git
# gh repo clone aHub-Tech/hub-discord
```

Installing dependencies.
```bash
yarn install
```

### Configuring environment variables
Before starting the project you need to set some environment variables, create a `.env` file at the root of the project, with the following variables.

```bash
# Secret token
SECRET_TOKEN=your_bot_secret_token

# Database informations
DATABASE_DB=your_database_name
DATABASE_HOST=your_database_host
DATABASE_PORT=your_database_port
DATABASE_USER=your_database_user
DATABASE_PASSWORD=your_database_password
```

To start the project you can use the following command.

```bash
yarn dev
```

Other commands can be used.

```bash
# Build the project
yarn build

# Start built project
yarn start

# Start tests
yarn test

# Use TypeORM CLI
yarn typeorm
```