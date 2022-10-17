import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";

const App = () => {
  //gestao do tempo (controller)
  const tFocus = 1;
  const tBreak = 0.1 * 60;
  const [timer, setTimer] = useState(tFocus);

  const minutes = Math.floor(timer / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timer % 60).toString().padStart(2, "0");

  //cronometro on ou off
  const [on, setOn] = useState(false);

  //gestao da atividade (controller)
  const dInit = "click to  start";
  const dFocus = "time to focus";
  const dBreak = "time to take a break";
  const [toDo, setToDo] = useState(dInit);

  //gestao do texto do botao
  const start = "START";
  const pause = "PAUSE";
  const getPokemon = "GET POKEMON";
  const [btnTxt, setButtonTxt] = useState(start);

  //gestao do pokemon requerido
  const [pokemon, setPokemon] = useState({});

  //timer controller
  useEffect(() => {
    if (timer === 0 && toDo === dBreak && on === true) {
      setOn(false);
      setButtonTxt(start);
      setToDo(dFocus);
      setTimer(tFocus);
    } else if (timer === 0) {
      setOn(false);
      setButtonTxt(getPokemon);
    } else if (on === true) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
  }, [timer]);

  //pokemon request controller

  // console.log(`efeito get pokemon`);
  //     fetch("https://pokeapi.co/api/v2/pokemon/1")
  //       .then((response) => response.json())
  //       .then((json) => console.log(json))
  //       .then(setPokemon(json))
  //       .then(console.log(pokemon))
        


  const getData = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/1")
    const data = await response.json()      
    console.log(data);
    setPokemon(data)
    console.log(pokemon);
  }




  useEffect(() => {
    if (btnTxt === getPokemon) {
      console.log(`condiçoes atendidas, vai fazer a req`);
      getData()   
    }
  }, [btnTxt]);

  
  //gerenciador do botao, onclick
  function timerBtn() {
    //se START durante o INTERVALO
    if (btnTxt === start && toDo === dBreak) {
      setOn(true);
      setTimer(timer - 1);
      console.log(on);
      setButtonTxt(pause);
      //se START ( aqui inicia as ações)
    } else if (btnTxt === start) {
      console.log(on);
      setOn(true);
      setToDo(dFocus);
      setTimer(timer - 1);
      console.log(on);
      setButtonTxt(pause);
      //se PAUSE
    } else if (btnTxt === pause) {
      console.log(on);
      setOn(false);
      setButtonTxt(start);
      console.log(on);
      //se POKEMON
    } else if (btnTxt === getPokemon) {
      setToDo(dBreak);
      setTimer(tBreak);
      setButtonTxt(start);
      console.log(pokemon);
    }
  }

  return (
    <div>
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

      <div>
        {pokemon ?
        <div>
          <span>{pokemon.order}</span>
          <span> - </span>
          <span>{pokemon.name}</span>          
        </div>
        :
        ''
        
      }
        
      </div>
    </div>
  );
};

export default App;
