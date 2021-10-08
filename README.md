<h1 align="center">HubBOT</h1>

<p align="center">
  <a href="#introduction">Introduction</a> |
  <a href="#technologies">Technologies</a> |
  <a href="#contributing">Contributing</a>
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

## Starting
You can clone the repository and install dependencies with the following commands.

Cloning repository.
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

## Contributing
If you want to contribute for this project read the [general community contributing guide](./CONTRIBUTING.md).

After you are done reading the [general community contributing guide](./CONTRIBUTING.md) we also would recommend you to read the [Starting section](#starting), then you would know the basics for contributing to this project.

### Commands
It may be useful to use some commands during development, in which case you can use the following commands below:

> if you use `npm` you can use the commands with `npm run <command>` or if you use `yarn` `run` is not necessary, for exemple.
>
> ```bash
> yarn dev
> # or npm run dev
> ```

`build` - Build project.

`start` - Run built project.

`test` - Run tests.

`dev` - Start project with development code.

`lint` - Start ESLint checker.

`typeorm` - Use the TypeORM CLI.

## License
This project is under the [GNU General Public License v3.0](./LICENSE). You can read more about it [here](./LICENSE).