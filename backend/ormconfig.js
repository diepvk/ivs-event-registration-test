module.exports = {
  "type": "postgres",
  "host": process.env.DATABASE_HOST,
  "port": process.env.DATABASE_PORT,
  "username": process.env.DATABASE_USER,
  "password": process.env.DATABASE_PASSWORD,
  "database": process.env.DATABASE_NAME,
  "entities": ["entity/*.js"],
  "migrations": [
    "migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "migrations"
  }
}
