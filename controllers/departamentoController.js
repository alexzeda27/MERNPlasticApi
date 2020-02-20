const { validationResult } = require('express-validator');
const Departamento = require('../models/Departamento');

exports.crearDepartamento = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty())
    {
        return res.status(400).json({errores: errores.array()});
    }

    //Extraer nombre del departamento
    const { nombreDepartamento } = req.body;

    try {
        //Revisar que el departamento registrado sea único
        let departamento = await Departamento.findOne({ nombreDepartamento });

        if(departamento) return res.status(400).json({ msg: 'El departamento ya existe.' });

        //Crear nuevo departamento 
        departamento = new Departamento(req.body);

        //Guadar departamento
        await departamento.save();
        
        //Devuelve mensaje de confirmación
        res.json({ msg: 'Departamento creado correctamente.' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en la petición.');
    }
}

//Obtiene un departamento por su ID
exports.obtenerDepartamento = async (req, res) => {
    try {

        //Revisar el ID
        let departamento = await Departamento.findById(req.params.id).sort({ nombreDepartamento: 1 });

        //Si el departamento existe o no
        if(!departamento) return res.status(404).json({ msg: 'Departamento no encontrado.' });

        //Mostrar el departamento
        res.json({ departamento });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en la petición.');
    }
}

//Obtiene todos los departamentos
exports.obtenerDepartamentos = async (req, res) => {
    try {
        
        //Revisar todos los departamentos
        let departamento = await Departamento.find().sort({ nombreDepartamento: 1 });

        //Si no existe ningun departamento
        if(!departamento) return res.status(404).json({ msg: 'Departamentos no encontrados.' });

        //Mostrar los departamentos
        res.json({ departamento });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en la petición.');
    }
}

//Actualizar un departamento por su ID
exports.actualizarDepartamento = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty())
    {
        return res.status(400).json({errores: errores.array()});
    }

    //Extraer información del departamento
    const { nombreDepartamento } = req.body;
    const nuevoDepartamento = {};

    if(nombreDepartamento) {
        nuevoDepartamento.nombreDepartamento = nombreDepartamento;
    }

    try {
        
        //Revisar el ID del departamento
        let departamento = await Departamento.findById(req.params.id);

        //Si el departamento existe o no
        if(!departamento) return res.status(404).json({ msg: 'Departamento no encontrado.' });

        //Actualizar
        departamento = await Departamento.findByIdAndUpdate({ _id: req.params.id }, { $set: nuevoDepartamento }, { new: true });

        res.json({ msg: 'Departamento actualizado correctamente.' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en la petición.');
    }
}

//Eliminar un departamento por su ID
exports.eliminarDepartamento = async (req, res) => {
    try {
        
        //Revisar el ID del departamento
        let departamento = await Departamento.findById(req.params.id);

        //Si el departamento existe o no
        if(!departamento) return res.status(404).json({ msg: 'Departamento no encontrado.'});

        //Eliminar el departmento
        await Departamento.findByIdAndRemove({ _id: req.params.id });
        res.json({ msg: 'Departamento eliminado correctamente.'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en el servidor.');
    }
}