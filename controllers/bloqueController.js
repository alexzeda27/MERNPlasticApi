const { validationResult } = require('express-validator');
const Bloque = require('../models/Bloque');
const Departamento = require('../models/Departamento');

//Crear un nuevo bloque
exports.crearbloque = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    try {

        //Extraer el bloque y departamento
        const { numeroBloque, departamento } = req.body;

        const existeDepartamento = await Departamento.findById(departamento);
        if(!existeDepartamento) return res.status(404).json({ msg: 'Departamento no encontrado.'});

        const existeBloque = await Bloque.findOne({ $and: [
            {numeroBloque},
            {departamento}
        ]});
        if(existeBloque) return res.status(406).json({ msg: 'El número de bloque ya existe en este departamento.'});

        //Creamos el bloque
        const bloque = new Bloque(req.body);
        await bloque.save();
        res.json({ msg: 'Bloque creado correctamente.'});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en la petición.');
    }
}

//Obtiene los bloques por departamento
exports.obtenerBloques = async (req, res) => {

    try {
        
        //Extraer el departamento y comprobar si existe
        const { departamento } = req.body;

        const existeDepartamento = await Departamento.findById(departamento);
        if(!existeDepartamento) return res.status(404).json({ msg: 'Departamento no encontrado.'});

        //Obtener los bloques por departamento
        const bloques = await Bloque.find({ departamento }).sort({ numeroBloque: 1 }).populate({ path: 'departamento' });
        res.json({ bloques });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en la petición.');
    }
}

//Actualizar bloque
exports.actualizarBloque = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    try {
        
        //Extraer el departamento y comprobar si existe
        const { departamento, numeroBloque } = req.body;

        //Si el bloque existe o no
        let bloque = await Bloque.findById(req.params.id);

        if(!bloque) return res.status(404).json({ msg: 'No existe este bloque.' });

        //Extraer departamento
        const existeDepartamento = await Departamento.findById(departamento);

        const existeBloque = await Bloque.findOne({ $and: [
            {numeroBloque},
            {departamento}
        ]});
        if(existeBloque) return res.status(406).json({ msg: 'El número de bloque ya existe en este departamento.'});

        //Crear un objeto con la nueva información
        const nuevoBloque = {};
        nuevoBloque.numeroBloque = numeroBloque;
        nuevoBloque.departamento = departamento;

        //Guardar el bloque
        bloque = await Bloque.findOneAndUpdate({ _id: req.params.id }, nuevoBloque, { new: true });

        res.json({ msg: 'Bloque actualizado correctamente. '});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en la petición.');
    }
}

//Eliminar un bloque
exports.eliminarBloque = async (req, res) => {

    try {
        
        //Extraer el departamento y comprobar si existe
        const { departamento } = req.query;

        //Si el bloque existe o no
        let bloque = await Bloque.findById(req.params.id);

        if(!bloque) return res.status(404).json({ msg: 'No existe este bloque. '});

        //Extraer departamento
        const existeDepartamento = await Departamento.findById(departamento);

        //Eliminar
        await Bloque.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Bloque eliminado correctamente. '});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en la petición.');
    }
}