const { db, auth, storage } = require("../utils/firebase/admin");
const users = db.collection("usuarios");
const { check_error } = require("../utils/utils");
const Usuario = require("./models")

/**
 * 
 * @api {get} /users List users
 * @apiName List Users
 * @apiGroup Users
 * @apiVersion 1.0.0
 * 
 * @apiSuccess (200) {json[]} Usuarios List of users
 * @apiSuccessExample {json[]} Success-Response:
 * HTTP/1.1 200 OK 
 * {
 *      [
 *           {
 *              nombre:"Test",
 *              apellidos:"AFH Kredit",
 *              email:"test@afhkredit.com",
 *              photoURL: "/default-profile.png",
 *              rol:"Admin"
 *           },
 *           {
 *              nombre:"Otro",
 *              apellidos:"Usuario",
 *              email:"other@afhkredit.com",
 *              photoURL: "/default-profile.png",
 *              rol:"Usuario"
 *           }
 *      ]
 * }
 * 
 * @apiError (404) {json} UserNotFound There aren't any users
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *      message: "No hay usuarios"
 * }
 * 
 */
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
                    datos.photoURL,
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

/**
 * 
 * @api {get} /users/:id Get user by UUID
 * @apiName Get User
 * @apiGroup Users
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} id User's id
 * 
 * @apiParamExample  {type} Request-Example:
 * {
 *     id:"test@afhkredit.com"
 * }
 * 
 * @apiSuccess (200) {json} Usuario User
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK 
 * {
 *      {
 *         nombre:"Test",
 *         apellidos:"AFH Kredit",
 *         email:"test@afhkredit.com",
 *         photoURL:"/default-profile.png",
 *         rol:"Admin"
 *      }
 * }
 * 
 * @apiError (404) {json} UserNotFound The user's id was not found
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *      message: "Usuario no existente"
 * }
 * 
 */
let get = async function (req, res) {
        try {
            const userRef = db.collection("usuarios").doc(req.params.id);
            const response = await userRef.get();
            if(!response.exists){
                res.status(404).send({message: "Usuario no existente"})
            }
            else {
                const datos = response.data();
                res.status(200).send(new Usuario(
                    datos.id,
                    datos.nombre,
                    datos.apellidos,
                    datos.email,
                    datos.photoURL,
                    datos.rol
                ));
            }
        }
        catch (error) {
            check_error(error, res);
        }
}

/**
 * 
 * @api {post} /users/create Create User
 * @apiName Create User
 * @apiGroup Users
 * @apiVersion 1.0.0
 * 
 * @apiBody {String} nombre User's name
 * @apiBody {String} [apellidos] User's surname/s
 * @apiBody {String} email User's email (will be used as UUID)
 * @apiBody {String} rol User's role (used for permissions) Only "Usuario" or "Admin" are accepted now (case sensitive) 
 * 
 * @apiParamExample {json} Request body:
 * {
 *      nombre: "Test",
 *      apellidos: "AFH Kredit",
 *      email: "test@afhkredit.com",
 *      rol: "Usuario" 
 * }
 * 
 * @apiSuccess (200) {json} Usuario User
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK 
 * {
 *      message: "Usuario creado correctamente"
 * }
 * 
 * @apiError (400) {json} UserAlreadyExists There is already a user with that id or email
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 400 Bad Request
 * {
 *      message: "Usuario ya existente"
 * }
 * 
 */
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

            const usersRef = users.doc(req.body.email);
            response = await usersRef.create(req.body);

            res.status(201).send({message: "Usuario creado correctamente"})
        }
        catch (error) {
            check_error(error, res);
        }
}

/**
 * 
 * @api {put} /users/update Update User's Data
 * @apiName Update User Data
 * @apiGroup Users
 * @apiVersion 1.0.0
 * 
 * @apiBody {String} id User's UUID
 * @apiBody {String} [nombre] User's name
 * @apiBody {String} [apellidos] User's surname/s
 * @apiBody {String} [rol] User's role
 * 
 * @apiParamExample {json} Request body:
 * {
 *      id: "test@afhkredit.com",
 *      data: {
 *          apellidos: "Garcia Sanjuan",
 *          nombre: "Julian"
 *      }
 * }
 * 
 * @apiSuccess (204) UserUpdated
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 204 No Content
 * {}
 * 
 * @apiError (404) {json} UserNotFound The user's id was not found
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *      message: "Usuario no existente"
 * }
 * 
 */
let update = async function (req, res) {
    try {
        const usersRef = users.doc(req.body.id);
        const body = req.body.data;
        const response = await usersRef.update(body);
        
        res.status(204).send({});
    }
    catch (error) {
        check_error(error, res);
    }
}

/**
 * 
 * @api {delete} /users/delete Delete user
 * @apiName Delete User by UUID
 * @apiGroup Users
 * @apiVersion 1.0.0
 * 
 * @apiBody {String} id User's id
 * 
 * @apiSuccess (204) UserDeleted
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 204 No Content 
 * {}
 * 
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *      message: "Usuario no existente"
 * }
 * 
 */
let borrar = async function (req, res) {
    try {
        let response = await users.doc(req.body.id).delete();

        response = await auth.getUserByEmail(req.body.id).then(async (user) => {
            await auth.deleteUser(user.uid)
        })

        res.status(204).send({});
    }
    catch (error) {
        check_error(error, res);
    }
}

/**
 * 
 * @apiIgnore Method not done
 * 
 * @api {post} /users/login Login
 * @apiName Login
 * @apiGroup Users
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} paramName description
 * 
 * @apiSuccess (200) {type} name description
 * 
 * @apiParamExample  {type} Request-Example:
 * {
 *     property : value
 * }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *     property : value
 * }
 * 
 * 
 */
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
    const image = await storage.file("default-profile.png").cloudStorageURI.pathname
    return image
}

module.exports = {
    list:list,
    get:get,
    update: update,
    create: create,
    delete: borrar,
    login:login
};