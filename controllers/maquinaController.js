const { validationResult } = require('express-validator');
const Maquina = require('../models/Maquina');
const Bloque = require('../models/Bloque');

//Crear un nueva maquina
exports.crearMaquina = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    try {

        //Extraer la maquina y bloque
        const { numeroMaquina, bloque } = req.body;

        const existeBloque = await Bloque.findById(bloque);
        if(!existeBloque) return res.status(404).json({ msg: 'Bloque no encontrado.'});

        const existeMaquina = await Maquina.findOne({ $and: [
            {numeroMaquina},
            {bloque}
        ]});
        if(existeMaquina) return res.status(406).json({ msg: 'El número de máquina ya existe en este bloque.'});

        //Creamos la máquina
        const maquina = new Maquina(req.body);
        await maquina.save();
        res.json({ msg: 'Maquina creada correctamente.'});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en la petición.');
    }
}

//Obtiene las maquinas por bloque
exports.obtenerMaquinas = async (req, res) => {

    try {
        
        //Extraer el bloque y comprobar si existe
        const { bloque } = req.body;

        const existeBloque = await Bloque.findById(bloque);
        if(!existeBloque) return res.status(404).json({ msg: 'Bloque no encontrado.'});

        //Obtener las máquinas por bloque
        const maquinas = await Maquina.find({ bloque }).sort({ numeroMaquina: 1 }).populate({ path: 'bloque', populate: [{ path: 'departamento' }] });
        res.json({ maquinas });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en la petición.');
    }
}

//Actualizar máquina
exports.actualizarMaquina = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    try {
        
        //Extraer el bloque y comprobar si existe
        const { bloque, numeroMaquina } = req.body;

        //Si el maquina existe o no
        let maquina = await Maquina.findById(req.params.id);

        if(!maquina) return res.status(404).json({ msg: 'No existe esta máquina.' });

        //Extraer bloque
        const existeBloque = await Bloque.findById(bloque);

        const existeMaquina = await Maquina.findOne({ $and: [
            {numeroMaquina},
            {bloque}
        ]});
        if(existeMaquina) return res.status(406).json({ msg: 'El número de máquina ya existe en este bloque.'});

        //Crear un objeto con la nueva información
        const nuevaMaquina = {};
        nuevaMaquina.numeroMaquina = numeroMaquina;
        nuevaMaquina.bloque = bloque;

        //Guardar la máquina
        maquina = await Maquina.findOneAndUpdate({ _id: req.params.id }, nuevaMaquina, { new: true });

        res.json({ msg: 'Maquina actualizada correctamente.' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en la petición.');
    }
}

//Eliminar una máquina
exports.eliminarMaquina = async (req, res) => {

    try {
        
        //Extraer el bloque y comprobar si existe
        const { bloque } = req.query;

        //Si la máquina existe o no
        let maquina = await Maquina.findById(req.params.id);

        if(!maquina) return res.status(404).json({ msg: 'No existe esta máquina.'});

        //Extraer bloque
        const existeBloque = await Bloque.findById(bloque);

        //Eliminar
        await Maquina.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Máquina eliminada correctamente.' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en la petición.');
    }
}
