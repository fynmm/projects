const db = require("../db");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../jwtConfig");


exports.registerHandle = (req,res) => {
  const {username,password} = req.body;
  const searchSql = 'select * from users where username = ?';
  db.query(searchSql,username,(err,results) => {
    if (err) return res.output(err);
    if (results.length > 0) {
      return res.output('用户名已存在',0)
    } else {
      db.query('insert into users set ?', req.body,(err,results) => {
        if (err) return res.output(err);
        console.log(777,results)
        if (results.affectedRows == 1) return res.output('添加成功',0,results);
        return res.output('添加失败');
      })
    }
    
  })
}

exports.loginHandle = (req,res) => {
  const {username,password} = req.body;
  db.query('select * from users where username = ?',username,(err,results) => {
    if (err) return res.output(err);
    if (results.length != 1) return res.output('登录失败');
    const result = results[0];
    if (result.password == password) {
      const user = {username};
      const token = jwt.sign(user,jwtConfig.jwtSecretKey,{
        expiresIn: jwtConfig.expiresIn
      })
      return res.output('登录成功',0,token)
    } else {
      return res.output('账号或密码错误');
    }
  })
}

exports.getUsers = (req,res) => {
  db.query('select * from users;',(err,results) => {
    console.log(77,err)
    if (err) return res.output(err);
    return res.output('成功',0,results);
  })
}