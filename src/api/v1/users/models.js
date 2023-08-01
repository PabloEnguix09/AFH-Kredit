const { db, auth, storage } = require("../utils/firebase/admin");
const { check_error } = require("../utils/utils");
const users = db.collection("usuarios");
const { authClient, signInWithEmailAndPassword } = require("../utils/firebase/app")

const CryptoJS = require("crypto-js");

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
                console.log(req.body.email.split("@")[0]);
                //let pass = await bcrypt.hash(req.body.email.split("@")[0], 10)
                //console.log(pass);
                let photoURL = await this.get_default_image();
                req.body.photoURL = photoURL;
                response = await auth.createUser({
                    email: req.body.email,
                    password: req.body.email.split("@")[0],
                    //password: pass,
                    emailVerified: false,
                    disabled: false,
                    uid: req.body.email,
                    displayName: req.body.nombre + " " + req.body.apellidos,
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

    generate_password = async function(email) {
    
        //return await bcrypt.hash(, 10);
    }
    
    get_default_image = async function() {
        const image = await storage.file("default-profile.png").cloudStorageURI.pathname
        return image
    }

    login = async function (req) {
        return new Promise(async(resolve, reject) => {
            try {
                let pass = CryptoJS.AES.decrypt(req.body.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8)
                await signInWithEmailAndPassword(authClient, req.body.email, pass).then(async(credenciales) => {
                    let tokenId = await authClient.currentUser.getIdToken()
                    await auth.verifyIdToken(tokenId).then((claims) => {
                        if(claims.admin == true) {
                            credenciales.user.providerData[0].isAdmin = true
                        }
                        else {
                            credenciales.user.providerData[0].isAdmin = false
                        }
                        resolve({status: 301, data: credenciales.user})
                    })
                }).catch((error) => {
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