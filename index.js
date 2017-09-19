const {join} = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
const PORT = process.env.PORT || 8080
const DEV = process.env.NODE_ENV === 'development'

nunjucks.configure('views')

module.exports = express()
  .use(morgan('dev'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .set('view engine', 'html')
  .engine('html', nunjucks.render)
  .use(express.static(join(__dirname, 'public')))
  .use('*', (req, res) => res.render('layout'))
  .use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
  .listen(PORT, () => console.log(DEV ? `http://localhost:${PORT}` : ''))
