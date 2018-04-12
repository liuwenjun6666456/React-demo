const express = require('express');
const utils=require('utility');
const Router = express.Router();
const model = require('./model');
const User=model.getModel('user');
Router.get('/list', function (req, res) {
    // User.remove({},function (err,doc) {
    //
    // })
    User.find({},function (err,doc) {
        return res.json(doc);
    });

});
Router.post('/login',function (req, res) {
    const {username,pwd}=req.body;
    User.findOne({username:username,pwd:md5Pwd(pwd)},{'pwd':0},function (err,doc) {
        if(!doc){
            return res.json({code:1,msg:'用户名或者密码错误'});
        }
        return res.json({code:0,data:doc});
    })
});
Router.post('/register',function (req, res) {
    const {username,pwd,type}=req.body;
    User.findOne({username:username},function (err,doc) {
       if(doc){
          return res.json({code:1,msg:'用户名重复'})
       }
       User.create({username,type,pwd:md5Pwd(pwd)},function (err,doc) {
           if(err){
               return res.json({code:1,msg:'保存失败'})
           }
           return res.json({code:0});
       })
    })
});
Router.get('/info', function (req, res) {
    return res.json({code: 1});
});
function md5Pwd(pwd){
    const salt='dsd@dSdsdasdsfa6478%^%^&$^$%$';//复杂一点
    return utils.md5(utils.md5(salt+pwd));
}
module.exports = Router;