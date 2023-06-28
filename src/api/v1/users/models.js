const { db, auth, storage } = require("../utils/firebase/admin");
const { check_error } = require("../utils/utils");
const users = db.collection("usuarios");

class Usuario {
    constructor(id, nombre, apellidos, email, photoURL, rol) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.photoURL = photoURL;
        this.rol = rol;
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
                            datos.rol
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
                            datos.photoURL,
                            datos.rol
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
                let photoURL = await this.get_default_image();
                req.body.photoURL = photoURL;
                response = await auth.createUser({
                    email: req.body.email,
                    password: this.generate_password(),
                    emailVerified: false,
                    disabled:false
                })
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

    generate_password = function() {
        let longitud = 12,
        charset = "@#$&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$&*0123456789abcdefghijklmnopqrstuvwxyz",
        password = "";
    
        for (let i = 0, n = charset.length; i < longitud; i++) {
            password += charset.charAt(Math.floor(Math.random() * n));
        }
    
        return password;
    }
    
    get_default_image = async function() {
        const image = await storage.file("default-profile.png").cloudStorageURI.pathname
        return image
    }
}

module.exports = {Usuario, UsuarioAPI}