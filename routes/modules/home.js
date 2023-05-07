const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', async (req, res) => {
  const userId = req.user._id
  let total = 0
  // all record data
  try {
    const records = await Record.find({ userId: userId })
      .populate('categoryId')
      .lean()
      .sort({ _id: 'asc' })

    records.map(record => {
      total += record.amount
    })

    res.render('index', { records, total })
  } catch (err) {
    console.log(err)
  }
})

router.get('/sort', async (req, res) => {
  const userId = req.user._id
  let total = 0
  // 只顯示sortSelect的categoryId商品:
  // 抓出sortSelect
  const sortSelect = req.query.sort

  try {
    // 抓出與抓出sortSelect相同的category.name
    const category = await Category.findOne({ name: sortSelect }).lean()

    // 抓出與上面 _id 相同的 Record.categoryId 
    const records = await Record.find({ userId: userId, categoryId: category._id })
      .populate('categoryId')
      .lean()
      .sort({ _id: 'asc' })

    records.map(record => {
      total += record.amount
    })

    // 顯示 Record 該 categoryId 的所有資訊
    res.render('index', { records, sortSelect, total })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router