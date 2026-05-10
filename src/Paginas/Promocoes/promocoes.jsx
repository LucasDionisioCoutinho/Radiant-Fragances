import { useState, useEffect } from "react";
import produtosData from "../../Data/produtos.json";
import cuponsData from "../../Data/cupons.json";
import bannerData from "../../Data/banner.json";
import BannerPromo from "../../Componentes/BannerPromo/BannerPromo.jsx";
import SEO from "../../Componentes/SEO/SEO.jsx";
import "./promocoes.css";

const WHATSAPP_NUMERO = "5511916776355";

function Promocoes() {
  const produtosEmPromocao = produtosData.filter((p) => p.promocao);

  const [carrinhoPromo, setCarrinhoPromo] = useState([]);
  const [cupom, setCupom] = useState("");
  const [cupomAplicado, setCupomAplicado] = useState(null);
  const [erroCupom, setErroCupom] = useState("");
  const [carrinhoMobileAberto, setCarrinhoMobileAberto] = useState(false);

  const [segundos, setSegundos] = useState(() => {
    if (bannerData.ativo) return 0;
    const diff = Math.floor((new Date(bannerData.dataFim) - new Date()) / 1000);
    return diff > 0 ? diff : 0;
  });

  useEffect(() => {
    if (bannerData.ativo) return;
    if (segundos <= 0) return;
    const interval = setInterval(() => {
      setSegundos((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function formatarTempo(total) {
    const d = Math.floor(total / 86400);
    const h = Math.floor((total % 86400) / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return { d, h, m, s };
  }

  const { d, h, m, s } = formatarTempo(segundos);

  function calcularPrecoComDesconto(produto) {
    const desconto = produto.desconto || 0;
    return produto.preco * (1 - desconto / 100);
  }

  function adicionarPromo(produto) {
    setCarrinhoPromo((prev) => {
      const index = prev.findIndex((item) => item.id === produto.id);
      if (index !== -1) {
        const novo = [...prev];
        novo[index] = {
          ...novo[index],
          quantidade: novo[index].quantidade + 1,
        };
        return novo;
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  }

  function removerPromo(id) {
    setCarrinhoPromo((prev) => prev.filter((item) => item.id !== id));
  }

  function alterarQuantidade(id, delta) {
    setCarrinhoPromo((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantidade: item.quantidade + delta }
            : item,
        )
        .filter((item) => item.quantidade > 0),
    );
  }

  function aplicarCupom() {
    const encontrado = cuponsData.find(
      (c) => c.codigo.toUpperCase() === cupom.toUpperCase(),
    );
    if (encontrado) {
      setCupomAplicado(encontrado);
      setErroCupom("");
    } else {
      setCupomAplicado(null);
      setErroCupom("Cupom inválido.");
    }
  }

  const subtotal = carrinhoPromo.reduce(
    (acc, item) => acc + calcularPrecoComDesconto(item) * item.quantidade,
    0,
  );
  const descontoCupom = cupomAplicado
    ? subtotal * (cupomAplicado.desconto / 100)
    : 0;
  const total = subtotal - descontoCupom;
  const totalItens = carrinhoPromo.reduce((acc, i) => acc + i.quantidade, 0);

  function finalizarPedido() {
    if (carrinhoPromo.length === 0) return;

    const itens = carrinhoPromo
      .map(
        (item) =>
          `• ${item.nome} (${item.quantidade}x) — R$ ${(calcularPrecoComDesconto(item) * item.quantidade).toFixed(2)} (${item.desconto}% off)`,
      )
      .join("\n");

    const cupomTexto = cupomAplicado
      ? `\nCupom: ${cupomAplicado.codigo} (-${cupomAplicado.desconto}%)\n`
      : "\n";

    const mensagem =
      `Olá! Gostaria de fazer um pedido pela promoção:\n\n` +
      `${itens}\n` +
      `${cupomTexto}` +
      `*Total: R$ ${total.toFixed(2)}*`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`,
      "_blank",
    );
  }

  const conteudoCarrinho = (
    <>
      {carrinhoPromo.length === 0 ? (
        <p className="promo-carrinho-vazio">Nenhum item selecionado.</p>
      ) : (
        <>
          <ul className="promo-lista">
            {carrinhoPromo.map((item) => (
              <li key={item.id} className="promo-item">
                <img src={item.imagem} alt={item.nome} width="50" />
                <div className="promo-item-info">
                  <p>{item.nome}</p>
                  <p>
                    {item.quantidade}x — R${" "}
                    {(calcularPrecoComDesconto(item) * item.quantidade).toFixed(
                      2,
                    )}
                  </p>
                </div>
                <button
                  className="promo-remover"
                  onClick={() => removerPromo(item.id)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <div className="promo-cupom">
            <input
              type="text"
              placeholder="Cupom de desconto"
              value={cupom}
              onChange={(e) => setCupom(e.target.value)}
            />
            <button onClick={aplicarCupom}>Aplicar</button>
          </div>

          {cupomAplicado && (
            <p className="cupom-ok">
              ✓ {cupomAplicado.codigo} — {cupomAplicado.desconto}% off
            </p>
          )}
          {erroCupom && <p className="cupom-erro">{erroCupom}</p>}

          <div className="promo-totais">
            <div className="promo-linha">
              <span>Subtotal</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>
            {cupomAplicado && (
              <div className="promo-linha desconto">
                <span>Desconto cupom</span>
                <span>- R$ {descontoCupom.toFixed(2)}</span>
              </div>
            )}
            <div className="promo-linha total">
              <span>Total</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
          </div>

          <button className="btn-finalizar-promo" onClick={finalizarPedido}>
            Finalizar no WhatsApp
          </button>
        </>
      )}
    </>
  );

  return (
    <main className="promo-page">
      <SEO
        titulo="Promoções"
        descricao="Aproveite nossas ofertas exclusivas em perfumes importados e decants."
      />

      {bannerData.ativo ? (
        <BannerPromo modo="banner" />
      ) : (
        <section className="promo-banner">
          <h2>Ofertas Especiais</h2>
          <h1>Promoções Exclusivas</h1>
          <p>Aproveite antes que acabe!</p>
          <div className="promo-timer">
            <div className="timer-bloco">
              <span>{String(d).padStart(2, "0")}</span>
              <small>dias</small>
            </div>
            <div className="timer-separador">:</div>
            <div className="timer-bloco">
              <span>{String(h).padStart(2, "0")}</span>
              <small>horas</small>
            </div>
            <div className="timer-separador">:</div>
            <div className="timer-bloco">
              <span>{String(m).padStart(2, "0")}</span>
              <small>min</small>
            </div>
            <div className="timer-separador">:</div>
            <div className="timer-bloco">
              <span>{String(s).padStart(2, "0")}</span>
              <small>seg</small>
            </div>
          </div>
        </section>
      )}

      <div className="promo-layout">
        <section className="promo-grid">
          {produtosEmPromocao.map((produto) => {
            const precoFinal = calcularPrecoComDesconto(produto);
            const noCarrinho = carrinhoPromo.find((i) => i.id === produto.id);

            return (
              <div className="promo-card" key={produto.id}>
                <div className="promo-badge">{produto.desconto}% OFF</div>
                <img src={produto.imagem} alt={produto.nome} />
                <div className="promo-card-info">
                  <p className="promo-marca">{produto.marca}</p>
                  <h3>{produto.nome}</h3>
                  <div className="promo-precos">
                    {produto.precoOriginal && (
                      <span className="preco-original">
                        R$ {produto.precoOriginal.toFixed(2)}
                      </span>
                    )}
                    <span className="preco-final">
                      R$ {precoFinal.toFixed(2)}
                    </span>
                  </div>
                  {noCarrinho ? (
                    <div className="promo-qtd-control">
                      <button onClick={() => alterarQuantidade(produto.id, -1)}>
                        −
                      </button>
                      <span>{noCarrinho.quantidade}</span>
                      <button onClick={() => alterarQuantidade(produto.id, 1)}>
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn-add-promo"
                      onClick={() => adicionarPromo(produto)}
                    >
                      Adicionar
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </section>

        {/* CARRINHO PC */}
        <aside
          className={`promo-carrinho ${carrinhoMobileAberto ? "mobile-aberto" : ""}`}
        >
          <div className="promo-carrinho-header">
            <h3>Seu Pedido</h3>
            <button
              className="promo-carrinho-fechar"
              onClick={() => setCarrinhoMobileAberto(false)}
            >
              ✕
            </button>
          </div>
          {conteudoCarrinho}
        </aside>
      </div>

      {/* BOTÃO FLUTUANTE MOBILE */}
      {carrinhoPromo.length > 0 && (
        <button
          className="promo-carrinho-fab"
          onClick={() => setCarrinhoMobileAberto(true)}
        >
          <span>🛒 Ver pedido ({totalItens})</span>
          <span className="fab-total">R$ {total.toFixed(2)}</span>
        </button>
      )}

      {/* OVERLAY MOBILE */}
      {carrinhoMobileAberto && (
        <div
          className="promo-carrinho-overlay"
          onClick={() => setCarrinhoMobileAberto(false)}
        />
      )}
    </main>
  );
}

export default Promocoes;
