import "./faq.css";
import { useState } from "react";
import respostas from "../../../Data/faq.json";
import SEO from "../../../Componentes/SEO/SEO.jsx";

function Faq() {
  const [aberta, setAberta] = useState(null);

  return (
    <main>
      <SEO
        titulo="FAQ"
        descricao="Dúvidas frequentes sobre pedidos, entregas e produtos da Radiant Fragrances."
      />

      <section id="perguntas-respostas">
        <div className="container">
          <div>
            <h2>Dúvidas</h2>
            <h1>Perguntas Frequentes</h1>
          </div>

          {respostas.map((item, index) => (
            <div className="card-perguntas" key={index}>
              <div
                className="container-perguntas"
                onClick={() => setAberta(aberta === index ? null : index)}
              >
                <p className="p-pergunta">{item.pergunta}</p>
                <p className={`p-resposta ${aberta === index ? "ativo" : ""}`}>
                  {item.resposta}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Faq;