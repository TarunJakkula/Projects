import { useState } from "react";

function Register({ setUsername, setPassword, Password, setEmail, addTodb }) {
  const [shdRe, setShdre] = useState(0);
  const [msg, setMsg] = useState(-1);
  const [reg, regS] = useState(false);
  const [empty, setEmpty] = useState(-1);
  const correctEmail = (em) => {
    let y = 2;
    if (em.length === 0) {
      y = 0;
    } else if (em.length <= 14) {
      y = 1;
    } else {
      const x = "ni.ude.cersvm@";
      for (let i = em.length - 1, j = 0; j < 14; i--, j++) {
        if (em[i] !== x[j]) {
          y = 1;
          break;
        }
      }
    }
    setShdre(y);
    console.log(shdRe);
  };
  return (
    <>
      <text className="card-title card-title-size">REGISTER</text>
      {reg && <text className="card-title">Registered!</text>}
      <br></br>
      <br></br>
      <text className="card-title">Username</text>
      <input
        type="text"
        className="input"
        id="First Name"
        required
        onChange={(event) => setUsername(event.target.value)}
      ></input>
      <br></br>
      <text className="card-title">Email</text>
      <input
        type="text"
        className="input"
        id="email"
        required
        onChange={(event) => {
          correctEmail(event.target.value);
          setEmail(event.target.value);
        }}
      ></input>
      {shdRe === 1 && (
        <text className="card-title card-title-small"> *enter valid email</text>
      )}
      <br></br>
      <text className="card-title">Password</text>
      <input
        type="password"
        className="input"
        id="psw"
        required
        onChange={(event) => {
          setPassword(event.target.value);
          event.target.value === "" ? setEmpty(true) : setEmpty(false);
        }}
      ></input>
      {empty && empty !== -1 && (
        <text className="card-title card-title-small">*Empty Password</text>
      )}
      <br></br>
      <text className={"card-title"}>Re-enter Password</text>
      <input
        type="password"
        className="input"
        id="psw-repeat"
        required
        onChange={(event) => {
          const check = event.target.value;
          check !== "" && check !== Password ? setMsg(1) : setMsg(0);
        }}
      ></input>
      {msg === 1 && (
        <text className="card-title card-title-small">
          *password doesn't match
        </text>
      )}
      <br></br>
      <button
        id="register"
        onClick={() => {
          if (shdRe === 2 && msg === 0 && !empty && empty !== -1) {
            addTodb();
            regS(true);
          } else if (empty === -1) {
            setEmpty(true);
          } else if (msg === -1) {
            setMsg(1);
          }
        }}
      >
        CLICK!
      </button>
    </>
  );
}

export default Register;
