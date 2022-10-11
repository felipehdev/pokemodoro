import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";

const App = () => {
  // setTimeout(() => setTimer(timer - 1), 1000);

  //gestao do tempo
  const tFocus = 5;
  const tBreak = 10;
  const [timer, setTimer] = useState(tFocus);

  const minutes = Math.floor(timer / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timer % 60).toString().padStart(2, "0");

  //cronometro on ou off
  const [on, setOn] = useState(false);

  //gestao da atividade
  const dInit = 'click to  start'
  const dFocus = 'time to focus'
  const dBreak = 'time to take a break'
  const[ toDo, setToDo] = useState(dInit);

  //gestao do texto do botao
  const start = "START";
  const pause = "PAUSE";
  const pokemon = "GET POKEMON";
  const [btnTxt, setButtonTxt] = useState(start);

  useEffect(() => {
    if (timer === 0 && toDo === dBreak && on === true) {
      setOn(false);
      setButtonTxt(start);
      setToDo(dFocus);
      setTimer(tFocus)
    }
    else if (timer === 0) {
      setOn(false);
      setButtonTxt(pokemon);
    } else if (on === true) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
  }, [timer]);

  function timerBtn() {
    if (btnTxt === start && toDo === dBreak) {
      setOn(true);
      setTimer(timer - 1);
      console.log(on);
      setButtonTxt(pause);
    }
    else if (btnTxt === start) {
      setOn(true);
      setToDo(dFocus)
      setTimer(timer - 1);
      console.log(on);
      setButtonTxt(pause);

    } else if (btnTxt === pause) {
      setOn(false);
      console.log(on);
      setButtonTxt(start);

    } else if (btnTxt === pokemon) {
      console.log(`requisiçao feita a pokeapi`);
      setToDo(dBreak)
      setTimer(tBreak);
      setButtonTxt(start);
    }
  }

  return (
    <div>
      <h1>pokemodoro</h1>
      <span>{toDo}</span>
      <br />
      <br />      
      <span>{minutes}</span>
      <span> : </span>
      <span>{seconds}</span>
      <br />
      <br />
      <button onClick={() => timerBtn()}>{btnTxt}</button>
    </div>
  );
};

export default App;
