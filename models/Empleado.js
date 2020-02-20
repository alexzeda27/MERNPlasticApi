const mongoose = require('mongoose');

const EmpleadosSchema = mongoose.Schema({

    numeroNomina: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },

    nombre: {
        type: String,
        required: true,
        trim: true
    },

    apellidoPaterno: {
        type: String,
        required: true,
        trim: true
    },

    apellidoMaterno: {
        type: String,
        trim: false
    },

    correo: {
        type: String,
        trim: true
    },

    contraseña: {
        type: String,
        required: true,
        trim: true
    },

    registro: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('Empleado', EmpleadosSchema);