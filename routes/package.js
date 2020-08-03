'use strict'

const express = require('express');

const packageController = require('../controllers/package');

let  auth = require('../middlewares/auth') // auth


let router = express.Router();


router.get('/packages',[auth.verificaToken, packageController.getPackages]);
router.get('/package/:id',[auth.verificaToken, packageController.getPackage]);
router.post('/package',[auth.verificaToken, packageController.postPackage]);
router.put('/package/:id',[auth.verificaToken, packageController.updatePackage]);



module.exports = router;