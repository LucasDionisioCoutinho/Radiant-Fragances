import { Helmet } from "react-helmet-async";

function SEO({ titulo, descricao }) {
  const siteName = "Radiant Fragrances";
  const tituloCompleto = titulo ? `${titulo} | ${siteName}` : `${siteName} | Perfumes Importados`;
  const descricaoPadrao = "Perfumes importados, nacionais e decants. Descubra fragrâncias exclusivas que revelam a sua essência.";

  return (
    <Helmet>
      <title>{tituloCompleto}</title>
      <meta name="description" content={descricao || descricaoPadrao} />
      <meta property="og:title" content={tituloCompleto} />
      <meta property="og:description" content={descricao || descricaoPadrao} />
    </Helmet>
  );
}

export default SEO;