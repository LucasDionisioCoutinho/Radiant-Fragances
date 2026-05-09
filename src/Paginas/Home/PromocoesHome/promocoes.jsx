import { useNavigate } from "react-router-dom";
import perfumes from "../../../Data/produtos.json";
import "./promocoes.css";

function Promocoes() {
  const navigate = useNavigate();

  const perfumesFiltrados = perfumes
    .filter((p) => p.promocao)
    .slice(0, 3);

  function calcularPrecoFinal(produto) {
    const desconto = produto.desconto || 0;
    return produto.preco * (1 - desconto / 100);
  }

  return (
    <section className="perfumes-destaques-container">
      <p className="p-destaque">PERFUMES</p>
      <h1 className="h1-destaque">EM PROMOÇÃO</h1>

      <div className="perfumes-destaques">
        {perfumesFiltrados.map((perfume) => (
          <div
            className="card-perfume"
            key={perfume.id}
            onClick={() => navigate("/promocoes")}
            style={{ cursor: "pointer" }}
          >
            <div className="perfume-img">
              <img src={perfume.imagem} alt={perfume.nome} />
            </div>

            {perfume.desconto && (
              <span className="badge-desconto">{perfume.desconto}% OFF</span>
            )}

            <p className="perfume-marca">{perfume.marca}</p>
            <h3 className="perfume-nome">{perfume.nome}</h3>

            <div className="perfume-precos">
              {perfume.precoOriginal && (
                <span className="perfume-preco-original">
                  R$ {perfume.precoOriginal.toFixed(2)}
                </span>
              )}
              <span className="perfume-preco">
                R$ {calcularPrecoFinal(perfume).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="btn-perfumes-destaques">
        <button
          className="btn-perfumes"
          onClick={() => navigate("/promocoes")}
        >
          VER TODO O CATÁLOGO
        </button>
      </div>
    </section>
  );
}

export default Promocoes;