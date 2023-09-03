const {UsuarioAPI} = require("./models");
const api = new UsuarioAPI();

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
    
    let body = {
        body: req.body,
        params: req.params
    }
    let response = await api.getAll(body)
    res.status(response.status).send(response.data)

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
    let body = {
        body: req.body,
        params: req.params
    }
    let response = await api.get(body)
    res.status(response.status).send(response.data)
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
    let body = {
        body: req.body,
        params: req.params
    }
    let response = await api.create(body)
    res.status(response.status).send(response.data)
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
    let body = {
        body: req.body,
        params: req.params
    }
    let response = await api.update(body)
    res.status(response.status).send(response.data)
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
    let body = {
        body: req.body,
        params: req.params
    }
    let response = await api.delete(body)
    res.status(response.status).send(response.data)
}

let sendContactMail = async function (req, res) {
    let body = {
        body: req.body,
        params: req.params
    }
    let response = await api.sendEmail(body)
    res.status(response.status).send(response.data)
}



module.exports = {
    list:list,
    get:get,
    update: update,
    create: create,
    delete: borrar,
    sendEmail: sendContactMail
};