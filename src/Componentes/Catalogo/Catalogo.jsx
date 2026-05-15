import { useState, useEffect } from "react";
import produtosData from "../../Data/produtos.json";
import CardProduto from "./CardProduto";
import ModalProduto from "./ModalProduto";
import SEO from "../SEO/SEO.jsx";
import "./catalogo.css";

function Catalogo({ adicionarCarrinho, setCarrinhoAberto }) {
  const produtos = produtosData;
  const perfumes100ml = produtos.filter((produto) => produto.id?.endsWith("-100"));

  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [busca, setBusca] = useState("");
  const [produtosFiltrados, setProdutosFiltrados] = useState(perfumes100ml);

  useEffect(() => {
    document.body.style.overflow = produtoSelecionado ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [produtoSelecionado]);

  function abrirModal(produto) { setProdutoSelecionado(produto); }
  function fecharModal() { setProdutoSelecionado(null); }

  function handleAdicionarCarrinho(produto) {
    adicionarCarrinho(produto);
    fecharModal();
    setCarrinhoAberto(true);
  }

  function filtrarMaisVendidos() {
    setProdutosFiltrados(perfumes100ml.filter((p) => p.maisVendido));
  }

  function filtrarLancamentos() {
    setProdutosFiltrados(perfumes100ml.filter((p) => p.lancamentos));
  }

  function mostrarTodos() { setProdutosFiltrados(perfumes100ml); }

  function filtrarBusca() {
    const termo = busca.toLowerCase();
    setProdutosFiltrados(
      perfumes100ml.filter(
        (p) => p.nome.toLowerCase().includes(termo) || p.marca.toLowerCase().includes(termo)
      )
    );
  }

  return (
    <main>
      <SEO
        titulo="Catálogo"
        descricao="Explore nossa coleção de perfumes importados, nacionais e decants."
      />

      <div className="container-catalago">
        <h2 className="h2-catalago">Catálogo</h2>
        <h1 className="h1-catalago">Nossas Fragrâncias</h1>

        <div className="input-wrapper">
          <div className="input-container">
            <input
              type="text"
              className="input-catalago"
              placeholder="Buscar..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && filtrarBusca()}
            />
          </div>
          <button className="btn-buscar" onClick={filtrarBusca}>Buscar</button>
        </div>

        <div className="divs-btns">
          <button className="btn-todos" onClick={mostrarTodos}>Todos</button>
          <button className="btn-maisvendido" onClick={filtrarMaisVendidos}>Mais Vendidos</button>
          <button className="btn-lancamentos" onClick={filtrarLancamentos}>Lançamentos</button>
        </div>
      </div>

      <section className="catalogo-grid">
        {produtosFiltrados.map((produto) => (
          <CardProduto key={produto.id} produto={produto} abrirModal={abrirModal} />
        ))}
      </section>

      <ModalProduto
        key={produtoSelecionado?.id}
        produto={produtoSelecionado}
        produtos={produtos}
        fecharModal={fecharModal}
        adicionarCarrinho={handleAdicionarCarrinho}
      />
    </main>
  );
}

export default Catalogo;