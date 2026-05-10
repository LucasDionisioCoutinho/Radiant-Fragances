import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Footer from "./Componentes/Menu/Footer/footer.jsx";
import Menu from "./Componentes/Menu/menu.jsx";
import BannerPromo from "./Componentes/BannerPromo/BannerPromo.jsx";
import ScrollToTop from "./Componentes/ScrollToTop/ScrollToTop.jsx";
import Carrinho from "./Componentes/Menu/Catalogo/Carrinho.jsx";

import Home from "./Paginas/Home/hero.jsx";
import Contato from "./Paginas/Home/Contato/contato.jsx";
import NossaHistoria from "./Paginas/Home/NossaHistoria/nossahistoria.jsx";
import PromocoesHome from "./Paginas/Home/PromocoesHome/promocoes.jsx";
import PromocoesPage from "./Paginas/Promocoes/promocoes.jsx";
import Faq from "./Paginas/Home/Faq/faq.jsx";
import Sobre from "./Paginas/Home/Sobre/sobre.jsx";
import Catalogo from "./Componentes/Menu/Catalogo/Catalogo.jsx";

function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  function adicionarCarrinho(produto) {
    setCarrinho((prev) => {
      const index = prev.findIndex((item) => item.id === produto.id);
      if (index !== -1) {
        const novoCarrinho = [...prev];
        novoCarrinho[index] = {
          ...novoCarrinho[index],
          quantidade: novoCarrinho[index].quantidade + produto.quantidade,
        };
        return novoCarrinho;
      }
      return [...prev, { ...produto }];
    });
  }

  function removerItem(index) {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    setCarrinho(novoCarrinho);
  }

  return (
    <>
      <ScrollToTop />
      <BannerPromo modo="faixa" />

      <Menu
        totalItens={carrinho.length}
        abrirCarrinho={() => setCarrinhoAberto(true)}
      />

      {carrinhoAberto && (
        <div
          onClick={() => setCarrinhoAberto(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 9998,
          }}
        />
      )}

      <Carrinho
        carrinho={carrinho}
        abrirCarrinho={carrinhoAberto}
        fecharCarrinho={() => setCarrinhoAberto(false)}
        removerItem={removerItem}
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <PromocoesHome />
              <NossaHistoria />
              <Contato />
            </>
          }
        />
        <Route path="/faq" element={<Faq />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/promocoes" element={<PromocoesPage />} />
        <Route
          path="/catalogo"
          element={
            <Catalogo
              adicionarCarrinho={adicionarCarrinho}
              setCarrinhoAberto={setCarrinhoAberto}
            />
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
