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


  //funçao que imprime os pokes na tela


  return (
    <div>
      <span>Seus pokemons salvos:</span>
      <div>
        <span>{requestedData.pokemons}</span>
      </div>
      <br />
      <button onClick={()=> reqPokeInfo()}>ver</button>

    </div>
  );
};

export default SavedPokemons;
