const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'No se ha podido iniciar sesión. Por favor, verifique que haya escrito bien Usuario y/o Contraseña'
            });
        }

        // Verificar si el usuario está activo en la Db
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'No se ha podido iniciar sesión. Por favor, verifique que haya escrito bien Usuario y/o Contraseña'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'No se ha podido iniciar sesión. Por favor, verifique que haya escrito bien Usuario y/o Contraseña'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'habla con el admin'
        })
    }


}

const googleSignin = async (req, res = response, next) => {

    const { id_token } = req.body;

    try {
        const { correo, nombre, img } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: ':F',
                img,
                google: true
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        if (!usuario.estado) {
            res.status(401).json({
                msg: 'Hable con el administrador - Usuario bloqueado'
            });
        }

        const token = await generarJWT(usuario.id);

        return res.status(200).json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Token de Google no es válido'
        })
    }


}

module.exports = {
    login,
    googleSignin
}