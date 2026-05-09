import "./contato.css";

function Contato() {
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
          name="email contato"
          className="input-contato scroll-progress"
          id="input-contato"
          placeholder="Seu melhor e-mail"
        />
        <button className="btn-contato scroll-progress">INSCREVER</button>
      </div>
    </section>
  );
}

export default Contato;
