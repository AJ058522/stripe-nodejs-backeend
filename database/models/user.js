//Web Model
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

let rolesValidos = {
    values: ['USER_ROLE', 'ADMIN_ROLE',],
    message: 'Error, expected {PATH} is not valid.'

}

var userSchema = new Schema({

    nombre: {  type: String, required: [false, ' El nombre es requerido']},
    direccion: {  type: String, required: [false, ' El direccion es requerido']},
    email: {  type: String, unique: true, required: [false, ' El email es requerido']},
    password: {  type: String, required: [false, ' El password es requerido']},
    img: {  type: String, required: [false, ' la img es requerido']},
    id: {  type: String, required: [false, ' la id es requerido']},

    role: { type: String, enum: rolesValidos, required: false, default: 'USER_ROLE'},
    


});

userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });


module.exports = mongoose.model('User', userSchema);
