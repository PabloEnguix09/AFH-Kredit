function check_error(error) {
    if(error.code == 5 ) {
        return {
            status: 404,
            data: {message: "Usuario no existente"}
        }
    }
    else if(error.code == 6 || error.code == "auth/email-already-exists") {
        return {
            status: 400,
            data: {message: "Usuario ya existente"}
        }
    }
    else if(error.code == 404) {
        return {
            status: 404,
            data: {message: "Registro no existente"}
        }
    }
    else {
        return {
            status: 500,
            data: error
        }
    }
}

module.exports = {check_error}