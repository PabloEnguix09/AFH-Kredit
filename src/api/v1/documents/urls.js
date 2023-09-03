const express = require("express");
const api = require("./api");
const router = express.Router();

router.get("/documents/localFile/:relPath/:name", api.getLocalFile);

module.exports = {
    routes: router
}