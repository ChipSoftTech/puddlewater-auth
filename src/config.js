/**
 * config: Environment variables are used for data store and secret
 */

module.exports = { secret: process.env.SECRET, database: process.env.MONGODB };
