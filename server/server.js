/**
 * Created by liuwenjun on 2018/4/9.
 *  @description 服务器端
 */

// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database : 'test'
// });
// connection.connect();
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
// });


const express=require('express');
const app=express();

app.get('/',function (req,res) {
    res.send('hello world');
});

app.get('/data',function (req,res) {
    res.json({
        name:'lwj',
        age:'29'
    })
});

app.listen(8888,function () {
    console.log("node start at port 8888");
})
