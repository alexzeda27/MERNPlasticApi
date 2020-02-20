const express = require('express');
const { check } = require('express-validator');
const api = express.Router();
const empleadoController = require('../controllers/empleadoController');

//Crear Usuario
// api/empleados
api.post('/', 
    [
        check('numeroNomina', 'El número de nómina es obligatorio.').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
        check('apellidoPaterno', 'El apellido paterno es obligatorio.').not().isEmpty(),
        check('correo', 'Ingrese un correo valido').isEmail(),
        check('contraseña', 'La contraseña es obligatoria.').not().isEmpty(),
        check('contraseña', 'La contraseña debe ser mínimo de 6 caracteres.').isLength({min: 6})
    ],
    empleadoController.crearEmpleado
);

module.exports = api;