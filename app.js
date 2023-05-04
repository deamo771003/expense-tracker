const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
// dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const PORT = process.env.PORT

// hbs
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})











app.listen(PORT, () => {
  console.log(`app is on port ${PORT}.`)
})