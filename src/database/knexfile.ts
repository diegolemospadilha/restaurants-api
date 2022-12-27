require('ts-node/register')
require('dotenv').config()

module.exports = {
    client: 'pg',
    connection: {
        host: process.env.APP_DB_HOST || 'babar.db.elephantsql.com',
        port: process.env.APP_DB_PORT || '5432',
        database: process.env.APP_DB_NAME || 'nimmzopn',
        user: process.env.APP_DB_USER || 'nimmzopn',
        password: process.env.APP_DB_PASSWORD || 'dpcsdWWXV6_FxjUhoCDqBeqy2-h0esr7'
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