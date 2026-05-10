import { Link } from "react-router-dom";
import { useState } from "react";
import "./menu.css";

function Menu({ totalItens = 0, abrirCarrinho }) {
  const [aberto, setAberto] = useState(false);

  function fecharMenu() {
    setAberto(false);
  }

  return (
    <nav className="menu">
      <div className="logo">
        <Link to="/" onClick={fecharMenu}>RADIANT</Link>
      </div>

      <ul className={`menu-lista ${aberto ? "ativo" : ""}`}>
        <li className="menu-item">
          <Link to="/catalogo" onClick={fecharMenu}>Catálogo</Link>
        </li>
        <li className="menu-item">
          <Link to="/promocoes" onClick={fecharMenu}>Promoções</Link>
        </li>
        <li className="menu-item">
          <Link to="/sobre" onClick={fecharMenu}>Sobre</Link>
        </li>
        <li className="menu-item">
          <Link to="/faq" onClick={fecharMenu}>FAQ</Link>
        </li>
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
          {aberto ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
}

export default Menu;