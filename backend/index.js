const express = require('express');

const app = express();
app.all('*',function(req,res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods','GET,POST');
  req.next();
})
const appRouter = require('./router/apps');
const loginRouter = require('./router/login');
const uploadRouter = require('./router/upload');

const path = require('path')


const db = require('./db/index');
const joi = require('joi');
// app.use(cors);
app.use(express.static(path.join(__dirname,'image')));
// 前端入参 application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}))

app.use((err,req,res,next) => {
  if (err instanceof joi.ValidationError) return res.output(err);
  res.output(err);
  next()
})

const {expressjwt} = require('express-jwt');
const jwtConfig = require('./jwtConfig');



app.use(
  expressjwt({
    secret: jwtConfig.jwtSecretKey,
    algorithms: ["HS256"],
  }).unless({
    path: [/^\/api/,/^\/image/],
  })
)

// 前端入参 application/json
// app.use(express.json())

app.use((req,res,next) => {
  res.output = function(err,status = 1, data) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
      data
    })
  }
  next();
})

app.use(appRouter);
app.use('/api',loginRouter);
app.use(uploadRouter);





app.listen(3007,()=>{
  console.log('server is running at http://127.0.0.1:3007');
})