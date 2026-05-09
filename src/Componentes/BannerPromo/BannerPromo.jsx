import { useState, useEffect } from "react";
import bannerData from "../../Data/banner.json";
import "./bannerpromo.css";

function calcularSegundos(dataFim) {
  const diff = Math.floor((new Date(dataFim) - new Date()) / 1000);
  return diff > 0 ? diff : 0;
}

function formatarTempo(total) {
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return { d, h, m, s };
}

function BannerPromo({ modo = "faixa" }) {
  const [segundos, setSegundos] = useState(() =>
    calcularSegundos(bannerData.dataFim)
  );

  useEffect(() => {
    if (!bannerData.ativo) return;
    const interval = setInterval(() => {
      setSegundos((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!bannerData.ativo) return null;

  const { d, h, m, s } = formatarTempo(segundos);

  // FAIXA FINA — aparece no topo das outras páginas
  if (modo === "faixa") {
    return (
      <div className="banner-faixa">
        <span className="banner-faixa-titulo">{bannerData.titulo}</span>
        <span className="banner-faixa-subtitulo">{bannerData.subtitulo}</span>
        {bannerData.cupom && (
          <span className="banner-faixa-cupom">
            Use o cupom: <strong>{bannerData.cupom}</strong>
          </span>
        )}
        <div className="banner-faixa-timer">
          <span>{String(d).padStart(2, "0")}d</span>
          <span>:</span>
          <span>{String(h).padStart(2, "0")}h</span>
          <span>:</span>
          <span>{String(m).padStart(2, "0")}m</span>
          <span>:</span>
          <span>{String(s).padStart(2, "0")}s</span>
        </div>
      </div>
    );
  }

  // BANNER GRANDE — aparece na página de promoções
  return (
    <div
      className="banner-grande"
      style={{ backgroundImage: `url(${bannerData.imagem})` }}
    >
      <div className="banner-grande-overlay">
        <h2>{bannerData.titulo}</h2>
        <p>{bannerData.subtitulo}</p>

        {bannerData.cupom && (
          <div className="banner-grande-cupom">
            Cupom: <strong>{bannerData.cupom}</strong>
          </div>
        )}

        <div className="banner-grande-timer">
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
      </div>
    </div>
  );
}

export default BannerPromo;