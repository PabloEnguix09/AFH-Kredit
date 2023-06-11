const { db, auth, storage } = require("../utils/firebase/admin");
const users = db.collection("usuarios");
const { check_error } = require("../utils/utils");
const Usuario = require("./models")

let list = async function (req, res) {
    
    try {
        const usersRef = users;
        const response = await usersRef.get();
        let usuarios = [];
        if(response.docs.length == 0) {
            res.status(404).send({message: "No hay usuarios"})
        }
        else {
            response.forEach(doc => {
                let datos = doc.data();
                const usuario = new Usuario(
                    datos.id,
                    datos.nombre,
                    datos.apellidos,
                    datos.email,
                    datos.rol
                );
                usuarios.push(usuario);
            });
            res.status(200).send(usuarios);
        }
    }
    catch (error) {
        check_error(error, res);
    }
}

let get = async function (req, res) {
        try {
            const userRef = db.collection("usuarios").doc(req.params.id);
            const response = await userRef.get();
            if(!response.exists){
                res.status(404).send({message: "Usuario no existente"})
            }
            else {
                const data = response.data();

                console.log(data);
                res.status(200).send(data);
            }
        }
        catch (error) {
            check_error(error, res);
        }
}

let create = async (req, res) => {
        try {
            let response = {}
            let photoURL = await get_default_image();

            req.body.photoURL = photoURL;

            response = await auth.createUser({
                email: req.body.email,
                password: generate_password(),
                emailVerified: false,
                disabled:false
            })
            console.log("Usuario autenticado");

            const usersRef = users.doc(req.body.email);
            response = await usersRef.create(req.body);
            console.log("Usuario creado");

            res.status(201).send({message: "Usuario creado correctamente"})
        }
        catch (error) {
            console.log("ERROR al crear usuario: ", error);
            check_error(error, res);
        }
}

let update = async function (req, res) {
    try {
        const usersRef = users.doc(req.body.id);
        console.log(usersRef);
        const body = req.body.data;
        const response = await usersRef.update(body);
        
        res.status(204).send({});
    }
    catch (error) {
        check_error(error, res);
    }
}

let borrar = async function (req, res) {
    try {
        let response = await users.doc(req.body.id).delete();

        response = await auth.getUserByEmail(req.body.id).then(async (user) => {
            await auth.deleteUser(user.uid)
        })

        console.log(response);
        res.status(204).send({});
    }
    catch (error) {
        check_error(error, res);
    }
}

let login = async function (req, res) {

}

function generate_password() {
    let longitud = 12,
    charset = "@#$&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$&*0123456789abcdefghijklmnopqrstuvwxyz",
    password = "";

    for (let i = 0, n = charset.length; i < longitud; i++) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }

    return password;
}

async function get_default_image() {
    const image = await storage.bucket().file("default-profile.png").cloudStorageURI.pathname
    console.log(image);
    return image
    /*.then((res) => {
        console.log(res);
        return res;
    })*/
}

module.exports = {
    list:list,
    get:get,
    update: update,
    create: create,
    delete: borrar,
    login:login
};