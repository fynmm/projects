const express = require('express');

const router = express.Router();

const expressJoi = require('@escook/express-joi');


const app_handle = require('../router_handler/apps');
const { select_apps_rules } = require('../schema/apps');



router.get('/apps',app_handle.getAllApps);
router.post('/updateApps',app_handle.updateApps);
router.post('/deleteApps',app_handle.deleteApps);
router.post('/addApps',app_handle.addApps);
router.get('/getAppById',expressJoi(select_apps_rules),app_handle.getAppById);


module.exports = router;