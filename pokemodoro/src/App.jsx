import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import SavedPokemons from "./components/SavedPokemons/SavedPokemons";
import axios from "axios";
import Footer from "./components/Footer/Footer";
import { Helmet } from "react-helmet";

const App = () => {
  // 01. CONTROLE DO RELOGIO
  //gestao do tempo (controller)
  const tFocus = 25 * 60;
  const tBreak = 5 * 60;
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
  const dBreak = "TAKE A BREAK";
  const [toDo, setToDo] = useState(dInit);

  //gestao do texto do botao
  const start = "START";
  const pause = "PAUSE";
  const getPokemon = "GET POKEMON";
  const [btnTxt, setButtonTxt] = useState(start);

  //gestao das dos botoes

  const [btnTheme, setBtnTheme] = useState({
    background: "#9BCC50",
    boxShadow: "0px 4px 0px #5A8715",
    color: "#8AAA59",
    fontSize: "18px",
  });

  //timer controller
  useEffect(() => {
    if (timer === 0 && toDo === dBreak && on === true) {
      setOn(false);
      setButtonTxt(start);
      setToDo(dFocus);
      setTimer(tFocus);
    } else if (timer === 0) {
      setOn(false);
      setBtnTheme({
        background: "#FD7D24",
        boxShadow: "0px 4px 0px #9F6035",
        color: "#DC6C1E",
        fontSize: "18px",
      });
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
      console.log(on);
      setButtonTxt(pause);
      setTimer(timer - 1);

      setBtnTheme({
        background: "#FD7D24",
        boxShadow: "0px 4px 0px #9F6035",
        color: "#DC6C1E",
        fontSize: "18px",
      });
      console.log("ativou render");

      //se START ( aqui inicia as ações)
    } else if (btnTxt === start) {
      setOn(true);
      setToDo(dFocus);
      setTimer(timer - 1);
      setBtnTheme({
        background: "#F16E57",
        boxShadow: "0px 4px 0px #B0351F",
        color: "#D44B32",
        fontSize: "18px",
      });
      setButtonTxt(pause);

      //se PAUSE
    } else if (btnTxt === pause) {
      console.log(on);
      setOn(false);
      setBtnTheme({
        background: "#9BCC50",
        boxShadow: "0px 4px 0px #5A8715",
        color: "#8AAA59",
        fontSize: "18px",
      });
      setButtonTxt(start);
      console.log(on);

      //se POKEMON
    } else if (btnTxt === getPokemon) {
      setTimeout(() => {
        setPokemon(resp);
      }, 500);

      setToDo(dBreak);
      setTimer(tBreak);
      setBtnTheme({
        background: "#9BCC50",
        boxShadow: "0px 4px 0px #5A8715",
        color: "#8AAA59",
        fontSize: "18px",
      });
      console.log("ativou render");
      setButtonTxt(start);
      console.log(pokemon);
    }
  }

  //user e logged, importado do children form
  const [user, setUser] = useState("");
  const [logged, setLogged] = useState(false);
  const [requestedData, setRequestedData] = useState(
    "valor inicial requested data"
  );

  const [pokeInfo, setPokeInfo] = useState("");

  //state que causa o render de componentes
  const [render, setRender] = useState(1);

  //pokersaver chamado no click do botao salvar
  function pokeSaver() {
    const pokeArr = [pokemon.id, ...pokeInfo.pokemons];

    const userId = localStorage.getItem("LoggedUserId");
    axios
      .put(`https://web-production-be3b.up.railway.app/${userId}`, {
        pokemons: pokeArr,
      })
      .then(function (response) {
        console.log(`pokemon adicionado`);
        setRender(Math.random);
      })
      .catch(function (error) {
        console.log(error);
      });

    setTimeout(() => {
      setPokemon("");
    }, 500);
  }

  return (
    <div className="app">

      <Helmet>
        <meta charSet="utf-8" />
        <title>{minutes}:{seconds} - Pokemodoro </title>
        <link rel="canonical" href="https://cdn-icons-png.flaticon.com/128/5379/5379249.png" />
      </Helmet>

      <div className="ctn">
        <nav className="navbar">
          <h1>Pokemodoro</h1>
        </nav>
        <div>
          <div className="timer">
            <div className="screen">
              <span className="toDo">{toDo}</span>
              <div className="minutes">
                <span>{minutes}</span>
                <span>:</span>
                <span>{seconds}</span>
              </div>
            </div>
            <button
              id="timerBtn"
              className="timerBtn"
              style={{
                backgroundColor: btnTheme.background,
                color: btnTheme.color,
                boxShadow: btnTheme.boxShadow,
                fontSize: btnTheme.fontSize,
              }}
              onClick={() => timerBtn()}
            >
              {btnTxt}
            </button>
          </div>
        </div>

        <div>
          {pokemon ? (
            <div className="prizeDiv">
              <div>
                <div className="prizeTitle">You got the</div>
                {pokemon.id < 650 ? (
                  <div className="prizeImgCtn">
                    {" "}
                    <img
                      className="prizeImg"
                      src={
                        pokemon.sprites.versions["generation-v"]["black-white"]
                          .animated.front_default
                      }
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="prizeImgCtn">
                    {" "}
                    <img
                      className="prizeImg"
                      src={pokemon.sprites.front_default}
                      alt=""
                    />
                  </div>
                )}

                <div className="prizeText">
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </div>
                <div className={`pokeType btn-${pokemon.types[0].type.name}`}>
                  {pokemon.types[0].type.name.toUpperCase()}
                </div>
              </div>
              <button className="prizeBtn" onClick={() => pokeSaver()}>
                SAVE
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          {localStorage.getItem("LoggedUserName") ? (
            <SavedPokemons
              requestedData={requestedData}
              setRequestedData={setRequestedData}
              pokeInfo={pokeInfo}
              setPokeInfo={setPokeInfo}
              render={render}
            />
          ) : (
            <Login
              setUser={setUser}
              setLogged={setLogged}
              setRequestedData={setRequestedData}
              user={user}
              requestedData={requestedData}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
