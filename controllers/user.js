"use strict";
// modules
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


//model
var User = require("../database/models/user");
const nodemailer = require("nodemailer");


const AWS = require('aws-sdk');


const credentials = {
  id: process.env.AWS_ID,
  secret: process.env.AWS_SECRET
}


// Set region
const code = "+1"
//configuration messager amazon
// Set region
AWS.config.update({
    region: 'us-east-1',
    accessKeyId: credentials.id,
    secretAccessKey: credentials.secret

}); 
// Create publish parameters


//=====================================
//           GET USERS = GET
//=====================================


function getUsers(req, res) {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 1000000000000000000;
  limite = Number(limite);
  

  //  Usuario.find({ estado: true },'id name img role email')  nao eliminar usuario, apenas cambiar de estado

  User.find({}, 'id img  email nombre role n_buzon address phone')
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


       /* for(let i=0;i<users.length;i++){


          users[i].password = [];
          users[i]._id = []
          users[i].__v = i;
   

          //const saltRounds = 10;

          let id = users[i]._id

          let passworD = bcrypt.hashSync('stpr2020', 10)


          console.log('new ****password',passworD);
          console.log('new #### id', id);


          User.findByIdAndUpdate({_id: id}, {$set:{password:passworD,__v: i,users:[]}}, {new: true}, (err, doc) => {
          })


        }
        
*/








        console.log( '######', users);
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
  "nombre email img role id n_buzon phone address")
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

  User.count({}, (err, counts) => {

  var body = req.body;
  
  let initBuzon = 9719;
  let newCount = counts + initBuzon
  // create object user
  var user = new User({
    nombre: body.nombre, // This is very diferente od the post, do you need add model gona be update
    email: body.email,
    n_buzon: newCount ++,
    phone: body.phone,
    address: body.address,
    password: bcrypt.hashSync(body.password, 10),
    img: body.img,
    estado: body.estado,
    termino: body.termino,
    date_create: new Date(),
    role: body.role,
  });


  if(body.email == User.find({})){
    return console.log('es igual');
   }

   let respTextMessage = {
     message: `Gracias por registrarse con Send To Puerto Rico, su número de buzón es "PR-${user.n_buzon}", `,
     direccionMiami: `Su dirección asignada: 13461 NW 19 Lane, Miami FL 33182. `,
     important:  `Es importante que el número de buzón se encuentre seguido del nombre para efectos de identificar el paquete.`,
     nota: `NOTA: Refierase a los terminos y condiciones sobre tiempos de entrega, seguros y costos. Si tiene dudas puede llamarnos al 787-981-1421.`


   }
   console.log('TIPO USER EMAIL', body.email);

   console.log('TIPO PASSWORD', body.password);
   let pr = 'PR-'

   let OkMessage =  respTextMessage.message + respTextMessage.direccionMiami + respTextMessage.important+ respTextMessage.nota

   let params = {
    Message: `${OkMessage}`, /* required */
    PhoneNumber: `${code}${body.phone}`,
  };
  
  console.log(params.Message);
  
  function sendSMS(params) {
     
    var publishTextPromise = new AWS.SNS().publish(params).promise();
    // Handle promise's fulfilled/rejected states
    publishTextPromise.then(function (data) {
        console.log("MessageID is " + data.MessageId);
    }).catch(function (err) {
        console.error(err, err.stack);
    });
  }



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

    async function main() {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      let testAccount = await nodemailer.createTestAccount();
    
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "email-smtp.us-east-1.amazonaws.com",
        port: 587,
        //secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL, // generated ethereal user
          pass: process.env.PASSWORD,
          
        },
        
    
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: true
      }
      });
    
      
      let url_logo = 'assets/send_to_puerto.png'
      let replay = 'sendtopuertorico@gmail.com'
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: `info@sendtopuertorico.com`, // sender address
        to: `<${body.email}>,<${replay}>`, // list of receivers
        subject: 'Registro completado!!!',
        replyTo:`<${replay}>`,


        //text: "Hello world?", // plain text body
        attachments: [
          {
              foto_frontal: 'foto_frontal',
              path: `${process.env.URL_SITE}/${url_logo}`,
          }
        ],
        html: `

        <h3>Gracias por registrarse con Send To Puerto Rico, su número de buzón es "${pr}${user.n_buzon}"</h3>
               <p>Nombre y Apellido: ${body.nombre}</p> 
               <p>Correo electrónico: ${body.email}</p> 
               <p>Teléfono: ${body.phone}</p> 
               <p>Dirección Física: ${body.address}</h2> <p>    
               <h3>Su dirección asignada:</h3>
               <p>Nombre: ${body.nombre}</p> 
               <p>Número de buzón: ${pr}${user.n_buzon}</p>
               <p>13461 NW 19 Lane</p>  
               <p>Miami FL 33182</p> <br>
               <p>Es importante que el número de buzón se encuentre seguido del nombre para efectos de identificar el paquete.</p> 
               <br> 
               <br>
               <p>NOTA: Refierase a los terminos y condiciones sobre tiempos de entrega, seguros y costos. Si tiene dudas puede llamarnos al 787-981-1421.</p>  


               `, // html body
    
    
      });
    
      
    
      console.log('sou um email',body.email);
      
    
      
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      nodemailer.getTestMessageUrl(info)
    }

    main().catch(console.error);



     sendSMS(params);

    

    return res.status(201).json({
      ok: true,
      message: 'Everything is normal ("201 Created")',
      user: userStored,
      counts: counts

    });
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
