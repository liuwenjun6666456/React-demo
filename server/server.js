/**
 * Created by liuwenjun on 2018/4/9.
 *  @description 服务器端
 */
const express = require('express');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const userRouter=require('./user');
const app = express();
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter);

app.listen(8888, function () {
    console.log("node start at port 8888");
})
