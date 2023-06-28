const express = require("express");
const api = require("./api");
const router = express.Router();

router.get("/mensajes/:userId", api.get);
router.post("/mensajes", api.send);

module.exports = {
    routes: router
}