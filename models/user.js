const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({ //資料屬性
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('User', userSchema) // Mongoose中用於創建 Model，Model名稱和 Schema
module.exports = User
