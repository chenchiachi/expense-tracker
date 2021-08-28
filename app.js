const express = require('express')
const exphbs = require('express-handlebars')
require('./config/mongoose')

const routes = require('./routes')
const app = express()
const PORT = process.env.PORT || 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(routes)

app.listen(PORT, () => {
  console.log(`The express server is running on http://localhost:${PORT}`)
})