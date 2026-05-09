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
              <li>Catálogo</li>

              <li>Promoções</li>

              <li>Lançamentos</li>
              <li>Mais Vendidos</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>INSTITUCIONAL</h4>

            <ul>
              <li>Sobre</li>
              <Link to="/faq">
                <li>FAQ</li>
              </Link>
              <li>Políticas</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>CONTATO</h4>

            <ul>
              <li>fragancesradiant@gmail.com</li>
              <li>WhatsApp: (11) 916776355</li>
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
