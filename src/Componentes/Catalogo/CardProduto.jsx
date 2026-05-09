function CardProduto({ produto, abrirModal }) {
  return (
    <div
      className="card-produto"
      onClick={() => abrirModal(produto)}
    >
      <div className="div-catalago">

        <img
          className="img-catalago"
          src={produto.imagem}
          alt={produto.nome}
        />

        <h3 className="h3-catalago">
          {produto.nome}
        </h3>

        <p className="marca">
          {produto.marca}
        </p>

        <span className="preco">
          R$ {produto.preco.toFixed(2)}
        </span>

      </div>
    </div>
  );
}

export default CardProduto;