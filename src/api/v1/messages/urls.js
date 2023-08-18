const express = require("express");
const api = require("./api");
const router = express.Router();

router.get("/mensajes/:userId", api.get);
router.post("/mensajes", api.send);

router.get("/mensajes/listen/:uid", api.listen)

module.exports = {
    routes: router
}