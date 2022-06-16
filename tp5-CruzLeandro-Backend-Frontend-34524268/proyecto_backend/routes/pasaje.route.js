//defino controlador para el manejo de CRUD
const pasajeCtrl=require('./../controllers/pasaje.controller');

//creamos el manejador de rutas
const express=require('express');
const router =express.Router();

//definimos las rutas para la gestion de pasajes
router.get('/:id',pasajeCtrl.getPasaje);
router.post('/',pasajeCtrl.crearPasaje);
router.get('/',pasajeCtrl.getPasajes);

router.delete('/:id',pasajeCtrl.deletePasaje);
//router.get('/:categoriaPasajero',pasajeCtrl.getPasajesByCategoriaPasajero);
router.put('/:id',pasajeCtrl.editPasaje);


//exportamos el modulo de rutas
module.exports = router;