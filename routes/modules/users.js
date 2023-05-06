const express = require('express')
const router = express.Router()
const passport = require('passport')

// login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// register
router.get('/register', (req, res) => {
  res.render('register')
})

// logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router