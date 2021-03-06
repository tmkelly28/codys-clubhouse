const {join} = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
const compression = require('compression')
const axios = require('axios')
const accomodations = require('./accomodations')
const {Client} = require('pg')
const PORT = process.env.PORT || 8080
const DEV = process.env.NODE_ENV === 'development'
const DB = process.env.DATABASE_URL || 'postgres://localhost:5432/codys-clubhouse'

if (process.env.NODE_ENV !== 'production') require('./env')
const MAP_URL = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_KEY}&callback=initMap`

const client = new Client(DB)
client.connect()

nunjucks.configure('views')

module.exports = express()
  .use(morgan('dev'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .set('view engine', 'html')
  .engine('html', nunjucks.render)
  .use(compression())
  .get('/google-maps', (req, res, next) => {
    axios.get(MAP_URL)
      .then(({data}) => {
        res.setHeader('Content-Type', 'application/javascript')
        res.send(data)
      })
      .catch(next)
  })
  .use(express.static(join(__dirname, 'public')))
  .get('/', (req, res) => res.render('index', {accomodations}))
  .post('/rsvp', (req, res, next) => {
    const {email, party, going, message} = req.body
    client.query(
      `INSERT INTO invites (email, party, going, message) VALUES ($1, $2, $3, $4)`,
      [email, party, going === 'yes', message],
      (err) => err ? next(err) : res.json({okay: true})
    )
  })
  .use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
  .listen(PORT, () => console.log(DEV ? `http://localhost:${PORT}` : ''))
