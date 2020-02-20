const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Conectado a la base de datos.');
    } catch (error) {
        console.log(error);
        process.exit(1); //Detener App    
    }
}

module.exports = conectarDB;