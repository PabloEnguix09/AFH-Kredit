import { IProvincia } from "../types/simulador.types"
import { Buffer } from "buffer";
window.Buffer = window.Buffer || Buffer;

class SimuladorAPI {
    verCSV = async () => {
        let relPath = Buffer.from("src/app/public/", "ascii").toString("base64")
        let name = Buffer.from("codprov.csv", "ascii")
        let hostname = window.location.hostname
        
        
        
        let respuesta = await fetch(`http://${hostname}:5050/api/documents/localFile/${relPath}/${name}`)
        .then(response => response.json())
        .then(data => {
            let provincias : [] = data[0].split("\r\n")
            let arrayProvincias : IProvincia[] = []
            provincias.forEach((provincia : string) => {
                let [codigo, nombre] = provincia.split(",")
                arrayProvincias.push({codigo: codigo.replaceAll("\"", ""), provincia: nombre.replaceAll("\"", "")})
            });
    
            return arrayProvincias
    
        })
    
        return respuesta
    }
}

export default SimuladorAPI