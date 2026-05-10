import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "./contato.css";

const PUBLIC_KEY = "S6GM0ZIpRQRRnmSws";
const SERVICE_ID = "service_v62axmg";
const TEMPLATE_ID = "template_4ahjb0l";

function Contato() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => setStatus(null), 3500);
    return () => clearTimeout(timer);
  }, [status]);

  function handleInscrever() {
    if (!email || !email.includes("@")) {
      setStatus("invalido");
      return;
    }

    setStatus("enviando");

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, { email }, PUBLIC_KEY)
      .then(() => {
        setStatus("sucesso");
        setEmail("");
      })
      .catch(() => {
        setStatus("erro");
      });
  }

  return (
    <section className="contato">
      <h2 className="h2-contato scroll-progress">Exclusividade</h2>
      <h1 className="h1-contato scroll-progress">Receba Novidades</h1>
      <p className="p-contato scroll-progress">
        Cadastre-se para receber lançamentos exclusivos e ofertas especiais
        antes de
        <br />
        todos.
      </p>

      <div className="container-input-contato">
        <input
          type="email"
          className="input-contato scroll-progress"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "enviando"}
        />
        <button
          className="btn-contato scroll-progress"
          onClick={handleInscrever}
          disabled={status === "enviando"}
        >
          {status === "enviando" ? "ENVIANDO..." : "INSCREVER"}
        </button>
      </div>

      {status === "sucesso" && (
        <p className="contato-feedback sucesso">
          ✓ Cadastro realizado! Você receberá nossas novidades em breve.
        </p>
      )}
      {status === "invalido" && (
        <p className="contato-feedback erro">
          Por favor, insira um e-mail válido.
        </p>
      )}
      {status === "erro" && (
        <p className="contato-feedback erro">
          Algo deu errado. Tente novamente.
        </p>
      )}
    </section>
  );
}

export default Contato;