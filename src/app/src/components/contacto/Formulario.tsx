import styles from "./FormularioContacto.module.css"

function Formulario() {
    return(
        <form className={styles.formulario} action="">
            <h2>Rellena el formulario</h2>
            <div className={styles.datos}>
                <input type="text" id="nombre" name="Nombre" placeholder="Nombre*" required/>
                <input type="text" id="apellidos" placeholder="Apellidos" />
                <input type="text" id="correo" placeholder="Correo electrónico*" required/>
                <input type="text" id="telefono" placeholder="Teléfono" />
                <textarea id="descripcion" cols={30} rows={10} placeholder="Descripción*" required></textarea>

                <div>
                    <input type="checkbox" name="checkbox" id={styles.checkbox} required/>
                    <label htmlFor="checkbox">He leído y acepto la política de privacidad y las condiciones de uso*</label>
                </div>

                <button>ENVIAR</button>
            </div>
        </form>
    )
}

export default Formulario