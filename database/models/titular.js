//Web Model
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

let rolesValidos = {
    values: ['USER_ROLE', 'ADMIN_ROLE', 'TITULAR_ROLE',],
    message: 'Error, expected {PATH} is not valid.'

}


var titularSchema = new Schema({


    owners_id: {  type: String, unique: true, required: [false, ' The  ID is require']},
    owners_password: {  type: String, required: [false, ' The  ID is require']},

    urbanizacion_condominio: {  type: String, required: [true, ' The direccion fisica is require']},
    unidad: {  type: String, required: [true, ' The unidad is require']},
    companiaAdmin: {  type: String, required: [false, ' The compania Admin is require']},

    property_id: {  type: String, unique: true, required: [false, ' The property_id  ID is require']},

    direccion_fisica_1:{  type: String, required: [false, ' The direccion is require']},
    direccion_fisica_linea_1:{  type: String, required: [false, ' The direccion is require']},
    pueblo:{  type: String, required: [false, ' The pueblo is require']},
    //pueblo_2:{  type: String, required: [false, ' The pueblo is require']},

    estado:{  type: String, required: [false, ' The estado is require']},
    estado_2:{  type: String, required: [false, ' The estado is require']},

    zip_code:{  type: String, required: [false, ' The zip code is require']},
    zip_code_2:{  type: String, required: [false, ' The zip code is require']},


    direccion_postal_1:{  type: String, required: [false, ' The direccion postal is require']},
    direccion_postal_linea_1:{  type: String, required: [false, ' The direccion postal 2 is require']},
    pueblo_postal:{  type: String, required: [false, ' The direccion pueblo is require']},
    //pueblo_postal_2:{  type: String, required: [false, ' The direccion pueblo is require']},

    estado_postal:{  type: String, required: [false, ' The direccion estado is require']},
    //estado_postal_2:{  type: String, required: [false, ' The direccion estado is require']},

    zip_code_postal:{  type: String, required: [false, ' The direccion zip code postal is require']},
    //zip_code_postal_2:{  type: String, required: [false, ' The direccion zip code postal is require']},

    
    owner_1: {  type: String, required: [false, ' The  Owner is require']},
    owner_2: {  type: String, required: [false, ' The  Owner 2 is require']},
    owner_3: {  type: String, required: [false, ' The  Owner 3 is require']},
    owner_4: {  type: String, required: [false, ' The  Owner 4 is require']},
    owner_5: {  type: String, required: [false, ' The  Owner 5 is require']},

    contacto_1: {  type: String, required: [false, ' The  Contacto 1 is require']},
    contacto_2: {  type: String, required: [false, ' The  Contacto 2 is require']},
    contacto_3: {  type: String, required: [false, ' The  Contacto 3 is require']},
    contacto_4: {  type: String, required: [false, ' The  Contacto 4 is require']},
    contacto_5: {  type: String, required: [false, ' The  Contacto 5 is require']},

    telefono_1: {  type: String, required: [false, ' The  Telefono 1 is require']},
    telefono_2: {  type: String, required: [false, ' The  Telefono 2 is require']},
    telefono_3: {  type: String, required: [false, ' The  Telefono 3 is require']},
    telefono_4: {  type: String, required: [false, ' The  Telefono 4 is require']},
    telefono_5: {  type: String, required: [false, ' The  Telefono 5 is require']},

    email_1: {  type: String, required: [false, ' The Email 1 is require']},
    email_2: {  type: String, required: [false, ' The Email 2 is require']},
    email_3: {  type: String, required: [false, ' The Email 3 is require']},
    email_4: {  type: String, required: [false, ' The Email 4 is require']},
    email_5: {  type: String, required: [false, ' The Email 5 is require']},

    //Informacion del vehiculo
    marca_modelo_vehiculo_1: {  type: String, required: [false, ' The  Marca y modelo del vehiculo 1 is require']},
    marca_modelo_vehiculo_2: {  type: String, required: [false, ' The  Marca y modelo del vehiculo 2 is require']},
    marca_modelo_vehiculo_3: {  type: String, required: [false, ' The  Marca y modelo del vehiculo 3 is require']},
    marca_modelo_vehiculo_4: {  type: String, required: [false, ' The  Marca y modelo del vehiculo 4 is require']},
    marca_modelo_vehiculo_5: {  type: String, required: [false, ' The  Marca y modelo del vehiculo 5 is require']},
    marca_modelo_vehiculo_rentada_1: {  type: String, required: [false, ' The  Marca y modelo del vehiculo 6 is require']},
    marca_modelo_vehiculo_rentada_2: {  type: String, required: [false, ' The  Marca y modelo del vehiculo 7 is require']},

 ///Informacion del GOLF
    marca_modelo_golf_1: {  type: String, required: [false, ' The  Marca y modelo del vehiculo 1 is require']},
    marca_modelo_golf_2: {  type: String, required: [false, ' The  Marca y modelo del vehiculo 2 is require']},
    marca_modelo_golf_3: {  type: String, required: [false, ' The  Marca y modelo del vehiculo 3 is require']},
    marca_modelo_golf_4: {  type: String, required: [false, ' The  Marca y modelo del vehiculo 4 is require']},
    marca_modelo_golf_5: {  type: String, required: [false, ' The  Marca y modelo del vehiculo 5 is require']},

    tablilla_golf_1: {  type: String, required: [false, ' The tablilla 1 is require']},
    tablilla_golf_2: {  type: String, required: [false, ' The tablilla 2 is require']},
    tablilla_golf_3: {  type: String, required: [false, ' The tablilla 3 is require']},
    tablilla_golf_4: {  type: String, required: [false, ' The tablilla 4 is require']},
    tablilla_golf_5: {  type: String, required: [false, ' The tablilla 5 is require']},

    registration_number_1: {  type: String, required: [false, ' The AVI 1 is require']},
    registration_number_2: {  type: String, required: [false, ' The AVI 2 is require']},
    registration_number_3: {  type: String, required: [false, ' The AVI 3 is require']},
    registration_number_4: {  type: String, required: [false, ' The AVI 4 is require']},
    registration_number_5: {  type: String, required: [false, ' The AVI 5 is require']},

    tablilla_1: {  type: String, required: [false, ' The tablilla 1 is require']},
    tablilla_2: {  type: String, required: [false, ' The tablilla 2 is require']},
    tablilla_3: {  type: String, required: [false, ' The tablilla 3 is require']},
    tablilla_4: {  type: String, required: [false, ' The tablilla 4 is require']},
    tablilla_5: {  type: String, required: [false, ' The tablilla 5 is require']},
    tablilla_rentada_1: {  type: String, required: [false, ' The tablilla 6 is require']},
    tablilla_rentada_2: {  type: String, required: [false, ' The tablilla 7 is require']},



    avi_1: {  type: String, required: [false, ' The AVI 1 is require']},
    avi_2: {  type: String, required: [false, ' The AVI 2 is require']},
    avi_3: {  type: String, required: [false, ' The AVI 3 is require']},
    avi_4: {  type: String, required: [false, ' The AVI 4 is require']},
    avi_5: {  type: String, required: [false, ' The AVI 5 is require']},
    avi_rentada_1: {  type: String, required: [false, ' The AVI 6 is require']},
    avi_rentada_2: {  type: String, required: [false, ' The AVI 7 is require']},



    unidad_rentada: {  type: String, required: [false, ' The unidad rentada is require']},
    
    // Informacion inquilinos
    nombre_inquilinos_1: {  type: String, required: [false, ' The inquilinos 1 is require']},
    nombre_inquilinos_2: {  type: String, required: [false, ' The inquilinos 2 1 is require']},
    nombre_inquilinos_3: {  type: String, required: [false, ' The inquilinos 3 2 is require']},

    fecha_comienzo: {  type: Date, required: [false, ' The fecha inicio 1 is require']},
    fecha_comienzo_2: {  type: Date, required: [false, ' The fecha inicio 1 is require']},
    fecha_comienzo_3: {  type: Date, required: [false, ' The fecha inicio 1 is require']},

    fecha_conclusion: {  type: Date, required: [false, ' The fecha conclusion 1 is require']},
    fecha_conclusion_2: {  type: Date, required: [false, ' The fecha conclusion 1 is require']},

    fecha_conclusion_3: {  type: Date, required: [false, ' The fecha conclusion 1 is require']},


    telefono_inquilino_1: {  type: String, required: [false, ' The telefono inquilino 1 is require']},
    telefono_inquilino_2: {  type: String, required: [false, ' The telefono inquilino 2 is require']},
    telefono_inquilino_3: {  type: String, required: [false, ' The telefono inquilino 2 is require']},


    email_inquilino_1: {  type: String, required: [false, ' The telefono email inquilino 1 is require']},
    email_inquilino_2: {  type: String, required: [false, ' The telefono email inquilino 2 is require']},
    email_inquilino_3: {  type: String, required: [false, ' The telefono email inquilino 2 is require']},


    fecha_adquirida: {  type: Date, required: [false, ' The fecha adquirida 1 is require']},
    banco_hipotecario: {  type: String, required: [false, ' The banco hipotecario 1 is require']},

    numero_routing: {  type: String, required: [false, ' The  numero Routing is require']},
    numero_cuenta: {  type: String, required: [false, ' The numero de cuenta is require']},
    cuota_mensual: {  type: String, required: [false, ' The cuota mensual is require']},

    derrama_1: {  type: String, required: [false, ' The derrama 1 is require']},
    derrama_2: {  type: String, required: [false, ' The derrama 2 is require']},

    copia_escritura: {  type: String, required: [false, ' The escritura is require']},
    id_quickbooks_peachtree: {  type: String, required: [false, ' The Quickbooks Peachtree is require']},

    numero_tarjeta: {  type: String, required: [false, ' Number Card Peachtree is require']},
    fecha_expiracion_tarjeta: {  type: String, required: [false, ' date Card  is require']},
    zip_code_tarjeta: {  type: String, required: [false, ' zip code tarjet  is require']},
    cvv_tarjeta: {  type: String, required: [false, ' code cvv tarjet  is require']},




    envio_statements: {  type: String, required: [false, ' The statements is require']},

    // CONTATO EMERGENCIA
    nombre_persona_emergencia: {  type: String, required: [false, ' The nombre emergencia is require']},
    telefono_persona_emergencia: {  type: String, required: [false, ' The telefono emergencia is require']},
    relacion_persona_emergencia: {  type: String, required: [false, ' The relacion emergencia is require']},

    // PERSONAS AUTORIZADAS
    persona_autorizada_entrar_1: {  type: String, required: [false, ' The nombre de la persona autorizada 1 a entrar is require']},
    relacion_autorizada_entrar_1: {  type: String, required: [false, ' The nombre de la persona autorizada 1a entrar is require']},
    restrincciones_autorizada_1: {  type: String, required: [false, ' The restrinciones 1 is require']},

    persona_autorizada_entrar_2: {  type: String, required: [false, ' The nombre de la persona autorizada a entrar is require']},
    relacion_autorizada_entrar_2: {  type: String, required: [false, ' The nombre de la persona autorizada a entrar is require']},
    restrincciones_autorizada_2: {  type: String, required: [false, ' The restrinciones 2 is require']},

    persona_autorizada_entrar_3: {  type: String, required: [false, ' The nombre de la persona autorizada 1 a entrar is require']},
    relacion_autorizada_entrar_3: {  type: String, required: [false, ' The nombre de la persona autorizada 1a entrar is require']},
    restrincciones_autorizada_3: {  type: String, required: [false, ' The restrinciones 1 is require']},

    persona_autorizada_entrar_4: {  type: String, required: [false, ' The nombre de la persona autorizada 4 a entrar is require']},
    relacion_autorizada_entrar_4: {  type: String, required: [false, ' The nombre de la persona autorizada 4 a entrar is require']},
    restrincciones_autorizada_4: {  type: String, required: [false, ' The restrinciones 5 is require']},
    
    persona_autorizada_entrar_5: {  type: String, required: [false, ' The nombre de la persona autorizada 5 a entrar is require']},
    relacion_autorizada_entrar_5: {  type: String, required: [false, ' The nombre de la persona autorizada 5 a entrar is require']},
    restrincciones_autorizada_5: {  type: String, required: [false, ' The restrinciones 5 is require']},

    persona_autorizada_entrar_6: {  type: String, required: [false, ' The nombre de la persona autorizada 6 a entrar is require']},
    relacion_autorizada_entrar_6: {  type: String, required: [false, ' The nombre de la persona autorizada 6 a entrar is require']},
    restrincciones_autorizada_6: {  type: String, required: [false, ' The restrinciones 6 is require']},

    persona_autorizada_entrar_7: {  type: String, required: [false, ' The nombre de la persona autorizada 7 a entrar is require']},
    relacion_autorizada_entrar_7: {  type: String, required: [false, ' The nombre de la persona autorizada 7 a entrar is require']},
    restrincciones_autorizada_7: {  type: String, required: [false, ' The restrinciones 7 is require']},

    persona_autorizada_entrar_8: {  type: String, required: [false, ' The nombre de la persona autorizada 8 a entrar is require']},
    relacion_autorizada_entrar_8: {  type: String, required: [false, ' The nombre de la persona autorizada 8 a entrar is require']},
    restrincciones_autorizada_8: {  type: String, required: [false, ' The restrinciones 8 is require']},

    persona_autorizada_entrar_9: {  type: String, required: [false, ' The nombre de la persona autorizada 9 a entrar is require']},
    relacion_autorizada_entrar_9: {  type: String, required: [false, ' The nombre de la persona autorizada 9 a entrar is require']},
    restrincciones_autorizada_9: {  type: String, required: [false, ' The restrinciones 9 is require']},

    persona_autorizada_entrar_10: {  type: String, required: [false, ' The nombre de la persona autorizada 10 a entrar is require']},
    relacion_autorizada_entrar_10: {  type: String, required: [false, ' The nombre de la persona autorizada 10 a entrar is require']},
    restrincciones_autorizada_10: {  type: String, required: [false, ' The restrinciones 10 is require']},
    mensualidad: {  type: String, required: [false, ' mensualidad is require']},
    balance: {  type: String, required: [false, ' balance is require']},
    descuento: {  type: String, required: [false, ' Offer is require']},

    img: {  type: String, required: [false, ' The img is require']},

    role: { type: String, enum: rolesValidos, required: false, default: 'TITULAR_ROLE'},

    tickets:[{ type: Schema.Types.ObjectId, ref:'Ticket'}] //Relation with of the model




});

titularSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });


module.exports = mongoose.model('Titular', titularSchema);
