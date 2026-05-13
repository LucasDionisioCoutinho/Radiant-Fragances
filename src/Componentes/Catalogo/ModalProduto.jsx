import { useState } from "react";
import "./modal.css";

function ModalProduto({ produto, produtos, fecharModal, adicionarCarrinho }) {
  const [produtoAtual, setProdutoAtual] = useState(produto);
  const [quantidade, setQuantidade] = useState(1);

  if (!produto || !produtoAtual) return null;

  const desconto = produtoAtual.promocao ? (produtoAtual.desconto || 0) : 0;
  const precoComDesconto = Number(produtoAtual.preco) * (1 - desconto / 100);
  const precoTotal = (precoComDesconto * quantidade).toFixed(2);

  function selecionarDecant() {
    const idDecant = produtoAtual.id.replace("-100", "-10");
    const resultado = produtos.find((p) => p.id === idDecant);
    if (resultado) {
      setProdutoAtual(resultado);
      setQuantidade(1);
    }
  }

  function selecionar100ml() {
    const id100 = produtoAtual.id.replace("-10", "-100");
    const resultado = produtos.find((p) => p.id === id100);
    if (resultado) {
      setProdutoAtual(resultado);
      setQuantidade(1);
    }
  }

  function aumentarQtd() {
    setQuantidade((q) => q + 1);
  }

  function diminuirQtd() {
    setQuantidade((q) => (q > 1 ? q - 1 : 1));
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) fecharModal();
  }

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal-content">
        <span className="fechar" onClick={fecharModal}>×</span>

        <div className="modal-grid">
          <div className="modal-img-area">
            <img
              className="modal-img"
              src={produtoAtual.imagem}
              alt={produtoAtual.nome}
            />
          </div>

          <div className="modal-info-area">
            <h2>{produtoAtual.nome}</h2>
            <p>{produtoAtual.marca}</p>
            <p>{produtoAtual.descricao}</p>

            <div className="btns-tamanho">
              <button className="btn-tamanho" onClick={selecionarDecant}>
                10ml (Decant)
              </button>
              <button className="btn-tamanho100" onClick={selecionar100ml}>
                100ml
              </button>
            </div>

            <div className="controle-qtd">
              <button className="btn-menos" onClick={diminuirQtd}>−</button>
              <span className="numero-qtd">{quantidade}</span>
              <button className="btn-mais" onClick={aumentarQtd}>+</button>
            </div>

            {desconto > 0 && (
              <p className="modal-preco-original">
                R$ {(Number(produtoAtual.preco) * quantidade).toFixed(2)}
              </p>
            )}
            <p className="modal-preco">
              R$ {precoTotal}
              {desconto > 0 && (
                <span className="modal-badge-desconto"> -{desconto}% OFF</span>
              )}
            </p>

            <button
              className="btn-carrinho"
              onClick={() =>
                adicionarCarrinho({
                  ...produtoAtual,
                  preco: precoComDesconto,
                  quantidade,
                })
              }
            >
              Adicionar ao Carrinho
            </button>

            {produtoAtual.familiasOlfativas && (
              <div className="modal-familias">
                {produtoAtual.familiasOlfativas.map((f) => (
                  <span key={f} className="modal-familia-tag">{f}</span>
                ))}
              </div>
            )}

            {produtoAtual.notas && (
              <div className="modal-notas">
                <div className="modal-nota-grupo">
                  <span className="modal-nota-label">Topo</span>
                  <span className="modal-nota-itens">{produtoAtual.notas.topo.join(" · ")}</span>
                </div>
                <div className="modal-nota-grupo">
                  <span className="modal-nota-label">Coração</span>
                  <span className="modal-nota-itens">{produtoAtual.notas.coracao.join(" · ")}</span>
                </div>
                <div className="modal-nota-grupo">
                  <span className="modal-nota-label">Base</span>
                  <span className="modal-nota-itens">{produtoAtual.notas.base.join(" · ")}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalProduto;