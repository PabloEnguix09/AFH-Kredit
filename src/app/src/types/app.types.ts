import { DocumentData } from "firebase/firestore"

export interface IContactoDatos {
    displayName : string,
    uid: string,
    key: string,
    imagen: string,
    conversacionUID: string
}

export interface IConversacionInterfaz {
    uid: string,
    mensajes: DocumentData
}