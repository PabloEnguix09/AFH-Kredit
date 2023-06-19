const express = require("express");
const api = require("./api");
const router = express.Router();

router.get("/users/:id/documents", api.list);
router.get("/users/:id/documents/:nombre", api.get);
router.post("/users/:id/documents/new", api.create);
router.delete("/users/:id/documents/:nombre/delete", api.delete);

module.exports = {
    routes: router
}