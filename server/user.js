const express = require('express');
const utils = require('utility');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const _filter = {'pwd': 0, '__v': 0};//过滤数据库多余字段
Router.get('/list', function (req, res) {
    // User.remove({},function (err,doc) {
    //
    // })
    User.find({}, function (err, doc) {
        return res.json(doc);
    });

});
Router.post('/login', function (req, res) {
    const {username, pwd} = req.body;
    User.findOne({username: username, pwd: md5Pwd(pwd)}, _filter, function (err, doc) {
        if (!doc) {
            return res.json({code: 1, msg: '用户名或者密码错误'});
        }
        res.cookie('userid', doc._id);
        return res.json({code: 0, data: doc});
    })
});
Router.post('/register', function (req, res) {
    const {username, pwd, type} = req.body;
    User.findOne({username: username}, function (err, doc) {
        if (doc) {
            return res.json({code: 1, msg: '用户名重复'})
        }
        const userModel = new User({username, type, pwd: md5Pwd(pwd)});
        userModel.save(function (err, doc) {
            if (err) {
                return res.json({code: 1, msg: '保存失败'})
            }
            const {username,type,_id}=doc;
            res.cookie('userid',_id);
            return res.json({code: 0,data:{username,type,_id}});
        })

    })
});
Router.get('/info', function (req, res) {
    const {userid} = req.cookies;
    if (!userid) {
        return res.json({code: 1});
    }
    User.findOne({_id: userid}, _filter, function (err, doc) {
        if (err) {
            return res.json({code: 1, msg: '后端出错了'});
        }
        if (doc) {
            return res.json({code: 0, data: doc});
        }

    })

});

function md5Pwd(pwd) {
    const salt = 'dsd@dSdsdasdsfa6478%^%^&$^$%$';//复杂一点
    return utils.md5(utils.md5(salt + pwd));
}

module.exports = Router;