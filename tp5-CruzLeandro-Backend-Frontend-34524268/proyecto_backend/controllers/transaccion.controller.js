const Transaccion = require('../models/transaccion');
const transaccionCtrl = {}


//Recuperar TODAS las Transacciones Registradas(GET)
transaccionCtrl.getTransacciones = async (req, res) => {
    var transaccion = await Transaccion.find();
    res.json(transaccion);
}

//Recuperar el histórico de transacciones de un determinado cliente (GET), 
//utilizar email como clave
transaccionCtrl.getTransaccionesEmail = async (req, res) => {
    var email = {'emailCliente': req.params.email};
    var transacciones = await Transaccion.find(email);
    res.json(transacciones);
}

//-Recuperar TODAS las Transacciones que tengan como
//origen y destino las divisas (monedas) recibidas como
//parámetro (GET). Utilice el concepto de PARAMS.
transaccionCtrl.getTransaccionesMoMd = async (req, res) => {
    //var mOr = { 'monedaOrigen': req.params.mo};
    //var mDs = { 'monedaDestino': req.params.md};
    var transacciones = await Transaccion.find({ monedaOrigen: req.params.monedaOrigen,monedaDestino : req.params.monedaDestino});
    res.json(transacciones);
}


//Dar de alta una Transaccion(POST)
transaccionCtrl.createTransaccion = async (req, res) => {
    var transaccion = new Transaccion(req.body);
    try {
        await transaccion.save();
        res.json({
            'status': '1',
            'msg': 'Transaccion guardado.'})
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'})
    }
}

// ----- devolver una transaccion por id
transaccionCtrl.getTransaccion = async (req, res) => {
    const transaccion = await Transaccion.findById(req.params.id);
    res.json(transaccion);
}

// ----- editar una transaccion
transaccionCtrl.editTransaccion = async (req, res) => {
    const vtransaccion = new Transaccion(req.body);
    try {
        await Transaccion.updateOne({_id: req.body._id}, vtransaccion);
        res.json({
            'status': '1',
            'msg': 'Transaccion Actualizada'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

// ------- borrar una transaccion
transaccionCtrl.deleteTransaccion = async (req, res)=>{
    try {
        await Transaccion.deleteOne({_id: req.params.id});
        res.json({
            status: '1',
            msg: 'Transaccion Borrada'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
module.exports = transaccionCtrl;