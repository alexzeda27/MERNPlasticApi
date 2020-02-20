const mongoose = require('mongoose');

const DepartamentosSchema = mongoose.Schema({

    nombreDepartamento: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }

});

module.exports = mongoose.model('Departamento', DepartamentosSchema);