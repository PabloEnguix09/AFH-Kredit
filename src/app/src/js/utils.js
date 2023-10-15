function checkIfScrollable(nombreClase) {
    let lista = document.getElementsByClassName(nombreClase)[0]
    let listaCss = window.getComputedStyle(document.getElementsByClassName(nombreClase)[0], "")
    
    if(lista.clientHeight > parseFloat(listaCss.maxHeight)) {
        lista.classList.add("listaScrollable")
    }
}

function ScrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

module.exports = {checkIfScrollable, ScrollToTop}