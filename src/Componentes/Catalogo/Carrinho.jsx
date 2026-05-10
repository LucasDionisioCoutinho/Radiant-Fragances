import { useState } from "react";
import cuponsData from "../../Data/cupons.json";
import "./carrinho.css";

const WHATSAPP_NUMERO = "5511916776355";

function Carrinho({ carrinho, abrirCarrinho, fecharCarrinho, removerItem }) {
  const [cupom, setCupom] = useState("");
  const [cupomAplicado, setCupomAplicado] = useState(null);
  const [erroCupom, setErroCupom] = useState("");

  function aplicarCupom() {
    const encontrado = cuponsData.find(
      (c) => c.codigo.toUpperCase() === cupom.toUpperCase()
    );
    if (encontrado) {
      setCupomAplicado(encontrado);
      setErroCupom("");
    } else {
      setCupomAplicado(null);
      setErroCupom("Cupom inválido.");
    }
  }

  function removerCupom() {
    setCupomAplicado(null);
    setCupom("");
    setErroCupom("");
  }

  const subtotal = carrinho.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  const descontoCupom = cupomAplicado
    ? subtotal * (cupomAplicado.desconto / 100)
    : 0;

  const total = subtotal - descontoCupom;

  function finalizarPedido() {
    if (carrinho.length === 0) return;

    const itens = carrinho
      .map(
        (item) =>
          `• ${item.nome} (${item.quantidade}x) — R$ ${(item.preco * item.quantidade).toFixed(2)}`
      )
      .join("\n");

    const cupomTexto = cupomAplicado
      ? `\nCupom: ${cupomAplicado.codigo} (-${cupomAplicado.desconto}%)\n`
      : "\n";

    const mensagem =
      `Olá! Gostaria de fazer um pedido:\n\n` +
      `${itens}\n` +
      `${cupomTexto}` +
      `*Total: R$ ${total.toFixed(2)}*`;

    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  }

  return (
    <div className={`modal-carrinho ${abrirCarrinho ? "ativo" : ""}`}>
      <div className="carrinho-conteudo">
        <span className="fechar-carrinho" onClick={fecharCarrinho}>✖</span>

        <h2>Seu Carrinho</h2>

        <div className="lista-carrinho">
          {carrinho.length === 0 ? (
            <p style={{ color: "#aaa", marginTop: "20px", textAlign: "center" }}>
              Seu carrinho está vazio.
            </p>
          ) : (
            carrinho.map((produto, index) => (
              <div className="item-carrinho" key={index}>
                <img src={produto.imagem} width="60" alt={produto.nome} />
                <div className="info-carrinho">
                  <p>{produto.nome}</p>
                  <p>R$ {produto.preco.toFixed(2)}</p>
                  <p>Qtd: {produto.quantidade}</p>
                </div>
                <button
                  className="btn-remover"
                  onClick={() => removerItem(index)}
                >
                  Remover
                </button>
              </div>
            ))
          )}
        </div>

        {/* CUPOM */}
        {carrinho.length > 0 && (
          <div className="carrinho-cupom">
            {cupomAplicado ? (
              <div className="cupom-aplicado">
                <span>✓ {cupomAplicado.codigo} — {cupomAplicado.desconto}% off</span>
                <button onClick={removerCupom}>✕</button>
              </div>
            ) : (
              <div className="cupom-input-wrapper">
                <input
                  type="text"
                  placeholder="Cupom de desconto"
                  value={cupom}
                  onChange={(e) => setCupom(e.target.value)}
                />
                <button onClick={aplicarCupom}>Aplicar</button>
              </div>
            )}
            {erroCupom && <p className="cupom-erro">{erroCupom}</p>}
          </div>
        )}

        {/* TOTAIS */}
        <div className="total-carrinho">
          {cupomAplicado && (
            <>
              <div className="total-linha">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="total-linha desconto">
                <span>Desconto</span>
                <span>- R$ {descontoCupom.toFixed(2)}</span>
              </div>
            </>
          )}
          <div className="total-linha total-final">
            <span>Total</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
        </div>

        <button className="btn-finalizar" onClick={finalizarPedido}>
          Finalizar Compra
        </button>
      </div>
    </div>
  );
}

export default Carrinho;