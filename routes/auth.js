const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/auth');

const api = express.Router();

//Crear Autenticación
// api/auth
api.post('/', 
    [
        check('numeroNomina', 'El número de nómina es obligatorio.').not().isEmpty(),
        check('contraseña', 'La contraseña es obligatoria.').not().isEmpty()
    ],
    authController.autenticarEmpleado
);

module.exports = api;