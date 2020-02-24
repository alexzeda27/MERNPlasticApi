const mongoose = require('mongoose');

const OperadoresSchema = mongoose.Schema({
    
    empleado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Empleado'
    },

    maquina: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Maquina'
    },

    turno: {
        type: String,
        required: true,
        trim: true
    }

});

module.exports = mongoose.model('Operadore', OperadoresSchema);