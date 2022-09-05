import React, { useRef, useState, useEffect } from "react";
import "./Jogo.css";
import clouds from "../../assets/clouds.png";
import mario from "../../assets/mario.gif";
import gameOver from "../../assets/game-over.png";
import cano from "../../assets/pipe.png";

function Jogo(props) {
  const [estaPulando, setEstaPulando] = useState(false);
  const [estaMorto, setEstaMorto] = useState(false);
  const [pontos, setPontos] = useState(0);

  const marioRef = useRef();
  const canoRef = useRef();

  function marioEstaNoCano() {
    const mario = marioRef.current;
    const cano = canoRef.current;

    if (!mario || !cano) {
      return;
    }

    return (
      cano.offsetLeft > mario.offsetLeft &&
      cano.offsetLeft < mario.offsetLeft + mario.offsetWidth &&
      mario.offsetTop + mario.offsetHeight > cano.offsetTop
    );
  }

  useEffect(() => {
    const interval = setInterval(function () {
      const estaNoCano = marioEstaNoCano();
      // console.log("Mario está no cano", valor);

      if (!estaNoCano || estaMorto) {
        return;
      }
      setEstaMorto(true);
      props.onMorrer();
    }, 100);
    return () => clearInterval(interval);
  }, [estaMorto, props]);

  // console.log({ estaMorto });

  useEffect(
    function () {
      const interval = setInterval(function () {
        if (estaMorto) {
          return;
        }
        setPontos(pontos + 1);
        // console.log("Pontos: ", { pontos });
        props.onPontos(pontos + 1);
      }, 500);
      return () => clearInterval(interval);
    },
    [estaMorto, pontos, props]
  );

  document.onkeydown = function () {
    console.log("OnKeyDown");
    setEstaPulando(true);
    setTimeout(() => {
      setEstaPulando(false);
    }, 700);
  };

  let marioClassName = "mario";

  if (estaPulando) {
    marioClassName = "mario mario-pulo";
  }

  // console.log(estaPulando);

  const marioImage = estaMorto ? gameOver : mario;

  const pararAnimacao = estaMorto ? "parar-animacao" : "";

  return (
    <div className="jogo">
      <div className="pontos">Pontos: {pontos}</div>
      <img className="nuvens" src={clouds} alt="nuvens" />
      <img
        ref={marioRef}
        className={marioClassName}
        src={marioImage}
        alt="mario"
      />
      <img
        ref={canoRef}
        className={"cano " + pararAnimacao}
        src={cano}
        alt="cano"
      />
      <div className="chao"></div>
    </div>
  );
}

export default Jogo;
