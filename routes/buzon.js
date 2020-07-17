'use strict'

const express = require('express');
const registerController = require('../controllers/buzon')



// Init Var
let router = express.Router();
 
let  auth = require('../middlewares/auth') // auth





router.post('/buzon', [auth.verificaToken], registerController.registroBuzon)
router.get('/buzones', registerController.getBuzones)


module.exports = router