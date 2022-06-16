//defino controlador para el manejo de CRUD
const libroCtrl = require('./../controllers/libro.controller');

//creamos el manejador de rutas
const express = require('express');
const router = express.Router();

//definimos las rutas para la gestion de agente
router.get('/', libroCtrl.getLibros);
router.post('/', libroCtrl.createLibro);
//router.get('/:id', libroCtrl.getLibro);
router.get('/:activo', libroCtrl.getDestacados);
router.put('/:id', libroCtrl.editLibro);
router.delete('/:id', libroCtrl.deleteLibro);

//exportamos el modulo de rutas
module.exports = router;