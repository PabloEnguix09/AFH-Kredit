function check_error(error, res) {
    if(error.code == 5 ) {
        res.status(404).send({message: "Usuario no existente"})
    }
    else if(error.code == 6 || error.code == "auth/email-already-exists") {
        res.status(400).send({message: "Usuario ya existente"})
    }
    else if(error.code == 404) {
        res.status(404).send({message: "Registro no existente"})
    }
    else {
        res.status(500).send(error);
    }
}

module.exports = {check_error}