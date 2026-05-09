import { useState } from "react";
import "./modal.css";

function ModalProduto({ produto, produtos, fecharModal, adicionarCarrinho }) {
  const [produtoAtual, setProdutoAtual] = useState(produto);
  const [quantidade, setQuantidade] = useState(1);

  if (!produto || !produtoAtual) return null;

  const precoTotal = (Number(produtoAtual.preco) * quantidade).toFixed(2);

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

            <p className="modal-preco">R$ {precoTotal}</p>

            <button
              className="btn-carrinho"
              onClick={() => adicionarCarrinho({ ...produtoAtual, quantidade })}
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalProduto;