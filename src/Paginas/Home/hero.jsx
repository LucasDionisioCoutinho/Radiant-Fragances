import { Link } from "react-router-dom";
import SEO from "../../Componentes/SEO/SEO.jsx";
import "./hero.css";

function Home() {
  return (
    <>
      <SEO />

      <section className="secaoPrincipal">
        <div className="imgfundo"></div>

        <p className="p-principal">FRAGRÂNCIAS DE LUXO</p>

        <h1 className="h1-titulo">
          Radiant <span>Fragrances</span>
        </h1>

        <p className="p-texto">
          Perfumes importados, nacionais e decants.
          <span>Descubra fragrâncias que revelam a sua essência.</span>
        </p>

        <div className="div-botoes">
          <Link to="/catalogo">
            <button className="btn-explorar">EXPLORAR CATÁLOGO</button>
          </Link>
          <Link to="/promocoes">
            <button className="btn-decants">PROMOÇÕES</button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;