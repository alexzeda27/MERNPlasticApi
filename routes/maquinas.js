const express = require('express');
const { check } = require('express-validator');
const api = express.Router();
const maquinaController = require('../controllers/maquinaController');

//Crear Maquina
// api/máquinas
api.post('/', 
    [
        check('numeroMaquina', 'El número de máquina es obligatorio.').not().isEmpty(),
        check('bloque', 'El bloque es obligatorio.').not().isEmpty()
    ],
    maquinaController.crearMaquina
);

//Obtener máquinas por bloque
api.get('/',
    maquinaController.obtenerMaquinas
);

//Actualizar máquina
api.put('/:id',
    [
        check('numeroMaquina', 'El número de máquina es obligatorio.').not().isEmpty(),
        check('bloque', 'El bloque es obligatorio.').not().isEmpty()
    ],
    maquinaController.actualizarMaquina
);

//Eliminar máquina
api.delete('/:id',
    maquinaController.eliminarMaquina
);



module.exports = api;