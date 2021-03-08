//This is being done but express's instance will be only called once and will remain same in all the other files
const express=require('express');

const router= express.Router();

//added later
const homeController=require('../controllers/home_controller');
router.get('/',homeController.home);

module.exports=router;