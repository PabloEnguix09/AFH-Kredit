const { db } = require("../utils/firebase/admin");
const users = db.collection("usuarios");

let list = async function (req, res) {
    
    try {
        const usersRef = users;
        const response = await usersRef.get();
        let data = [];
        response.forEach(doc => {
            data.push(doc.data());
        });

        console.log(data);
        res.send(data);
    }
    catch (error) {
        res.send(error);
    }
}
let get = async function (req, res) {
        try {
            const userRef = db.collection("usuarios").doc(req.params["id"]);
            const response = await userRef.get();
            const data = response.data();

            console.log(data);
            res.send(data);
        }
        catch (error) {
            res.send(error);
        }
    }

let update = async function (req, res) {
    try {
        const usersRef = users.doc(req.body.id);
        const body = req.body.data;
        const response = await usersRef.update(body);

        console.log(response);
        res.send(response);
    }
    catch (error) {
        res.send(error);
    }
}

let create = async function (req, res) {
    try {
        console.log(req.body);
        
        const usersRef = users.doc(req.body.email);
        const response = await usersRef.set(req.body);

        console.log(response);
        console.log(user);
        res.send(response);
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
}

let borrar = async function (req, res) {
    try {
        const response = await users.doc(req.body.id).delete();

        console.log(response);
        res.send(response);
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
}

module.exports = {
    list:list,
    get:get,
    update: update,
    create: create,
    delete: borrar
};