const mongoose = require('mongoose');

const MaquinasSchema = mongoose.Schema({

    numeroMaquina: {
        type: Number,
        required: true,
        trim: true,
    },

    bloque: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bloque'
    }

});

module.exports = mongoose.model('Maquina', MaquinasSchema);