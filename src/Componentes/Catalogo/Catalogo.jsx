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
  const [filtroAtivo, setFiltroAtivo] = useState("todos");

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

  function aplicarFiltro(filtro) {
    setFiltroAtivo(filtro);
    setBusca("");
    if (filtro === "todos") setProdutosFiltrados(perfumes100ml);
    else if (filtro === "masculino") setProdutosFiltrados(perfumes100ml.filter((p) => p.genero === "masculino"));
    else if (filtro === "feminino") setProdutosFiltrados(perfumes100ml.filter((p) => p.genero === "feminino"));
    else if (filtro === "unissex") setProdutosFiltrados(perfumes100ml.filter((p) => p.genero === "unissex"));
    else if (filtro === "maisvendido") setProdutosFiltrados(perfumes100ml.filter((p) => p.maisVendido));
    else if (filtro === "lancamentos") setProdutosFiltrados(perfumes100ml.filter((p) => p.lancamentos));
  }

  function filtrarBusca() {
    setFiltroAtivo("busca");
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
              placeholder="Busque por nome ou marca.."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && filtrarBusca()}
            />
            <button className="btn-buscar" onClick={filtrarBusca}>Buscar</button>
          </div>
        </div>

        <div className="divs-btns">
          <button className={`btn-filtro ${filtroAtivo === "todos" ? "ativo" : ""}`} onClick={() => aplicarFiltro("todos")}>Todos</button>
          <button className={`btn-filtro ${filtroAtivo === "masculino" ? "ativo" : ""}`} onClick={() => aplicarFiltro("masculino")}>Masculino</button>
          <button className={`btn-filtro ${filtroAtivo === "feminino" ? "ativo" : ""}`} onClick={() => aplicarFiltro("feminino")}>Feminino</button>
          <button className={`btn-filtro ${filtroAtivo === "unissex" ? "ativo" : ""}`} onClick={() => aplicarFiltro("unissex")}>Unissex</button>
        </div>
        <div className="divs-btns divs-btns-secundario">
          <button className={`btn-filtro ${filtroAtivo === "maisvendido" ? "ativo" : ""}`} onClick={() => aplicarFiltro("maisvendido")}>Mais Vendidos</button>
          <button className={`btn-filtro ${filtroAtivo === "lancamentos" ? "ativo" : ""}`} onClick={() => aplicarFiltro("lancamentos")}>Lançamentos</button>
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