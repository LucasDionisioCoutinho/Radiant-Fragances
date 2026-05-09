
import "./hero.css";

function Home() {
  return (
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
        <a href="paginas/catalago.html">
          <button className="btn-explorar">EXPLORAR CATÁLOGO</button>
        </a>
        <a href="paginas/catalagodecants.html">
          <button className="btn-decants">VER DECANTS</button>
        </a>
      </div>
    </section>
  );
}

export default Home;
