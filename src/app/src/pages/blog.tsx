
import Titular from "../components/blog/titular"
import Footer from "../components/footer/Footer"
import Navbar from "../components/navbar/Navbar"
import styles from "../css/blog.module.css"

function Blog() {
  return(
      <div>
          <Navbar />
          <h1>Blog</h1>
          <div className={styles.noticias}>
            <Titular imageUrl={''} titulo={'Trucos y consejos para ahorrar en tu hipoteca'} subtitulo={'En este artículo te mostraremos los diferentes trucos que los bancos no quieren que sepas para ahorrar en tu hipoteca. Desde adelantar dinero hasta defraudar a Hacienda, cuando acabes de leer esto descubrirás la mejor forma de ahorrar en tu hipoteca'} autor={'M.R. Periodista, EL PAÍS'} fecha={new Date()} />
            <Titular imageUrl={''} titulo={'Trucos y consejos para ahorrar en tu hipoteca'} subtitulo={'En este artículo te mostraremos los diferentes trucos que los bancos no quieren que sepas para ahorrar en tu hipoteca. Desde adelantar dinero hasta defraudar a Hacienda, cuando acabes de leer esto descubrirás la mejor forma de ahorrar en tu hipoteca'} autor={'M.R. Periodista, EL PAÍS'} fecha={new Date()} />
            <Titular imageUrl={''} titulo={'Trucos y consejos para ahorrar en tu hipoteca'} subtitulo={'En este artículo te mostraremos los diferentes trucos que los bancos no quieren que sepas para ahorrar en tu hipoteca. Desde adelantar dinero hasta defraudar a Hacienda, cuando acabes de leer esto descubrirás la mejor forma de ahorrar en tu hipoteca'} autor={'M.R. Periodista, EL PAÍS'} fecha={new Date()} />
            <Titular imageUrl={''} titulo={'Trucos y consejos para ahorrar en tu hipoteca'} subtitulo={'En este artículo te mostraremos los diferentes trucos que los bancos no quieren que sepas para ahorrar en tu hipoteca. Desde adelantar dinero hasta defraudar a Hacienda, cuando acabes de leer esto descubrirás la mejor forma de ahorrar en tu hipoteca'} autor={'M.R. Periodista, EL PAÍS'} fecha={new Date()} />
          </div>
          <Footer />
      </div>
  )
}

export default Blog