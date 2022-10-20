import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";

const App = () => {

  // 01. CONTROLE DO RELOGIO
  //gestao do tempo (controller)
  const tFocus = 1;
  const tBreak = 2;
  const [timer, setTimer] = useState(tFocus);

  const minutes = Math.floor(timer / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timer % 60).toString().padStart(2, "0");

  //cronometro on ou off
  const [on, setOn] = useState(false);

  //gestao da atividade (controller)
  const dInit = "CLICK TO START";
  const dFocus = "TIME TO FOCUS";
  const dBreak = "TIME TO TAKE A BREAK";
  const [toDo, setToDo] = useState(dInit);

  //gestao do texto do botao
  const start = "START";
  const pause = "PAUSE";
  const getPokemon = "GET POKEMON";
  const [btnTxt, setButtonTxt] = useState(start);  

  //gestao do pokemon sorteado
  const [pokemon, setPokemon] = useState("");

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


  // 02. CONTROLE DA REQUISIÇAO DO POKEMON

  //gestao da requsiçao do pokemon
  const [resp, setResp] = useState("");

  //pokemon request controller
  const getData = async () => {
    const randomN = Math.floor(Math.random() * 906) + 1;
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomN}`
    );
    const data = await response.json();
    setResp(data);
  };

  // condiçao para requerer pokemon
  useEffect(() => {
    if (btnTxt === getPokemon) {
      getData();
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
      setTimeout(() => {
        setPokemon(resp);
      }, 500);

      setToDo(dBreak);
      setTimer(tBreak);
      setButtonTxt(start);
      console.log(pokemon);
    }
  }

  //gerenciador dos pokemons salvos (esses dados vem da database)
  const [pokeIds, setPokeIds] = useState([]);
  console.log(pokeIds);
  
  //pokersaver chamado no click do botao salvar
  function pokeSaver() {
    setPokeIds((newPoke) => [...newPoke, pokemon.id]);
  }

  //

  //controller que que salva a requisiçao dos pokemons que o user ja tem e prepara para imprimir
  const [toPrint, setToPrint] = useState([]);
  console.log(toPrint);
  console.log();

  //funçao que salva o dados dos pokemons antes de serem impressos (o gatilho pode ser mudado)
  function updatePokedex() {
    pokeIds.map(async (id) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setToPrint((newToPrint) => [...newToPrint, data]);
    });
  }

  // funçao que imprime os pokemons (toPrint) na tela
  const listPokemons = toPrint.map(
    (pokeObj) =>
    <div>
      <span>{pokeObj.id}</span> - <span>{pokeObj.name}</span>
      <br />
      <img src={pokeObj.sprites.front_default}/>
      <br />
      <span>{pokeObj.types[0].type.name}</span>
      
      <span>{pokeObj.types[1] ? ( ` - ${pokeObj.types[1].type.name}`) : ''} </span>
      <br />
      <br />
      <br />
      <br />
    </div>   
      
      
    
  )

  //

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
        {pokemon ? (
          <div>
            <img src={pokemon.sprites.front_default} alt="" />
            <br />
            <span>{pokemon.order}</span>
            <span> - </span>
            <span>{pokemon.name}</span>
            <span> - </span>
            <span>{pokemon.types[0].type.name}</span>
            <br />
            <br />
            <button onClick={() => pokeSaver()}>Save</button>
            <br />
            <span>{ pokeIds  ? (`Seus pokemons salvos: ${pokeIds}`) : ''} </span>
          </div>
        ) : (
          ""
        )}
      </div>
      <br />
      <br />
      <button onClick={() => updatePokedex()}>Update</button>
      <br />
      <br />
      <br />
      <div>
        <ul>
          {listPokemons ? listPokemons : ''}
        </ul>
      </div>
      <br />
      <br />
      <Login/>
      <br />
      <span>🙅‍♂️ nao tem como</span>
      <br />
      <span> felipr.com</span>
    </div>
  );
};

export default App;
