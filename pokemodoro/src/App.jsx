import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";

const App = () => {
  //gerenciador do tempo total em segundos
  const [timer, setTimer] = useState(25 * 60);

  const minutes = Math.floor(timer / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timer % 60).toString().padStart(2, "0");


  //gerenciador toDo
  const [toDo, setToDo] = useState("Lets Start");

  //gerenciador do botao
  const [btnTxt, setButtonTxt] = useState("START");

  //a cada mudança no timer
  useEffect(() => {
    if (timer === 25 * 60) {
      setButtonTxt("START");
    }
    else if (timer === 0) {
      setButtonTxt("Get Pokemon");
    }

    else if (btnTxt === 'PAUSE') {
      setTimeout(() => setTimer(timer - 1), 1000);

    }

    
    else {
      

    }
  }, [timer]);


  function timerBtn() {
    if (btnTxt === "START") {
      setButtonTxt("PAUSE");
      setToDo("Time to Focus");
      setTimer(timer-1)
      
    } else if (btnTxt === "PAUSE") {
      console.log('botao em pause clicado');
      setButtonTxt("START");



    }
  }

  // function startTimer() {
  //   setTimer(setInterval(() => setMinutes(minutes - 1), 1000));
  // }

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
