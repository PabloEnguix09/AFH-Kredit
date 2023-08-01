import Empezamos from "./components/footer/Empezamos"
import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"
import Resumen from "./components/simulador/Resumen"
import SimuladorFormulario from "./components/simulador/SimuladorFormulario"

function Simulador() {

    return(
        <div>
            <Navbar />
            <h1>Simula tu hipoteca</h1>

            <SimuladorFormulario />
            <Empezamos />
            <Footer />
        </div>
    )
}

export default Simulador