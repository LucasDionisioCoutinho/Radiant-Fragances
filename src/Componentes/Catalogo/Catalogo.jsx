import { useState } from "react";

import produtosData from "../../../Data/produtos.json";

import CardProduto from "./CardProduto";
import ModalProduto from "./ModalProduto";

import "./catalogo.css";

function Catalogo({  adicionarCarrinho,setCarrinhoAberto }) {
  const produtos = produtosData;

  const perfumes100ml = produtos.filter((produto) =>
    produto.id?.endsWith("-100"),
  );

  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [busca, setBusca] = useState("");
  const [produtosFiltrados, setProdutosFiltrados] = useState(perfumes100ml);

  function abrirModal(produto) {
    setProdutoSelecionado(produto);
  }

  function fecharModal() {
    setProdutoSelecionado(null);
  }

  function handleAdicionarCarrinho(produto) {
    adicionarCarrinho(produto);
    fecharModal();
    setCarrinhoAberto(true);
  }

  function filtrarMaisVendidos() {
    const filtrados = perfumes100ml.filter((produto) => produto.maisVendido);
    setProdutosFiltrados(filtrados);
  }

  function filtrarLancamentos() {
    const filtrados = perfumes100ml.filter((produto) => produto.lancamentos);
    setProdutosFiltrados(filtrados);
  }

  function mostrarTodos() {
    setProdutosFiltrados(perfumes100ml);
  }

  function filtrarBusca() {
    const termo = busca.toLowerCase();
    const filtrados = perfumes100ml.filter(
      (produto) =>
        produto.nome.toLowerCase().includes(termo) ||
        produto.marca.toLowerCase().includes(termo),
    );
    setProdutosFiltrados(filtrados);
  }

  return (
    <main>
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
            />
          </div>
          <button className="btn-buscar" onClick={filtrarBusca}>
            Buscar
          </button>
        </div>

        <div className="divs-btns">
          <button className="btn-todos" onClick={mostrarTodos}>Todos</button>
          <button className="btn-maisvendido" onClick={filtrarMaisVendidos}>Mais Vendidos</button>
          <button className="btn-lancamentos" onClick={filtrarLancamentos}>Lançamentos</button>
        </div>
      </div>

      <section className="catalogo-grid">
        {produtosFiltrados.map((produto) => (
          <CardProduto
            key={produto.id}
            produto={produto}
            abrirModal={abrirModal}
          />
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