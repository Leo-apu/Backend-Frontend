const mongoose = require('mongoose');
const URI = 'mongodb://localhost/proyectodb';
mongoose.connect(URI)
.then(db=>console.log('Base de Datos conectada'))
.catch(err=>console.error(err))
module.exports = mongoose;
