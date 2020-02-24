const express = require('express');
const { check } = require('express-validator');
const api = express.Router();
const bloqueController = require('../controllers/bloqueController');

//Crear Bloque
// api/bloques
api.post('/', 
    [
        check('numeroBloque', 'El número de bloque es obligatorio.').not().isEmpty(),
        check('departamento', 'El departamento es obligatorio.').not().isEmpty()
    ],
    bloqueController.crearbloque
);

//Obtener bloques por departamento
api.get('/',
    bloqueController.obtenerBloques
);

//Actualizar bloque
api.put('/:id',
    [
        check('numeroBloque', 'El número de bloque es obligatorio.').not().isEmpty(),
        check('departamento', 'El departamento es obligatorio.').not().isEmpty()
    ],
    bloqueController.actualizarBloque
);

//Eliminar bloque
api.delete('/:id',
    bloqueController.eliminarBloque
);

module.exports = api;