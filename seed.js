const {Client} = require('pg')
const DB = process.env.DATABASE_URL || 'postgres://localhost:5432/codys-clubhouse'

const client = new Client(DB)
client.connect()

client.query(`
  CREATE TABLE invites(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    party VARCHAR(255) NOT NULL,
    going BOOLEAN NOT NULL,
    message TEXT
  )
`, (err, _) => {
  if (err) console.error(err)
  else console.log('success!')
  client.end()
})
