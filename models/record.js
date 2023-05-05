const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({ //資料屬性
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true
  },
  userId: { // 建立User關聯，加入User資訊
    type: Schema.Types.ObjectId, // 資料型別為mongoose_id，與以下 ref 是一組設定
    ref: 'User', // 關聯User data
    index: true, // userID設定為索引搜尋項目增加讀取效能
    required: true
  },
  categoryId: { // 建立Category關聯，加入Category資訊
    type: Schema.Types.ObjectId, // 資料型別為mongoose_id，與以下 ref 是一組設定
    ref: 'Category', // 關聯Category data
    index: true, // categoryId設定為索引搜尋項目增加讀取效能
    required: true
  }
})

const Record = mongoose.model('Record', recordSchema) // Mongoose中用於創建 Model，Model名稱和 Schema
module.exports = Record
