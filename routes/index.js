//This is being done but express's instance will be only called once and will remain same in all the other files
const express = require('express');

const router = express.Router();

//added later
const homeController = require('../controllers/home_controller');
router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/account', require('./account'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));

//for an further routes, access from here
//example: router.use('/routerName',require('./routerFile));
module.exports = router;


// Using connect-flash and noty js 
// 1. isntall connect flash and app.use it after session initialisation
// 2. Make a custom middleware in config and use it as centralised middleware to send msgs as res to locals
// 3. ADd noty js CDN js and css min 
// 4. instead of making and h tag make new noti({}).show()  in ejs files
// 5. Finally send msg using req.flash('type','msg') from controllers
