const mongoose = require('mongoose');

const BloquesSchema = mongoose.Schema({

    numeroBloque: {
        type: Number,
        required: true,
        trim: true,
    },

    departamento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Departamento'
    }

});

module.exports = mongoose.model('Bloque', BloquesSchema);