import React from "react";
import { useState } from "react";
import sha256 from "js-sha256";
import axios from "axios";
import S from './Login.module.css'


const Login = ({setUser, setLogged,setRequestedData, user, requestedData}) => {
  //user inserido pelo usuario
  console.log(user);

  //password inserido pelo usuario  
  const [password, setPassword] = useState("");
  console.log(password);

  // REGISTRAR USUARIO
  //create user (chamada no click register) (importar pra outro documento)
  const createUser = () =>
    axios
      .post(`https://pokemodoro-api.herokuapp.com/user/`, {
        name: user,
        password: sha256(password),
      })
      .then(function (response) {
        console.log(`user cadastrado`);
      })
      .catch(function (error) {
        console.log(error);
      });

  //register (create user) onClick
  function registerOnClick(e) {
    e.preventDefault();
    createUser();
  }

  // LOGIN DE USUARIO

  //aqui é salva o resultado da requisiçao (um objeto)
  
  const password256 = sha256(password); 

  //get user (usado no login)
  async function reqUser() {
    console.log(user);
    const response = await axios.get(
      `https://pokemodoro-api.herokuapp.com/user/${user}`
    );
    setRequestedData(response.data);
    console.log(requestedData);

    if (response.data.password === password256) {
      setLogged(true);
      localStorage.setItem("LoggedUserId", response.data._id)
      localStorage.setItem("LoggedUserName", response.data.name)
      console.log(`usuario logou`);
      console.log(response.data);
    } else {
      console.log(`algo nao deu certo`);
    }
  }

  //funçao loginOnClick
  function loginOnClick(e) {
    e.preventDefault();
    reqUser();
  }

  return (
    <div>
      
      <form className={S.form} action="" method="get">
      <h4>login or register</h4>
      <h5>to save your pokemons</h5>
        <input
          type="text"
          placeholder="user"
          onChange={(e) => setUser(e.target.value)}
          name="user"
          id="user"
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          id="password"
        />
        <input type="submit" value="register" onClick={registerOnClick} />
        <input type="submit" value="login" onClick={loginOnClick} />        
      </form>
      
    </div>
  );
};

export default Login;
