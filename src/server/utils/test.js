import Knex from 'knex'

const knex = Knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/db/migrations'
  },
  pool: {
    min: 1,
    max: 1
  },
  seeds: {
    directory: './src/db/fixtures'
  },
  useNullAsDefault: true
})

export const testHandler = async (handler, options = {}) => {

  let trx = null

  knex.transaction(tx => {
    trx = tx
  }).catch(() => {})

  const req = {
    params: {},
    body: {},
    query: {},
    ...options,
    trx
  }

  const res = {
    _status: null,
    _json: null,
    status: function(status) {
      if(!status) return this._status
      this._status = status
      return this
    },
    json: function(json) {
      if(!json) return this._json
      this._json = json
      return this
    }
  }

  await handler(req, res)

  trx.rollback()

  return res

}