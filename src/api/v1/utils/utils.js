function check_error(error, res) {
    console.log(error);
    if(error.code == 5) {
        res.status(404).send({message: "Usuario no existente"})
    }
    else if(error.code == 6) {
        res.status(400).send({message: "Usuario ya existente"})
    }
    else {
        res.status(500).send(error);
    }
}

module.exports = {check_error}