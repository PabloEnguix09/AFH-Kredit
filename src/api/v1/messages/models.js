const {DocumentoAPI} = require("../documents/models")
const documentAPI = new DocumentoAPI()
const {v4} = require('uuid');
const { realtime } = require("../utils/firebase/admin");
const { check_error } = require("../utils/utils");


class Mensaje {
    constructor(id, cliente, agente, isClienteSender, contenido, fecha, media) {
        this.id = id;
        this.cliente = cliente;
        this.agente = agente;
        this.isClienteSender = isClienteSender;
        this.contenido = contenido;
        this.fecha = fecha;
        if(media != null)
            this.media = media;
        else
            this.media = null
    }
}

class MensajeAPI {

    addListener = async function (req) {
        return new Promise(async(resolve, reject) => {
            try {
                realtime.ref("/mensajes/" + req.params.uid).on("value", (snapshot) => {
                    console.log(snapshot);
                    console.log("mensaje");
                    resolve({
                        status:200,
                        data:snapshot.val()
                    })
                })
            } catch (error) {
                resolve(check_error(error))
            }
        })
    }

    getAll = async function (req) {
        return new Promise(async(resolve, reject) => {
            try {
                console.log("get mensajes");
                let chats = await realtime.ref("mensajes/").get()
                let conversaciones = []
                chats.forEach(chat => {
                    let key = chat.key
                    let conversacion = [];
                    let keys = Object.keys(chat.toJSON())
                    keys.forEach((key) => {
                        if(chat.toJSON()[key].agente == req.params.userId || chat.toJSON()[key].cliente == req.params.userId) {
                            conversacion.push(chat.toJSON())
                        }
                    })
                    if(conversacion.length != 0) {
                        conversaciones.push({[key]:conversacion});
                    }
                });
                console.log("conversaciones recogidas");
                resolve({
                    status:200,
                    data: conversaciones
                })
            } catch (error) {
                resolve(check_error(error))
            }
        })
    }

    create = async function (req) {
        return new Promise(async (resolve, reject) => {
            try {
                let mensaje = "";
                console.log("creando mensaje");
                if(Object.keys(req.body.media).length != 0) {
                    console.log("hay adjunto");
                    let documentRequestData = {
                        body: req.body.media,
                        params: {
                            id: req.body.cliente
                        }
                    }
                    await documentAPI.create(documentRequestData).then(async(response) => {
                        if(response.status == 404) {
                            resolve({
                                status: 404,
                                data: {message: "Error al adjuntar el archivo"}
                            })
                        }
                        else {
                            let data = {
                                body: {},
                                params: {
                                    id: req.body.cliente,
                                    nombre: req.body.media.name
                                }
                            }
                            await documentAPI.get(data).then((response) => {
                                mensaje = new Mensaje(
                                    Date.now().toString() + v4(),
                                    req.body.cliente,
                                    req.body.agente,
                                    req.body.isClienteSender,
                                    req.body.texto,
                                    Date.now(),
                                    response.data.contenido
                                    );
                            })
                        }
                    })

                }
                else {
                    console.log("NO hay adjunto");
                    mensaje = new Mensaje(
                        Date.now().toString() + v4(),
                        req.body.cliente,
                        req.body.agente,
                        req.body.isClienteSender,
                        req.body.texto,
                        Date.now(),
                        null
                        );
                }
                realtime.ref("mensajes/"+req.body.chatId+"/"+mensaje.id).set(mensaje);
            
                resolve({
                    status: 201,
                    data: {message: "Mensaje enviado con exito"}
                })
            } catch (error) {
                resolve(check_error(error))
            }
        })
    }
}

module.exports = {Mensaje, MensajeAPI}