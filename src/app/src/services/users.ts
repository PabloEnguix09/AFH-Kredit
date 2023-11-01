import { setPersistence, browserSessionPersistence, signInWithEmailAndPassword, signInWithPopup, GithubAuthProvider, UserCredential, deleteUser } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";
import { auth, googleProvider, fbProvider, db, storage } from "../js/firebaseApp";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import Cookies from "js-cookie";
import { IContactoDatos, IConversacionInterfaz } from "../types/app.types";
import { getDownloadURL, listAll, ref } from "firebase/storage";

const hostname = window.location.hostname

class UsuarioAPI {
    enviarFormulario = async (nombre: string, apellidos: string, correo: string, telefono: string, descripcion: string, setUrl: Dispatch<SetStateAction<string>>) => {
        let body = {
            nombre: nombre,
            apellidos: apellidos,
            correo: correo,
            telefono: telefono,
            descripcion: descripcion
        }
        
        await fetch(`http://${hostname}:5050/api/sendContactMail`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(() => {
            
            alert("Correo enviado")
            setUrl("/")
        }).catch((error) => {
            console.log(error);
        })
    }

    login = async (email: string, password: string, setUrl: Dispatch<SetStateAction<string>>, method:string, setErrText:Dispatch<SetStateAction<string>>) => {
    
        setErrText("")
        setPersistence(auth, browserSessionPersistence).then(() => {
            switch(method) {
                case "email":
                    return signInWithEmailAndPassword(auth, email, password).then(async(credentials) => {
                        await this.redirect(setUrl, credentials)
                    }).catch(error => {                    
                        if(error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
                            setErrText("El usuario o la contraseña son incorrectos, por favor, inténtelo de nuevo")
                        }
                        else {
                            console.log(error);
                            
                            setErrText("Ha habido un problema al iniciar sesión. Inténtelo de nuevo más tarde")
                        }
                    })
                case "google":
                    return signInWithPopup(auth, googleProvider).then(async(credentials) => {
                        this.getUsuarioExistente(credentials.user.email!).then(async(userExists) => {
                            if (userExists) {
                                await this.redirect(setUrl, credentials)
                            }
                            else {
                                deleteUser(credentials.user)
                                setErrText("El usuario especificado no existe. Inténtelo más tarde o espere a la respuesta vía e-mail")
                            }
                        })
                    }).catch(error => {
                        if(error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
                            setErrText("El usuario o la contraseña son incorrectos, por favor, inténtelo de nuevo")
                        }
                        else {
                            setErrText("Ha habido un problema al iniciar sesión. Inténtelo de nuevo más tarde")
                            setErrText(error.code)
                        }
                    })
                case "facebook":
                    return signInWithPopup(auth, fbProvider).then(async(credentials) => {
                        await this.redirect(setUrl, credentials)
                    }).catch(error => {
                        if(error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
                            setErrText("El usuario o la contraseña son incorrectos, por favor, inténtelo de nuevo")
                        }
                        else {
                            setErrText("Ha habido un problema al iniciar sesión. Inténtelo de nuevo más tarde")
                        }
                    })  
                case "apple":
                    //TODO: Provider apple
                    return signInWithPopup(auth, new GithubAuthProvider()).then(async(credentials) => {
                        await this.redirect(setUrl, credentials)
                    }).catch(error => {
                        if(error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
                            setErrText("El usuario o la contraseña son incorrectos, por favor, inténtelo de nuevo")
                        }
                        else {
                            setErrText("Ha habido un problema al iniciar sesión. Inténtelo de nuevo más tarde")
                        }
                    })
                default:
                    return
            }
        }).catch(error => {
            console.log(error);
            
        })
    }

    redirect = async (setUrl: Dispatch<SetStateAction<string>>, credentials: UserCredential) => {

        if(credentials.user) {
            let userRef = doc(db, "usuarios", credentials.user.email!)
            await getDoc(userRef).then(async(res) => {
    
                Cookies.set("uid", await credentials.user.getIdToken())
                Cookies.set("rol", res.data()!.rol)
        
                setUrl(res.data()!.rol === "Admin" ? "../app/admin" : "../app/user")
            })
            
        }
        else {
            alert("Usuario no encontrado. Inténtelo de nuevo")
        }
    }

    getContactos = async(uid: string, setContactos: Dispatch<SetStateAction<IContactoDatos[]>>, setConversaciones: Dispatch<SetStateAction<IConversacionInterfaz[]>>) => {
        await getDocs(query(collection(db, "usuarios"), where("email", "==", uid))).then(async(res) => {
            let user = res.docs[0].data()
            let contactos : IContactoDatos[] = []
            let conversaciones : IConversacionInterfaz[] = []
            for (let i = 0; i < user.contactos.length; i++) {
                await getDocs(query(collection(db, "usuarios"), where("email", "==", user.contactos[i]))).then(async(res) => {
                    let contacto = res.docs[0].data()
                    let key = contacto.rol === "Admin" ? contacto.email + "-"+uid : uid + "-" + contacto.email
                    await getDoc(doc(db, "chats", key)).then(async(res) => {
                        if(res.exists()) {
                            await this.getImagen(contacto.email).then((imagen) => {
                                contactos.push({displayName: contacto.nombre + " " + contacto.apellidos, uid: contacto.email, imagen: imagen, key:key, conversacionUID: res.id})
                                conversaciones.push({uid: res.id, mensajes: res.data()}) 
    
                                if(user.contactos.length === contactos.length) {                                    
                                    setContactos(contactos)
                                    setConversaciones(conversaciones)
                                }
                            })
                        }
                    })
                })              
            }
        })
    }

    getImagen = async(uid: string) => {
        
        return await listAll(ref(storage, "fotosPerfil")).then(async(res) => {
            let imagenUrl = ""
            for (let i = 0; i < res.items.length; i++) {
                const element = res.items[i];
                if(element.name === uid) {
                    imagenUrl = await getDownloadURL(element)
                }
            }
            return imagenUrl
        })
    }

    getUsuarioExistente = async(email: string) => {
        let userRef = doc(db, "usuarios", email)
        let data = (await getDoc(userRef)).data()
        return data !== undefined
    }
}

export default UsuarioAPI