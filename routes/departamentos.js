const express = require('express');
const { check } = require('express-validator');
const api = express.Router();
const departamentoController = require('../controllers/departamentoController');

//Crear Departamento
// api/departamentos
api.post('/', 
    [
        check('nombreDepartamento', 'El nombre del departamento es obligatorio.').not().isEmpty(),
    ],
    departamentoController.crearDepartamento
);

//Obtener departamento por ID
api.get('/:id', 
    departamentoController.obtenerDepartamento
);

//Obtener todos los departamentos
api.get('/',
    departamentoController.obtenerDepartamentos
);

//Actualizar departamento por ID
api.put('/:id',
    [
        check('nombreDepartamento', 'El nombre del departamento es obligatorio.').not().isEmpty(),
    ],
    departamentoController.actualizarDepartamento
);

//Eliminar departamento por ID
api.delete('/:id',
    departamentoController.eliminarDepartamento
);

module.exports = api;