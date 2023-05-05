const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({ //資料屬性
  name: {
    type: String,
    required: true
  }
})

const Category = mongoose.model('Category', categorySchema) // Mongoose中用於創建 Model，Model名稱和 Schema
module.exports = Category
