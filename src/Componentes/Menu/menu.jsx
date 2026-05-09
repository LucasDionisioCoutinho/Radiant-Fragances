import { Link } from "react-router-dom";
import { useState } from "react";
import "./menu.css";

function Menu({ totalItens = 0, abrirCarrinho }) {
  const [aberto, setAberto] = useState(false);

  return (
    <nav className="menu">
      <div className="logo">
        <Link to="/">RADIANT</Link>
      </div>

      <ul className={`menu-lista ${aberto ? "ativo" : ""}`}>
        <li className="menu-item"><Link to="/catalogo">Catálogo</Link></li>
        <li className="menu-item"><Link to="/promocoes">Promoções</Link></li>
        <li className="menu-item"><Link to="/sobre">Sobre</Link></li>
        <li className="menu-item"><Link to="/faq">FAQ</Link></li>
      </ul>

      <div className="direita">
        <div
          className="carrinhoCompras"
          onClick={abrirCarrinho}
          style={{ cursor: "pointer" }}
        >
          <i className="fa-solid fa-bag-shopping"></i>
          <span className="contadorCarrinho">{totalItens}</span>
        </div>

        <button className="menu-toggle" onClick={() => setAberto(!aberto)}>
          ☰
        </button>
      </div>
    </nav>
  );
}

export default Menu;