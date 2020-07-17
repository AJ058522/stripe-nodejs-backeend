"use strict";
// modules
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


//model
var User = require("../database/models/user");



//=====================================
//           GET USERS = GET
//=====================================


function getUsers(req, res) {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite);
  

  //  Usuario.find({ estado: true },'id name img role email')  nao eliminar usuario, apenas cambiar de estado

  User.find({}, 'id img  email nombre role unidad asociacion direccion companyAdmin')
  .populate('titulares', 'contatos email titulares')
    .skip(desde)
    .limit(limite)
    .exec((err, users) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message:
            "Something on the server didnt work right. Please, You need Verify your information id",
          err,
        });
      }

         
         
      
      //Usuario.count({}, (err, counts)=>{ estado para dar os filtros apenas de usuarios ativos
      User.count({}, (err, counts) => {
        //jqueri para contar usuarios
        return res.status(200).json({
          ok: true,
          users: users,
          TotalUsers: counts,
        });
      });
    });
}


//=====================================
//           GET USER = GET
//=====================================


function getUser(req, res) {
  let id  = req.params.id

  
User.findById(
  id,
  "nombre email img role id")
.exec((err, userDB) => {
  if (err) {
    return res.status(500).json({
      ok: false,
      mensaje: "Error de base de datos",
      errors: err,
    });
  }


  return res.status(200).json({
    ok: true,
    user: userDB,
  });
});
}

//=====================================
//           SAVE USER  = POST
//=====================================

function registerUser(req, res) {
  var body = req.body; // create object user
  var user = new User({
    nombre: body.nombre, // This is very diferente od the post, do you need add model gona be update
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    img: body.img,
    estado: body.estado,
    id: body.id,
    role: body.role,
  });

  user.save((err, userStored, next) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Something on the server didnt work right.",
        err,
      });
    }
    if (!userStored) {
      res.status(404).json({
        ok: false,
        message: "A file doesnt exist at that address",
        user: userStored,
      });
    }

    return res.status(201).json({
      ok: true,
      message: 'Everything is normal ("201 Created")',
      user: userStored,
    });
  });
}

//=====================================
//         UPDATE USER = PUT
//=====================================

function updateUser(req, res) {
  let id = req.params.id;
  let body = req.body;

  User.findByIdAndUpdate(id, body, {new: true, useFindAndModify: true }, (err, user) => {
    if (err) {
      return res.status(500).json({
        message: "Something on the server didnt work right put.",
        err,
      });
    }

    if (!user) {
     return res.status(404).json({
        ok: false,
        message: "A file doesnt exist at that address",
        user,
      });
    }


    const saltRounds = 10;

            
      
      
      if(body.password != null) {
        user.password = bcrypt.hashSync(body.password, saltRounds);
      }



    user.save((err, userUpdated) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message:
            "Server didnt understand the URL you gave it, You need will check ID.",
          err,
        });
      }

      if (!userUpdated) {
        res.status(400).json({
          ok: false,
          message:
            "Server didnt understand the URL you gave it, You need will check ID.",
          err,
        });
      }

      return res.status(200).json({
        ok: true,
        message: 'Everything is normal, user updated")',
        user: userUpdated,
      });
    });
  });
}

//=====================================
//        REMOVE USER = DELETE
//=====================================

function deleteUser(req, res) {
  let id = req.params.id;

  User.findByIdAndRemove(id, (err, userDelete) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Something on the server didnt work right.",
        err,
      });
    }

    if (!userDelete) {
      res.status(400).json({
        ok: false,
        message:
          "Server didnt understand the URL you gave it, You need will check ID.",
      });
    }

    res.status(200).json({
      ok: true,
      message: "Everything is normal, user deleted success",
      user: userDelete,
    });
  });
}





//=====================================
//        LOGIN USER = POST
//=====================================

function login(req, res) {
  let body = req.body;

  User.findOne({ email: body.email }, (err, userDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Something on the server didnt work right.",
      });
    }
    if (!userDB) {
      return res.status(400).json({
        ok: true,
        message:
          "Server didnt understand the URL you gave it, You need will check ID, if user exist.", body,
      });
    }
      console.log(body.email)
      console.log(body.password)

    if (!bcrypt.compareSync(body.password, userDB.password)) {
      return res.status(400).json({
        ok: false,
        err: {
          mensaje:
            " Server refuses to give you a file, authentication wont help, your information is not valid",
        },
      });
    }

    
    let token = jwt.sign({
        user: userDB
          
      },process.env.SEED,{ expiresIn: process.env.expiresIn}) // Verify the environment in config

      console.log(userDB.password)

   return res.status(200).json({
      ok: true,
      message: "Login was Success",
      userDB,
      token,
      
    });
  });
}









module.exports = {
  getUsers,
  getUser,
  registerUser,
  deleteUser,
  updateUser,
  login

};
