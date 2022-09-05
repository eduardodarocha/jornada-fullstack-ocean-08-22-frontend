import { useEffect, useState } from "react";
import "./HighScore.css";

function HighScore(props) {
  const [itens, setItens] = useState(undefined);

  useEffect(function () {
    async function carregarPontuacoes() {
      const response = await fetch("https://jornada-fullstack-ocean-08-22.onrender.com/pontuacoes");

      const body = await response.json();

      setItens(body);
    }
    carregarPontuacoes();
  }, []);
  console.log(itens);

  const itensEstaoCarregando = itens === undefined;

  async function salvarPontuacao(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const response = await fetch("https://jornada-fullstack-ocean-08-22.onrender.com/pontuacoes", {
      method: "POST",
      body: JSON.stringify({ nome: name, pontos: props.pontos }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.reload();
    const body = await response.json();
  }

  return (
    <div className="HighScore">
      <div>
        Você fez <b>{props.pontos}</b> pontos!
      </div>
      <div>
        <h2>HighScore</h2>

        {itensEstaoCarregando ? (
          <div>Carregando...</div>
        ) : (
          <div>
            {itens.map((item, index) => (
              <div key={`score_${index}`}>
                  <b>{`${index + 1})`}</b> {item.nome} - {item.pontos}
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2>Registre sua pontuação!</h2>
        <form onSubmit={salvarPontuacao}>
          <input type="text" name="name" placeholder="Digite seu nome" />
          <input type="submit" value="Enviar" />
        </form>
      </div>
    </div>
  );
}
export default HighScore;
