const {MensajeAPI} = require("./models");
const api = new MensajeAPI()

let send = async(req, res) => {
    let body = {
        body: req.body,
        params: req.params
    }
    await api.create(body).then((response) => {
        res.status(response.status).send(response.data)
    })
}

let receive = async(req, res) => {
    let body = {
        body: req.body,
        params: req.params
    }
    await api.getAll(body).then((response) => {
        console.log(response);
        res.status(response.status).send(response.data)
    })
}

let listen = async(req, res) => {
    let body = {
        body: req.body,
        params: req.params
    }

    await api.addListener(body).then((response) => {
        res.status(response.status).send(response.data)
    })
}

module.exports = {
    send:send,
    get:receive,
    listen: listen
}