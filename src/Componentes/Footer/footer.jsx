import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-col">
            <h3 className="footer-logo">RADIANT</h3>
            <p>
              Perfumes importados, nacionais e decants.
              <br />
              Experiência sensorial e sofisticação.
            </p>
          </div>

          <div className="footer-col">
            <h4>NAVEGAÇÃO</h4>
            <ul>
              <li><Link to="/catalogo">Catálogo</Link></li>
              <li><Link to="/promocoes">Promoções</Link></li>
              <li><Link to="/catalogo">Lançamentos</Link></li>
              <li><Link to="/catalogo">Mais Vendidos</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>INSTITUCIONAL</h4>
            <ul>
              <li><Link to="/sobre">Sobre</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/faq">Políticas</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>CONTATO</h4>
            <ul>
              <li>
                <a href="mailto:fragancesradiant@gmail.com">
                  fragancesradiant@gmail.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/5511916776355" target="_blank" rel="noreferrer">
                  WhatsApp: (11) 916776355
                </a>
              </li>
              <li>Seg a Sex, 9h às 18h</li>
            </ul>
          </div>
        </div>
      </footer>

      <div className="copy">
        <p>© 2026 Radiant Fragrances. Todos os direitos reservados.</p>
      </div>
    </>
  );
}

export default Footer;