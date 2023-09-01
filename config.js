const dotenv = require("dotenv")
const assert = require("assert")

dotenv.config()

const {
    PORT,
    HOST,
    HOST_URL,
    EMAIL_USER,
    EMAIL_PASS
} = process.env;

assert(PORT, "Especifica el puerto");
assert(HOST_URL, "Especifica la URL");

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL
};