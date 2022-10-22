import React from "react";
import { useState } from "react";

const SavedPokemons = ({ requestedData }) => {


  // cons que salvam os objetos antes de imprimir
  const [toPrint, setToPrint] = useState([]);
  console.log(toPrint);

  //aqui sao requeridas todas a infos de cada pokemons salvo
  function reqPokeInfo() {
    requestedData.pokemons.map(
      async (ids) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ids}`);
        const data = await response.json();
        setToPrint((newToPrint) => [...newToPrint, data]);
      }
    )   
  }

  const lPokemons = toPrint.map((pokeObj) => (
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


  //funçao que imprime os pokes na tela


  return (
    <div>
      <span>Seus pokemons salvos:</span>
      <div>
        <span>{requestedData.pokemons}</span>
      </div>
      <br />
      <button onClick={()=> reqPokeInfo()}>ver</button>
      <ul>{lPokemons ? lPokemons : ""}</ul>

    </div>
  );
};

export default SavedPokemons;
