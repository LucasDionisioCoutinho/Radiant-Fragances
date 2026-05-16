import { Helmet } from "react-helmet-async";

const SITE_URL = "https://radiantfragrances.com.br";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const keywordsPorPagina = {
  default:
    "perfumes importados, decants, perfumes de luxo, perfumes online, Radiant Fragrances, comprar perfume, São Paulo",
  "Catálogo":
    "catálogo de perfumes, perfumes importados, decants de perfume, comprar perfume online, perfumes baratos, perfumes 100ml",
  "Promoções":
    "promoção perfumes, desconto perfumes importados, decants baratos, perfumes com desconto, ofertas perfumes",
  "Sobre":
    "Radiant Fragrances, loja de perfumes importados, quem somos, perfumaria online",
  "FAQ":
    "dúvidas sobre perfumes, como comprar decant, entrega de perfumes, política de trocas",
};

function SEO({ titulo, descricao }) {
  const siteName = "Radiant Fragrances";
  const tituloCompleto = titulo
    ? `${titulo} | ${siteName}`
    : `${siteName} | Perfumes Importados`;
  const descricaoPadrao =
    "Perfumes importados, nacionais e decants. Descubra fragrâncias exclusivas que revelam a sua essência.";
  const descricaoFinal = descricao || descricaoPadrao;
  const keywords = keywordsPorPagina[titulo] || keywordsPorPagina.default;

  return (
    <Helmet>
      {/* Básico */}
      <title>{tituloCompleto}</title>
      <meta name="description" content={descricaoFinal} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Radiant Fragrances" />
      <link rel="canonical" href={SITE_URL} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={tituloCompleto} />
      <meta property="og:description" content={descricaoFinal} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={tituloCompleto} />
      <meta name="twitter:description" content={descricaoFinal} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  );
}

export default SEO;
