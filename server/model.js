const mongoose = require('mongoose');

const DB_URL = 'mongodb://127.0.0.1:27017/react_demo_db';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function () {
    console.log('mongo connect success');
})

const models = {
    user: {
        'username': {type: String, require: true},//用户名
        'pwd': {type: String, require: true},//密码
        'type': {type: String, require: true},//类型
        'avatar': {type: String},//头像
        'desc': {type: String},
        'title': {type: String},
        'company':{type: String},
        'money':{type: String},
    },
    chat: {}
}

for (let m in models) {
    mongoose.model(m,new mongoose.Schema(models[m]));
}

module.exports={
    getModel:function (name) {
        return mongoose.model(name);
    }
}