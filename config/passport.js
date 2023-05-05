const passport = require('passport')
const localStrategy = require('passport').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = app => {
  // 初始化passport
  app.use(passport.initialize())
  app.use(passport.session)

  // 設定登入策略
  passport.use(new localStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered!' })
        }
        // bcrypt朔回比對功能(使用者輸入的值, session裡的值)回傳布林值
        return bcrypt.compare(password, user.password)
          .then(isMath => {
            if (!isMath) {
              return done(null, false, { message: 'Email or password incorrect!' })
            }
            return done(null, user)
          })
      })
      .catch(err => done(err, false))
  }))

  // 序列化 database 找物件 並把id存入session
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // 反序列化 根據session裡的id從資料庫找物件
  passport.deserializeUser((id, done) => {
    User.finById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}