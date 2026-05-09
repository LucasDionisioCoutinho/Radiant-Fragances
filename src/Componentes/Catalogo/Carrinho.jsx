import "./carrinho.css";

const WHATSAPP_NUMERO = "5511916776355"; 

function Carrinho({ carrinho, abrirCarrinho, fecharCarrinho, removerItem }) {
  const total = carrinho.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  function finalizarPedido() {
    if (carrinho.length === 0) return;

    const itens = carrinho
      .map(
        (item) =>
          `• ${item.nome} (${item.quantidade}x) — R$ ${(item.preco * item.quantidade).toFixed(2)}`
      )
      .join("\n");

    const mensagem =
      `Olá! Gostaria de fazer um pedido:\n\n` +
      `${itens}\n\n` +
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

        <div className="total-carrinho">
          <span>Total:</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>

        <button className="btn-finalizar" onClick={finalizarPedido}>
          Finalizar Compra
        </button>
      </div>
    </div>
  );
}

export default Carrinho;