function checkIfScrollable(nombreClase) {
    let lista = document.getElementsByClassName(nombreClase)[0]
    let listaCss = window.getComputedStyle(document.getElementsByClassName(nombreClase)[0], "")
    
    console.log(lista.clientHeight);
    console.log(listaCss.maxHeight);
    if(lista.clientHeight > parseFloat(listaCss.maxHeight)) {
        lista.classList.add("listaScrollable")
    }
}

module.exports = {checkIfScrollable}