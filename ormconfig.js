module.exports = {
  "type": "postgres",
  "database": process.env.DATABASE_NAME,
  "host": process.env.DATABASE_HOST,
  "port": process.env.DATABASE_PORT,
  "username": process.env.DATABASE_USER,
  "password": process.env.DATABASE_PASSWORD,
  "migrations": [
    "src/database/migrations/*.ts"
  ],
  "entities": [
    "src/entities/*.ts"
  ],
  "cli": {
    "migrationsDir": "src/database/migrations"
  }
};