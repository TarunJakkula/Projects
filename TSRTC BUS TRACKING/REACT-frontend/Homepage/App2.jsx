import { useLocation, useNavigate } from "react-router-dom";
import Header2 from "./Header2.jsx";
import Body2 from "./Body2.jsx";
import "./App2.css";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function App2() {
  const location = useLocation(); //hook
  const username = location.state.username;
  const [password, setPassword] = useState(location.state.password);
  const email = location.state.Email;
  const [arr, setArr] = useState([]);
  const [profile, setProfile] = useState(false);
  const [list, SetList] = useState([]);
  const navigate = useNavigate();

  const setDetails = (response) => {
    const ar = [];
    for (const i of response.data[0].busDetails) {
      ar.push(i);
    }
    setArr(ar);
  };

  const getDetails = () => {
    Axios.post("http://localhost:3001/details", {
      Username: username,
      Password: password,
    }).then((response) => {
      response.data === "Error"
        ? console.log(response.data)
        : setDetails(response);
    });
  };

  const setList = (response) => {
    const l = [];
    for (const i of response) {
      l.push(i);
    }
    SetList(l);
  };

  const getBuslist = () => {
    Axios.get("http://localhost:3001/buslist").then((response) => {
      response.data === "Error" ? console.log("Error") : setList(response.data);
    });
  };

  useEffect(() => {
    getDetails();
    getBuslist();
  }, []);

  return (
    <>
      <div className="header2">
        <Header2
          profile={profile}
          setProfile={setProfile}
          navigate={navigate}
        />
      </div>
      <div className="body2">
        <Body2
          username={username}
          setPassword={setPassword}
          password={password}
          busDetails={arr}
          list={list}
          profile={profile}
          navigate={navigate}
          email={email}
          getDetails={getDetails}
        />
      </div>
    </>
  );
}

export default App2;
