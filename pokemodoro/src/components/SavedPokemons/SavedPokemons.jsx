import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import S from "./SavedPokemons.module.css";

const SavedPokemons = ({
  requestedData,
  setRequestedData,
  pokeInfo,
  setPokeInfo,
  render,
}) => {
  //busca o ID do usuario logado
  const lSUserId = localStorage.getItem("LoggedUserId");

  // const que salvam os objetos antes de imprimir
  const [toPrint, setToPrint] = useState([]);
  console.log(toPrint);

  // desconecta o user
  function logOut() {
    localStorage.removeItem("LoggedUserName");
    localStorage.removeItem("LoggedUserId");
    window.location.reload();
  }

  //IMPRESSAO DOS POKEMONS SALVOS
  // quando essa const existe ela aparece na pagina
  const lPokemons = toPrint.map((pokeObj) => (
    <li className={S.liCtn} key={pokeObj.id}>
      <div className={S.spriteBg}>
        <img className={S.pokeImg} src={pokeObj.sprites.front_default} />
      </div>
      <div className={S.pokeInfoCtn}>
        <span className={S.pokeId}>#{pokeObj.id}</span>
        <span className={S.pokeName}>{pokeObj.name.toUpperCase()}</span>
        <div className={S.typeCtn}>
          <span className={S.pokeType}>{pokeObj.types[0].type.name.toUpperCase()}</span>
          {pokeObj.types[1] && (
            <span className={S.pokeType}>{pokeObj.types[1].type.name.toUpperCase()}</span>
          )}
        </div>
      </div>
    </li>
  ));

  //aqui sao requeridas as infos de cada pokemon que o user tem e sao salvas em toprin
  function printPokeInfo(data) {
    console.log("iniciou req poke info");
    data.pokemons?.map(async (ids) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ids}`);
      const data = await response.json();
      console.log(data);
      setToPrint((newToPrint) => [...newToPrint, data]);
      console.log(toPrint);
    });
  }

  //funçao que requer os dados dos pokemons quando user ja esta logado
  useEffect(() => {
    async function reqUser() {
      const response = await axios.get(
        `https://pokemodoro-api.herokuapp.com/userId/${lSUserId}`
      );
      setPokeInfo(response.data);
      setToPrint([]);
      printPokeInfo(response.data);
    }
    return () => {
      reqUser();
    };
  }, [render]);

  // funçao que re renderiza a página

  return (
    <div>
      <div className={S.loggedUserCtn}>
        <div className={S.loggedUserTxt}>
          Bem vindo: {localStorage.getItem("LoggedUserName")}{" "}
        </div>
        <button className={S.logOutBtn} onClick={() => logOut()}>
          logOut
        </button>
      </div>

      <div className={S.savedPokemons}>
        <span className={S.yourPokesTxt}>Seus pokemons salvos:</span>
        <ul>{lPokemons ? lPokemons : ""}</ul>
      </div>
    </div>
  );
};

export default SavedPokemons;
