import TarjetaContacto from "./chat/TarjetaContacto";
import buscar from "../../../img/application/buscar.svg"
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import styles from "../../../css/application/App.module.css"
import Cookies from "js-cookie";
import { IContactoDatos } from "../../../types/app.types";

interface Props {
    contactoSelected: string,
    setContactoSelected: Dispatch<SetStateAction<string>>,
    imgContactos: string,
    contactos: any[] | undefined
}

interface RegistroTabla {
    nombre : number
}

interface Tabla {
    displayName: string,
    valores: RegistroTabla[],
    uid:string
}

function checkIfScrollable() {
    let buscador = document.getElementsByClassName(styles.listaContactos)[0]
    let buscadorCss = window.getComputedStyle(document.getElementsByClassName(styles.listaContactos)[0], "")
    
    if(buscador.clientHeight > parseFloat(buscadorCss.maxHeight)) {

        buscador.classList.add(styles.listaScrollable)
    }
}

function isIContactoDatos(object: IContactoDatos | Tabla): object is IContactoDatos {
    return "imagen" in object
}

function Buscador({contactoSelected, setContactoSelected, imgContactos, contactos}: Props) {
    
    const [deviceWidth, setDeviceWidth] = useState(window.innerWidth)
    const [condicionDisplay, setCondicionDisplay] = useState(contactoSelected === "" && deviceWidth <= 768)


    useEffect(() => {
        checkIfScrollable()
        window.addEventListener("resize", () => setDeviceWidth(window.innerWidth))
        setCondicionDisplay(contactoSelected === "" && deviceWidth <= 768)
        
    }, [deviceWidth, contactoSelected])

    let uid = Cookies.get("uid")

    const [userName, setUserName] = useState("")

    const handleBuscar = async (username: string) => {

        setUserName(username)
        let listaContactos = document.getElementsByClassName(styles.tarjetaContacto)
        
        if(username !== "") {
            
            for (let i = 0; i < listaContactos.length; i++) {
                const contacto = listaContactos[i];
                let nombre = contacto.getElementsByClassName("nombreContacto")[0]
                
                if(!nombre.innerHTML.toLowerCase().includes(username.toLowerCase())) {                    
                    contacto.classList.add(styles.oculto)
                }
                else if(contacto.classList.contains(styles.oculto)) {
                    contacto.classList.remove(styles.oculto)
                }
            }
        }
        if(username === "") {            
            for (let i = 0; i < listaContactos.length; i++) {
                const contacto = listaContactos[i];
                if(contacto.classList.contains(styles.oculto)) {
                    contacto.classList.remove(styles.oculto)
                }
            }
        }
    }    

    return(
        <div>
            <div className={styles.buscador}>
                <div className={styles.buscadorInput}>
                    <input type="text" className={styles.buscarInput} placeholder="Buscar..." onChange={e => {handleBuscar(e.target.value)}} value={userName}/>
                    <img src={buscar} alt="Icono buscar" />
                </div>
                <div className={styles.listaContactos}>
                    {
                        document.getElementsByClassName(styles.tarjetaContacto).length !== undefined
                        ?
                        contactos?.map((contacto : IContactoDatos | Tabla) => {
                            let img = ""
                            if(isIContactoDatos(contacto)) {
                                img = contacto.imagen
                            }
                            else {
                                img = "none"
                            }
                            return <TarjetaContacto imagenContacto={img} nombre={contacto.displayName} noLeidos={0} selected={contactoSelected} setSelected={setContactoSelected} key={contacto.uid + "-" + uid} />
                        })
                        :
                        <></>
                    }
                </div>
            </div>
            <div className={styles.buscadorMovil} style={{display: condicionDisplay ? 'flex' : 'none'}}>
                <div className={styles.buscadorInput}>
                    <input type="text" className={styles.buscarInput} placeholder="Buscar..." onChange={e => {handleBuscar(e.target.value)}} value={userName}/>
                    <img src={buscar} alt="Icono buscar" />
                </div>
                <div className={styles.listaContactos}>
                    {
                        document.getElementsByClassName(styles.tarjetaContacto).length !== undefined
                        ?
                        contactos?.map((contacto : IContactoDatos | Tabla) => {
                            let img = ""
                            if(isIContactoDatos(contacto)) {
                                img = contacto.imagen
                            }
                            else {
                                img = "none"
                            }
                            return <TarjetaContacto imagenContacto={img} nombre={contacto.displayName} noLeidos={0} selected={contactoSelected} setSelected={setContactoSelected} key={contacto.uid + "-" + uid} />
                        })
                        :
                        <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default Buscador