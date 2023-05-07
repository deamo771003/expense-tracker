const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const Record = require('../../models/record')
const Category = require('../../models/category')

// new
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', async (req, res) => {
  const { name, date, category, amount } = req.body
  const categoryData = await Category.findOne({ name: category })
  const userId = req.user._id
  return await Record.create({
    name,
    date,
    categoryId: categoryData._id,
    amount,
    userId
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// edit
router.get('/:id/edit', async (req, res) => {
  const id = req.params.id
  const category = await Category.find().lean()
  return Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record, category }))
    .catch(error => console.log(error))
})

// delete
router.delete('/:id/delete', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router