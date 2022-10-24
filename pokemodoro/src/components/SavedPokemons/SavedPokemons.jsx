import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const SavedPokemons = ({ requestedData, setRequestedData }) => {

  //requisiçao e save das infos dos pokemons
  const [pokeInfo, setPokeInfo ] = useState('')
  console.log(pokeInfo.pokemons);

   // const que salvam os objetos antes de imprimir
  const [toPrint, setToPrint] = useState([]);
  console.log(toPrint);

  // quando essa const existe ela aparece na pagina
  const lPokemons = toPrint.map((pokeObj) => (
    <div key={pokeObj.id}>
      <span>{pokeObj.id}</span> - <span>{pokeObj.name}</span>
      <br />
      <img src={pokeObj.sprites.front_default} />
      <br />
      <span>{pokeObj.types[0].type.name}</span>
      <span>{pokeObj.types[1] ? ` - ${pokeObj.types[1].type.name}` : ""} </span>      
    </div>
  ));

  function logOut() {
    localStorage.removeItem("LoggedUserName");
    localStorage.removeItem("LoggedUserId");
    window.location.reload();
  }

  //aqui sao requeridas as infos de cada pokemon que o user tem e sao salvas em toprin
  function reqPokeInfo(data) {
    console.log('iniciou req poke info');
    data.pokemons?.map(async (ids) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ids}`);
      const data = await response.json();
      setToPrint((newToPrint) => [...newToPrint, data]);
      console.log(toPrint);
    });
  }

  const lSUserName = localStorage.getItem("LoggedUserId");
  console.log(lSUserName);

  useEffect(() => {
    async function reqUser() {
      const response = await axios.get(
        `https://pokemodoro-api.herokuapp.com/userId/${lSUserName}`
      );
      setPokeInfo(response.data);
      reqPokeInfo(response.data);
      console.log('terminou de req user');
    }
    return () => {
      reqUser()
    }
  }, [])
  

  //funçao que requer os dados quando user ja esta logado
  
  console.log(pokeInfo); 

  return (
    <div>
      <br />
      <span>bem vindo: {localStorage.getItem("LoggedUserName")} </span>
      <br />
      <br />
      <button onClick={() => logOut()}>logOut</button>
      <br />
      <br />
      <span>Seus pokemons salvos:</span>
      <br />
      <div>
      </div>
      <br />
      <button onClick={() => reqPokeInfo()}>ver</button>
      <br />
      <button onClick={()=> reqUser()}> imprimir</button>
      <ul>{lPokemons ? lPokemons : ""}</ul>
    </div>
  );
};

export default SavedPokemons;
