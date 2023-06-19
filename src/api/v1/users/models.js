class Usuario {
    constructor(id, nombre, apellidos, email, photoURL, rol) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.photoURL = photoURL;
        this.rol = rol;
    }
}

module.exports = Usuario;