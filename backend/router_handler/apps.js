const db = require('../db/index');

exports.getAllApps = (req,res)=>{
  const sql = 'select * from apps;';
  db.query(sql,(err,results) => {
    if (err) {
      return res.output(err)
    } 
    return res.output('查询成功',0,results)
  })
}

exports.updateApps = (req,res) => {
  const params = req.body;
  const sql = 'update apps set url = ? where id = ?';
  db.query(sql,[params.url,params.id],(err,results) => {
    if (err) {
      return res.output(err)
    }
    if (results.affectedRows != 1) {
      return res.output('更新失败');
    } 
    return res.output('更新成功',0,results)
  })
}

exports.deleteApps = (req,res) => {
  const params = req.body;
  const sql = 'delete from apps where id=?';
  db.query(sql,params.id,(err,results) => {
    if (err) {
      return res.output(err)
    } 
    if (results.affectedRows != 1) {
      return res.output('删除失败');
    } 
    console.log(333,results)
    return res.output('删除成功',0,results)
  })
}

exports.addApps = (req,res) => {
  const params = req.body;
  db.query('select count(*) from apps;',(err,result) => {
        if (err) {
      return res.send({
        status: 1,
        message: err
      })
    } 
    // console.log(777,result,result[0]['count(*)'])
    params.id = result[0]['count(*)'] + 1;
    const sql = 'insert into apps set ?';
  db.query(sql,params,(err,results) => {
    if (err) {
      return res.send({
        status: 1,
        message: err
      })
    } 
    if (results.affectedRows != 1) {
      return res.send({
        status: 1,
        message: 'error'
      })
    }


    return res.send({
      status: 0,
      data: 'success',
      message:'success',
    })
  })

  })
}

exports.getAppById = function(req,res) {
  const params = req.body;
  const sql = 'select * from apps where id = ?';
  db.query(sql,params.id,(err,results) => {
    if (err) return res.output(err);
    return res.output('查询成功',0,results);
  })
}