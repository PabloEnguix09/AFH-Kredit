function checkIfScrollable(nombreClase) {
    let lista = document.getElementsByClassName(nombreClase)[0]
    let listaCss = window.getComputedStyle(document.getElementsByClassName(nombreClase)[0], "")
    
    if(lista.clientHeight > parseFloat(listaCss.maxHeight)) {
        lista.classList.add("listaScrollable")
    }
}

module.exports = {checkIfScrollable}