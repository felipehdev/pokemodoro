import React from "react";
import { useState } from "react";
import { createContext } from "react";
import sha256 from "js-sha256";
import axios from "axios";

const Login = () => {
  //user inserido pelo usuario
  const [user, setUser] = useState("");

  //password inserido pelo usuario
  const [password, setPassword] = useState("");

  //user logado?
  const [logged, setLogged] = useState(false);

  const UserContext = createContext(user);
  const LoggedContext = createContext(logged);

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
  const [requestedData, setRequestedData] = useState(
    "valor inicial requested data"
  );
  console.log(requestedData.password);
  const password256 = sha256(password);
  console.log(password256);

  //get user (usado no login)
  async function reqUser() {
    const response = await axios.get(
      `https://pokemodoro-api.herokuapp.com/user/${user}`
    );
    setRequestedData(response.data);
    console.log(requestedData);

    if (response.data.password === password256) {
      setLogged(true);
      localStorage.setItem("user", response.data.name);
      console.log(`usuario logou`);
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
      <form action="" method="get">
        <input
          type="text"
          placeholder="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          name="user"
          id="user"
        />
        <br />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          id="password"
        />
        <br />
        <br />
        <input type="submit" value="register" onClick={registerOnClick} />
        <br />
        <br />
        <input type="submit" value="login" onClick={loginOnClick} />
      </form>

      <UserContext.Provider value={user}>
        <p>provider</p>
      </UserContext.Provider>
    </div>
  );
};

export default Login;
