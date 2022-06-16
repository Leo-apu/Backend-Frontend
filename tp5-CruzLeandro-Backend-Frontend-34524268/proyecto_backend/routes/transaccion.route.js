//defino controlador para el manejo de CRUD
const transaccionCtrl = require('./../controllers/transaccion.controller');

//creamos el manejador de rutas
const express = require('express');
const router = express.Router();

//definimos las rutas para la gestion de transacciones
router.get('/:monedaOrigen/:monedaDestino', transaccionCtrl.getTransaccionesMoMd);
router.get('/', transaccionCtrl.getTransacciones);
router.post('/', transaccionCtrl.createTransaccion);
router.get('/:email', transaccionCtrl.getTransaccionesEmail);

//exportamos el modulo de rutas
module.exports = router;