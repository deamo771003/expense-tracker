const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')

// login
router.get('/login', (req, res) => {
  res.render('login', { messages: req.flash('error') })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

// register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ message: 'email、password、confirmPassword 必填' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'password 與 confirmPassword 不符' })
  }
  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: '這個 email 已經註冊過了。' })
        return res.render('register', { errors, name, email, password, confirmPassword })
      }
    })
  return bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => User.create({
      name,
      email,
      password: hash
    }))
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router