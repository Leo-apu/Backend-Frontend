const Libro = require('../models/libro');
const libroCtrl = {}

//Recuperar TODOS los libros (GET)
libroCtrl.getLibros = async (req, res) => {
    var libros = await Libro.find();
    res.json(libros);
}

//Recuperar los libros DESTACADOS (GET)
libroCtrl.getDestacados = async (req, res) => {
    var criteria = { 'destacado' : true};
    var libros = await Libro.find(criteria);
    res.json(libros);
}

// Dar de alta un libro (POST)
libroCtrl.createLibro = async (req, res) => {
    var libro = new Libro(req.body);
    try {
        await libro.save();
        res.json({
            'status': '1',
            'msg': 'Libro guardado.'})
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'})
    }
}
// ----Traer un libro por su id
libroCtrl.getLibro = async (req, res) => {
    const libro = await Libro.findById(req.params.id);
    res.json(libro);
}

//Modificar un libro (PUT)
libroCtrl.editLibro = async (req, res) => {
    const vlibro = new Libro(req.body);
    try {
        await Libro.updateOne({_id: req.body._id}, vlibro);
        res.json({
            'status': '1',
            'msg': 'Libro Actualizado'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

//Eliminar un libro (DELETE)
libroCtrl.deleteLibro = async (req, res)=>{
    try {
        await Libro.deleteOne({_id: req.params.id});
        res.json({
            status: '1',
            msg: 'Libro Borrado'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
module.exports = libroCtrl;
