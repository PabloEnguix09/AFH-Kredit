import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import FormularioContacto from '../components/contacto/Contacto';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Contacto() {

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
          <FormularioContacto setUrl={setUrl} />
          <Footer />
      </div>
  )
}

export default Contacto