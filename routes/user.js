'use strict'

const express = require('express');
const userController = require('../controllers/user')
const service = require('../services/email')




// Init Var
let router = express.Router();
 
let  auth = require('../middlewares/auth'); // auth
const { verificaRole_Admin } = require('../middlewares/auth');


router.post('/register', userController.registerUser); // post register user

router.post('/login', userController.login); // post login user
router.put('/user/:id', auth.verificaToken, userController.updateUser); // get list users


//
router.get('/user' , userController.getUsers); // get list users
router.get('/user/:id' , userController.getUser); // get list users







  






module.exports = router;