// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Category = require('../category')
const db = require('../../config/mongoose') // 呼叫mongoose裡的db

db.once('open', () => {
  let categoryData = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']
  Promise.all(categoryData.map(name => Category.create({ name })))
    .then(() => {
      console.log('done')
      process.exit()
    })
    .catch(error => console.log(error))
})