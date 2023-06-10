const { db } = require("../utils/firebase/admin");
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
            console.log(req.body);
            const usersRef = users.doc(req.body.email);
            const response = await usersRef.create(req.body);
    
    
            console.log(response);
            res.status(201).send({message: "Usuario creado correctamente"})
            console.log("res correcto: ", res)
        }
        catch (error) {
            console.log("ERROR");
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
        const response = await users.doc(req.body.id).delete();

        console.log(response);
        res.status(204).send({});
    }
    catch (error) {
        check_error(error, res);
    }
}

module.exports = {
    list:list,
    get:get,
    update: update,
    create: create,
    delete: borrar
};