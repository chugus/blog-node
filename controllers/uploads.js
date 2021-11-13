const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require('express');
const subirArchivo = require('../helpers/subir-archivo');

const Usuario = require('../models/usuario');
const Articulo = require('../models/articulo');


const cargarArchivo = async (req, res = response) => {

    try {
        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        res.json({ nombre });

    } catch (msg) {
        res.status(400).json({ msg });
    }

}

const subirImg = async (req, res = response) => {

    try {
        const { archivo } = req.body;

        const { secure_url } = await cloudinary.uploader.upload(archivo);

        res.status(200).json(secure_url);

    } catch (error) {
        console.log('aqui, qui')
    }

}

const actualizarImagenCloudinary = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }

            break;

        case 'articulos':
            modelo = await Articulo.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un artículo con el id ${id}`
                });
            }

            break;

        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' });
    }


    // Limpiar imágenes previas
    if (modelo.img) {
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');
        cloudinary.uploader.destroy(public_id);
    }


    const { archivo } = req.body;
    const { secure_url } = await cloudinary.uploader.upload(archivo);
    modelo.img = secure_url;

    await modelo.save();


    res.json(modelo);

}

const mostrarImagen = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }

            break;

        case 'articulos':
            modelo = await Articulo.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un artículo con el id ${id}`
                });
            }

            break;

        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' });
    }


    // Limpiar imágenes previas
    if (modelo.img) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen)
        }
    }

    const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathImagen);
}




module.exports = {
    cargarArchivo,
    subirImg,
    mostrarImagen,
    actualizarImagenCloudinary
}