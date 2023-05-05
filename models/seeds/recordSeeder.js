const bcrypt = require('bcryptjs')
// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record')
const User = require('../user')
const Category = require('../category')
const db = require('../../config/mongoose') // 呼叫mongoose裡的db

const SEED_USER1 = {
  name: '廣志',
  email: 'user1@example.com',
  password: '12345678'
}
const SEED_USER2 = {
  name: '小新',
  email: 'user2@example.com',
  password: '12345678'
}

// Mongoose 連線成功
db.once('open', () => {
  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER1.password, salt))
    .then(hash => User.create({ // databast建立 seeder 資料
      name: SEED_USER1.name,
      email: SEED_USER1.email,
      password: hash
    }))
    .then(async user => {
      const userId = user._id
      const categoryName = await Category.findOne({ name: '餐飲食品' })
      await Record.create({
        name: '午餐',
        amount: '200',
        userId: userId,
        categoryId: categoryName._id
      })
      console.log('done')
      process.exit()
    })
    .catch(error => console.log(error))
})
