// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Category = require('../category')
const db = require('../../config/mongoose') // 呼叫mongoose裡的db

db.once('open', () => {
  let categoryData = [
    {
      name: '家居物業',
      icon: 'fa-solid fa-house fa-2xl'
    },
    {
      name: '交通出行',
      icon: 'fa-solid fa-van-shuttle fa-2xl'
    },
    {
      name: '休閒娛樂',
      icon: 'fa-solid fa-face-grin-beam fa-2xl'
    },
    {
      name: '餐飲食品',
      icon: 'fa-solid fa-utensils fa-2xl'
    },
    {
      name: '其他',
      icon: 'fa-solid fa-pen fa-2xl'
    },
  ]

  Promise.all(categoryData.map(data => Category.create(data)))
    .then(() => {
      console.log('done')
      process.exit()
    })
    .catch(error => console.log(error))
})