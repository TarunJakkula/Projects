import Header from "./Header";
import Body from "./Body";
import "./App.css";
import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [state, setState] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [authentication, setAuthentication] = useState(0);
  const navigate = useNavigate();

  //mainpage
  const main = (Email) => {
    setAuthentication(1);
    navigate("/main", { state: { username, password, Email } });
  };

  //login
  const check = () => {
    Axios.post("http://localhost:3001/read", {
      Username: username,
      Password: password,
    }).then((response) => {
      response.data === "Error"
        ? setAuthentication(-1)
        : main(response.data.Email);
    });
    setUsername("");
    setPassword("");
  };

  //register
  const addTodb = () => {
    Axios.post("http://localhost:3001/insert", {
      Username: username,
      Password: password,
      Email: email,
    });
    setUsername("");
    setPassword("");
    setEmail("");
  };

  return (
    <>
      <div className="header">
        <Header
          state={state}
          setState={setState}
          setAuthentication={setAuthentication}
        />
      </div>
      <div className="body">
        <Body
          state={state}
          setState={setState}
          setEmail={setEmail}
          setUsername={setUsername}
          setPassword={setPassword}
          Password={password}
          addTodb={addTodb}
          check={check}
          setAuthentication={setAuthentication}
          authentication={authentication}
        />
      </div>
    </>
  );
}

export default App;
