require('ts-node/register')
require('dotenv').config()

module.exports = {
    client: 'pg',
    connection: {
        host: process.env.APP_DB_HOST || 'localhost',
        port: process.env.APP_DB_PORT || '5432',
        database: process.env.APP_DB_NAME || 'restaurants-api',
        user: process.env.APP_DB_USER || 'postgres',
        password: process.env.APP_DB_PASSWORD || 'postgres'
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex-migration',
        directory: `${__dirname}/migrations`
    },
    timezone: 'UTC'
}