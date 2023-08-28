const express = require('express');
const router = express.Router();
const multer = require('multer');
const userinfo = require('../router_handler/userInfo')
const storage = multer.diskStorage({
  destination: function(req,file,cb) {
    cb(null,'image/avatar')
  },
  filename: function(req,file,cb) {
    cb(null,file.originalname);
  }
})
const upload = multer({storage})
router.post('/upload',upload.single('file'),userinfo.upload)


module.exports = router;