const express = require('express');
const conectarDB = require('./config/database');

//Crear servidor
const app = express();

//Concetar a la base de datos
conectarDB();

//Habilitar express.json
app.use(express.json({ extended: true }));

//Puerto de la app
const PORT = process.env.PORT || 6000;

//** TO DO Importar Rutas */
app.use('/api/empleados', require('./routes/empleados'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/departamentos', require('./routes/departamentos'));

//Arrancar la app
app.listen(PORT, () => {
    console.log(`El servidor esta activo en el puerto ${PORT}`);
});