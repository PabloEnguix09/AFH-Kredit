const express = require("express");
const router = express.Router();

const user = require("./users/urls")
const documents = require("./documents/urls")
const mensajes = require("./messages/urls")

router.use("", user.routes)
router.use("", documents.routes)
router.use("", mensajes.routes)

module.exports = {
    routes: router
}