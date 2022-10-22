import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import SavedPokemons from "./components/SavedPokemons/SavedPokemons";

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

  //gestao do pokemon sorteado
  const [pokemon, setPokemon] = useState("");

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

  //user e logged, importado do children form  
  const [ user, setUser] = useState('')
  const [logged, setLogged] = useState(false)
  const [requestedData, setRequestedData] = useState("valor inicial requested data");  

  //gerenciador dos pokemons salvos deve fazer um axios.put pro array de pokemons do user
  const [pokeIds, setPokeIds] = useState([]);

  //funçao que salva os dados dos pokemons antes de serem impressos (o gatilho pode ser mudado)
  function printPokedex() {
    pokeIds.map(async (id) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setToPrint((newToPrint) => [...newToPrint, data]);
    });
  }

  //pokersaver chamado no click do botao salvar 
  function pokeSaver() {
    setPokeIds((newPoke) => [...newPoke, pokemon.id]);
  }



  //controller que que salva a requisiçao dos pokemons que o user ja tem e prepara para imprimir
  const [toPrint, setToPrint] = useState([]);
  

  // funçao que imprime os pokemons (toPrint) na tela
  const listPokemons = toPrint.map((pokeObj) => (
    <div>
      <span>{pokeObj.id}</span> - <span>{pokeObj.name}</span>
      <br />
      <img src={pokeObj.sprites.front_default} />
      <br />
      <span>{pokeObj.types[0].type.name}</span>
      <span>{pokeObj.types[1] ? ` - ${pokeObj.types[1].type.name}` : ""} </span>
      <br />
      <br />
      <br />
      <br />
    </div>
  ));

  //

  return (
    <div className="div">
      <div className="timer">
        <h1>pokemodoro</h1>
        <span>{toDo}</span>
        <div>
          <span>{minutes}</span>
          <span> : </span>
          <span>{seconds}</span>
        </div>
        <button onClick={() => timerBtn()}>{btnTxt}</button>
      </div>

      <div>
        {pokemon ? (
          <div className="prizeDiv">
            <div>
            <img src={pokemon.sprites.front_default} alt="" />
            <div>
              <span>{pokemon.order}</span>
              <span> - </span>
              <span>{pokemon.name}</span>
            </div>            
            <div>{pokemon.types[0].type.name}</div>
            </div>
            <button onClick={() => pokeSaver()}>Save</button>
            <div>{pokeIds ? `Your saved pokemons: ${pokeIds}` : ""} </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <button onClick={() => printPokedex()}>Update</button>
      <div>
        <ul>{listPokemons ? listPokemons : ""}</ul>
      </div>
      <Login setUser={setUser} setLogged={setLogged} setRequestedData={setRequestedData} user={user} requestedData={requestedData}/>
      <div>
      {logged ? ('LOGOU') : ''}
      </div>
      <br />
      <SavedPokemons requestedData={requestedData}/>
      <h3>🙅‍♂️ nao tem como</h3>
      <h2> felipr.com</h2>
    </div>
  );
};

export default App;
