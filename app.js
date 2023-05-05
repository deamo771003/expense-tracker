const express = require('express')
// dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const app = express()
const exphbs = require('express-handlebars')
const routes = require('./routes')
const PORT = process.env.PORT
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
require('./config/mongoose')


// hbs
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// method-override
app.use(methodOverride('_method'))




// router
app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})