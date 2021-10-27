const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const usePassport = require('./config/passport')
require('./config/mongoose')

const routes = require('./routes')
const app = express()
const PORT = process.env.PORT || 3000

app.engine('handlebars', exphbs({ 
  defaultLayout: 'main',
  helpers: {'isEqual': function(a, b) {
    return a === b
  }}
}))
app.set('view engine', 'handlebars')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)

app.use((req, res, next) => {
  console.log(req.user)
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`The express server is running on http://localhost:${PORT}`)
})