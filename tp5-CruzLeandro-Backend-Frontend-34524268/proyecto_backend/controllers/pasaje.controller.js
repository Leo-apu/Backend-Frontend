const Pasaje = require('../models/pasaje');
const pasajeCtrl = {}

//Dar de alta un pasaje (POST), enviar además el pasajero.
pasajeCtrl.crearPasaje=async(req,res)=>{
    var pasaje = new Pasaje(req.body);
    try {
        await pasaje.save();
        res.json({
            'status': '1',
            'msg': 'Pasaje guardado.'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}
//Obtener UN pasaje (GET) segun id
pasajeCtrl.getPasaje = async (req, res) => {
    const pasaje = await Pasaje.findById(req.params.id);
    res.json(pasaje);
}

//- Recuperar TODOS los pasajes (GET) incluyendo la información de los pasajeros.
//pasajeCtrl.getPasajes = async (req, res) => {
//    var pasajes = await Pasaje.find().populate("pasajero");//populate es poblar manda todo los datos de pasajero
 //   res.json(pasajes);
//}

//- Eliminar un pasaje (DELETE)
pasajeCtrl.deletePasaje = async (req, res)=>{
    try {
        await Pasaje.deleteOne({_id: req.params.id});
        res.json({
            status: '1',
            msg: 'Pasaje Borrado'
    })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

//- Modificar un pasaje (PUT)
pasajeCtrl.editPasaje = async (req, res) => {
    const vpasaje = new Pasaje(req.body);
    try {
        await Pasaje.updateOne({_id: req.body._id}, vpasaje);
        res.json({
            'status': '1',
            'msg': 'Pasaje Actualizado'
        })
    } catch (error) {
    res.json({
        'status': '0',
        'msg': 'Error procesando la operacion'
    })
    }
}

// -Recuperar SOLO los pasajeros que tienen una determinada categoría de Pasajero.
//pasajeCtrl.getPasajesByCategoriaPasajero=async(req,res) =>{
//    var pasajes=await Pasaje.find({categoriaPasajero: req.params.categoriaPasajero});
//   res.json(pasajes);
//}

pasajeCtrl.getPasajes = async (req, res) => {
    try {
        const objQuery = req.query;
        if (objQuery.hasOwnProperty("categoria")){
            const categoria = objQuery["categoria"];
            const pasajePorCategoria = await Pasaje.find({
                categoriaPasajero : categoria , 
            }).populate("pasajero");
            return res.json(pasajePorCategoria)
        }
        const pasajes = await Pasaje.find().populate("pasajero");
        return res.json(pasajes);
    } catch (error) {
        res.status(404).json({
            status : "0",
            msg: 'Error procesando la operacion',
        });
    }
}
module.exports = pasajeCtrl;