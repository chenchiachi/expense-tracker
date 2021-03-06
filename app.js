const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const usePassport = require('./config/passport')
require('./config/mongoose')

const routes = require('./routes')
const app = express()
const PORT = process.env.PORT

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    'isEqual': function (a, b) {
      return a === b
    },
    'categoryHelper': function (categoryArray = [], selected = '') {
      let html = ''
      categoryArray.push(categoryArray.splice(categoryArray.findIndex(obj => obj.name === '其他'), 1)[0])
      for (const category of categoryArray) {
        if (category._id.toString() === selected) {
          html += `<option value="${category._id}" selected> ${category.name} </option>`
        } else {
          html += `<option value="${category._id}" > ${category.name} </option>`
        }
      }
      return html
    }
  }
}))
app.set('view engine', 'handlebars')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`The express server is running on http://localhost:${PORT}`)
})