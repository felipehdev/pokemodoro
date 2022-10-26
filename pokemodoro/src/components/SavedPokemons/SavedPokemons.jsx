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
      <span className={S.pokeIdHash}># <span className={S.pokeId}>{pokeObj.id}</span></span>
      <div className={S.spriteBg}>
        <img className={S.pokeImg} src={pokeObj.sprites.front_default} />
      </div>
      <div className={S.pokeInfoCtn}>
        <span className={S.pokeName}>{pokeObj.name.charAt(0).toUpperCase() + pokeObj.name.slice(1)}</span>
        <div className={S.typeCtn}>
          <span className={`${S.pokeType} btn-${pokeObj.types[0].type.name}` }>{pokeObj.types[0].type.name.charAt(0).toUpperCase() + pokeObj.types[0].type.name.slice(1) }</span>
          {pokeObj.types[1] && (
            <span className={`${S.pokeType} btn-${pokeObj.types[1].type.name}` }>{pokeObj.types[1].type.name.charAt(0).toUpperCase() + pokeObj.types[1].type.name.slice(1)}</span>
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
      setToPrint((newToPrint) => [...newToPrint, data]);
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
          Welcome: {localStorage.getItem("LoggedUserName")}{" "}
        </div>
        <button className={S.logOutBtn} onClick={() => logOut()}>
          logOut
        </button>
      </div>

      <div className={S.savedPokemons}>
        <span className={S.yourPokesTxt}>You have {toPrint.length} pokemos:</span>
        <ul>{lPokemons ? lPokemons : ""}</ul>
      </div>
    </div>
  );
};

export default SavedPokemons;
