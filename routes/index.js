const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const users = require('./modules/users')
const records = require('./modules/records')
const { authenticator } = require('../middleware/auth')
const auth = require('./modules/auth')

router.use('/records', authenticator, records)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router