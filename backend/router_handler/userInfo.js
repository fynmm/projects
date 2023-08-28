const db = require("../db")

exports.upload = (req,res) => {
  console.log(333,req.body)
  const {id} = req.body;
 const destination = req.file.destination.split('/')[1]
 const url = `http://127.0.0.1:3007/${destination}/${req.file.originalname}`;
 db.query('update users set avatar=? where id = ?',[url,id],(err, results) => {
  if (err) return res.output(err);
  if (results.affectedRows == 1) {
    return res.output('更新成功',0);
  } else {
    return res.output('更新错误');
  }
  
 })
}

