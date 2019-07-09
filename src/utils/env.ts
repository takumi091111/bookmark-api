const { DB_HOST, DB_PORT, DB_USER, DB_PW, DB_NAME, EXPRESS_PORT } = process.env

let _DB_PORT: number
if (DB_PORT) {
  _DB_PORT = parseInt(DB_PORT, 10) || 3306
}

let _EXPRESS_PORT: number
if (EXPRESS_PORT) {
  _EXPRESS_PORT = parseInt(EXPRESS_PORT, 10) || 4000
}

export {
  DB_HOST,
  _DB_PORT as DB_PORT,
  DB_USER,
  DB_PW,
  DB_NAME,
  _EXPRESS_PORT as EXPRESS_PORT
}
