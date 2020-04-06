const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const DB_URL = 'mongodb://localhost:27017/job'

const Schema = mongoose.Schema
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const models = {
    user: {
        'user': { type: String, require: true },
        'pwd': { type: String, require: true },
        'type': { type: String, require: true },
        // 头像
        'avatar': String,
        // 个人简介
        'desc': { type: String },
        // 职位名
        'title': { type: String },
        // boss 多出2个字段
        'company': { type: String },
        'money': { type: String },
        'headPic': String
    },
    chat: {
        'chatid': { type: String, require: true },
        'from': { type: String, require: true },
        'to': { type: String, require: true },
        'read': { type: Boolean, default: false },
        'content': { type: String, require: true, default: '' },
        'create_time': { type: Number, default: new Date().getTime() }
    }
}

for (let i in models) {
    mongoose.model(i, new Schema(models[i]))
}

module.exports = {
    getModel: function (name) {
        return mongoose.model(name)
    }
}