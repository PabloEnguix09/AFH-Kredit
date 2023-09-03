const { db, auth, storage } = require("../utils/firebase/admin");
const { check_error } = require("../utils/utils");
const users = db.collection("usuarios");
const { authClient, signInWithEmailAndPassword } = require("../utils/firebase/app")
const CryptoJS = require("crypto-js");
const nodemailer = require('nodemailer')

class Usuario {
    constructor(id, nombre, apellidos, email, rol, contactos, prestamos) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.rol = rol;
        this.contactos = contactos;
        this.prestamos = prestamos
    }
}

class UsuarioAPI {
    getAll = async function (req) {
        return new Promise(async(resolve, reject) => {
            try {
                const response = await users.get();
                let usuarios = [];
                if(response.docs.length == 0) {
                    resolve({
                        status: 404,
                        data: {message: "No hay usuarios"}
                    })
                }
                else {
                    response.forEach(doc => {
                        let datos = doc.data();
                        const usuario = new Usuario(
                            datos.id,
                            datos.nombre,
                            datos.apellidos,
                            datos.email,
                            datos.photoURL,
                            datos.rol,
                            datos.contactos
                        );
                        usuarios.push(usuario);
                    });
                    resolve({
                        status:200,
                        data: usuarios
                    })
                }
            } catch (error) {
                resolve(check_error(error))
            }
        })
    }

    get = async function (req) {
        return new Promise((resolve, reject) => {
            try {
                users.doc(req.params.id).get().then((response) => {
                    if(!response.exists){
                        resolve({
                            status: 404,
                            data: {message: "Usuario no existente"}
                        })
                    }
                    else {
                        const datos = response.data();
                        let usuario = new Usuario(
                            datos.id,
                            datos.nombre,
                            datos.apellidos,
                            datos.email,
                            datos.rol,
                            datos.contactos,
                            datos.prestamos
                        )
                        resolve({
                            status: 200,
                            data: usuario
                        })
                    }
                });
            } catch (error) {
                resolve(check_error(error))
            }
        })
    }

    create = async function (req) {
        return new Promise(async(resolve, reject) => {
            try {
                let response = {}
                response = await auth.createUser({
                    email: req.body.email,
                    password: req.body.email.split("@")[0],
                    emailVerified: false,
                    disabled: false,
                    uid: req.body.email,
                    displayName: req.body.nombre + " " + req.body.apellidos
                })

                response = await auth.setCustomUserClaims(req.body.email, {admin: req.body.rol == "Admin" ? true : false})
                const usersRef = users.doc(req.body.email);
                response = await usersRef.create(req.body);
                resolve({
                    status: 201,
                    data: {message: "Usuario creado correctamente"}
                })
            } catch (error) {
                resolve(check_error(error))
            }
        })
    }

    update = async function (req) {
        return new Promise(async(resolve, reject) => {
            try {
                const usersRef = users.doc(req.body.id);
                const body = req.body.data;
                await usersRef.update(body);

                resolve({ status: 204, data: {} })
            } catch (error) {
                resolve(check_error(error))
            }
        })
    }

    delete = async function (req) {
        return new Promise(async(resolve, reject) => {
            try {
                let response = await users.doc(req.body.id).delete();

                response = await auth.getUserByEmail(req.body.id).then(async (user) => {
                    await auth.deleteUser(user.uid)
                })
            
                resolve({
                    status: 204,
                    data: {}
                })
            } catch (error) {
                resolve(check_error(error))
            }
        })
    }

    sendEmail = async function (req) {
        return new Promise(async(resolve, reject) => {
            try {
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    }
                })

                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: "strikertiger9@gmail.com",
                    subject: "Nueva solicitud de estudio",
                    text: "Nombre completo: " + req.body.nombre + " " + req.body.apellidos + "\n" + 
                    "Correo electrónico: " + req.body.correo + "\n" + 
                    (req.body.telefono !== "" ? ("Teléfono: " + req.body.telefono + "\n") : "") +
                    "Descripción: " + req.body.descripcion
                }).then(async() => {
                    await transporter.sendMail({
                        from: process.env.EMAIL_USER,
                        to: req.body.correo,
                        subject: "Correo enviado correctamente",
                        text: "Tu solicitud ha sido recibida. Espera una respuesta de nuestros asesores en un plazo mínimo de 48 horas."
                    }).then(() => {
                        console.log("Correos enviados");
                        resolve({status: 200, data: {}})
                    }).catch((error) => {
                        console.log("Error segundo correo");
                        throw new Error(error)
                    })
                }).catch((error) => {
                    console.log("Error primer correo");
                    throw new Error(error)
                })
            } catch (error) {
                console.log(error);
                resolve(check_error(error))
            }
        })
    }
}

module.exports = {Usuario, UsuarioAPI}