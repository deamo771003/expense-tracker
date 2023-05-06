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
const session = require('express-session')
// const bcrypt = require('bcryptjs')
const usePassport = require('./config/passport')
const flash = require('connect-flash')

// hbs
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// express-session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// connect-flash
app.use(flash())

// passport
usePassport(app)

// body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// method-override
app.use(methodOverride('_method'))

// 導入public內的.css
app.use(express.static('public'))

// middleware 檢查驗證、connect-flash
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated() // 把 req.isAuthenticated() 回傳的布林值，交接給 res 使用
  res.locals.user = req.user // 把user給res使用
  res.locals.success_msg = req.flash('success_msg') // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg') // 設定 warning_msg 訊息
  next()
})


// router
app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})