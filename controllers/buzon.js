'use strict'

let Buzon = require('../database/models/buzon')

const nodemailer = require("nodemailer");
const email = require('../services/email');

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




function getBuzones( req, res){

 
    let desde = req.query.desde || 0;
    desde = Number(desde);
  
    let limite = req.query.limite || 300;
    limite = Number(limite);
  
    //  Usuario.find({ estado: true },'id name img role email')  nao eliminar usuario, apenas cambiar de estado
  
    Buzon.find({})
      .populate('user')
      .skip(desde)
      .limit(limite)
      .exec((err, buzones) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            message:
              "Something on the server didnt work right. Please, You need Verify your information id",
            err,
          });
        }
  
  
  
        //Titular.count({}, (err, counts)=>{ estado para dar os filtros apenas de usuarios ativos
        Buzon.count({}, (err, counts) => {
          //jqueri para contar usuarios

          console.log(counts);
          
          return res.status(200).json({
            ok: true,
            buzones: buzones,
            TotalBuzones: counts,
          });
        });
      });


      


}







function registroBuzon( req, res){


    Buzon.count({}, (err, counts) => {

        let body = req.body

 
        let initBuzon = 700;
        let newCount = counts + initBuzon

        let buzon = Buzon({
            n_buzon: 'PR-'+ body.name.toUpperCase().split(/\s/).reduce((response,Word)=> response+=Word.slice(0,1),'') + newCount ++,
            name: body.name,
            email: body.email,
            phone: body.phone,
            message: body.message,
            termino: body.termino,
            address: body.address,
            user_id: req.user._id,
            user: req.user._id
            
    
        })
        
        body.user_id = req.user._id
                
        console.log('aqui esta o endereco', body.user_id);

        console.log(buzon.n_buzon); // Aqui esta o numero de buzao que se enviara por correio
        
        if(body.email == Buzon.find({})){
         return console.log('es igual');
        }

        let respTextMessage = {
          message: `Gracias por registrarse con Send To Puerto Rico, su número de buzón es "${buzon.n_buzon}", `,
          direccionMiami: `Su dirección asignada: 13461 NW 19 Lane, Miami FL 33182. `,
          important:  `Es importante que el número de buzón se encuentre seguido del nombre para efectos de identificar el paquete.`,
          nota: `NOTA: Refierase a los terminos y condiciones sobre tiempos de entrega, seguros y costos. Si tiene dudas puede llamarnos al 787-981-1421.`


        }


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
              

        buzon.save((err, newBuzon)=>{
        
            if(err){
             return   res.status(500).json({
                    ok: true,
                    message:'Error 500 of tada base to creative buzon',
                    error: err
                })
                
    
            }
    
            if(!newBuzon){
            return  res.status(400).json({
                    ok: true,
                    message:'Not found New Buzon',
                    error: error
                })
    
            }




            async function main() {
                // Generate test SMTP service account from ethereal.email
                // Only needed if you don't have a real mail account for testing
                let testAccount = await nodemailer.createTestAccount();
              
                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                  host: "smtp.gmail.com",
                  service: 'gmail',
                  port: 587,
                  secure: false, // true for 465, false for other ports
                  auth: {
                    user: process.env.user, // generated ethereal user
                    pass: process.env.pass,
                    tls: {
                      ciphers: 'SSLv3'
                      }// generated ethereal password
                  },
                  
              
                  // tls:{
                  //   rejectUnauthorized: false
                  // }
                });
              
                
                let url_logo = 'assets/send_to_puerto.png'
                let url_site = 'http://localhost:3000'
                let email = 'geovaneartedesign@gmail.com'
              
                // send mail with defined transport object
                let info = await transporter.sendMail({
                  from: `${body.email}`, // sender address
                  to: `<${body.email}>`, // list of receivers
                  subject: 'Registro completado!!!',
                  replyTo:`${email}`,

                  //text: "Hello world?", // plain text body
                  attachments: [
                    {
                        foto_frontal: 'foto_frontal',
                        path: `${url_site}/${url_logo}`,
                    }
                  ],
                  html: `

                  <h3>Gracias por registrarse con Send To Puerto Rico, su número de buzón es "${buzon.n_buzon}"</h3>
                         <p>Nombre y Apellido: ${body.name}</p> 
                         <p>Correo electrónico: ${body.email}</p> 
                         <p>Teléfono: ${body.phone}</p> 
                         <p>Dirección Física: ${body.address}</h2> <p>
                         <p>Message: ${body.message}</h2> <p>
              
                         <h3>Su dirección asignada:</h3>
                         <p>Nombre: ${body.name}</p> 
                         <p>Número de buzón: ${buzon.n_buzon}</p>
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
                message:' New buzon is ready in the of databese',
                buzon: newBuzon,
                counts: counts
            })
            
        })    

      });


    
}





module.exports = {

    registroBuzon,
    getBuzones

}