const bcryt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Empleado = require('../models/Empleado');

exports.crearEmpleado = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty())
    {
        return res.status(400).json({errores: errores.array()});
    }

    //Extraer número de nómina y contraseña
    const { numeroNomina, contraseña } = req.body;

    try {
        //Revisar que el empleado registrado sea único
        let empleado = await Empleado.findOne({ numeroNomina });

        if(empleado) return res.status(400).json({ msg: 'El empleado ya existe.' });

        //Crear nuevo empleado
        empleado = new Empleado(req.body);

        //Hashear la contraseña
        const salt = await bcryt.genSalt(10);
        empleado.contraseña = await bcryt.hash(contraseña, salt);

        //Gurdar empleado
        await empleado.save();

        //Crear y firmar el JWT
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
        res.status(500).send('Hubo un error en la petición.');
    }
}