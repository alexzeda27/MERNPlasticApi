const bcryt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Empleado = require('../models/Empleado');

exports.autenticarEmpleado = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty())
    {
        return res.status(400).json({errores: errores.array()});
    }

    //Extraer número de nómina y contraseña
    const { numeroNomina, contraseña } = req.body;

    try {
        //Revisar que se un empleado registrado
        let empleado = await Empleado.findOne({ numeroNomina })
        if(!empleado) return res.status(400).json({ msg: 'El empleado no existe.' });

        //Revisar la contraseña
        const passCorreto = await bcryt.compare(contraseña, empleado.contraseña);
        if(!passCorreto) return res.status(400).json({ msg: 'Contraseña incorrecta.' });

        //Si todo es correcto, crear y firmar el JWT
         const payload = {
            empleado: {
                id: empleado.id
            }
        };

        //Firmar el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if(error) throw error;

            //Mensaje de confirmación
            res.json({ token });
        });

    } catch (error) {
        console.log(error);
    }
}