import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import FormularioEstudio from '../components/contacto/Estudio';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Datos {
    titular: string,
    edad: string,
    ingresos: string,
    deudas: string,
    sabeCasa: string,
    precio: string,
    provincia: string,
    quiereCasa: string,
    uso: string,
    tipoVivienda: string,
    anyos: string,
}

function Estudio() {

    let [searchParams] = useSearchParams()
    let datos : Datos = {
        titular: "",
        edad: "",
        ingresos: "",
        deudas: "",
        sabeCasa: "",
        precio: "",
        provincia: "",
        quiereCasa: "",
        uso: "",
        tipoVivienda: "",
        anyos: ""
    }

    if(searchParams.get("data") !== null) {
        datos = JSON.parse(searchParams.get("data")!)
    }

    const [url, setUrl] = useState("")
    let navigate = useNavigate()

    useEffect(() => {
      
        if(url !== "") {            
            navigate(url)
        }
    }, [url, navigate])
    
  return(
      <div>
          <Navbar />
          <FormularioEstudio simulado={true} titulares={datos.titular} edad={datos.edad} ingresos={datos.ingresos} deudas={datos.deudas} sabeCasa={datos.sabeCasa} precio={datos.precio} provincia={datos.provincia} quiereCasa={datos.quiereCasa} uso={datos.uso} tipoVivienda={datos.tipoVivienda} anyos={datos.anyos} setUrl={setUrl}/>
          <Footer />
      </div>
  )
}

export default Estudio