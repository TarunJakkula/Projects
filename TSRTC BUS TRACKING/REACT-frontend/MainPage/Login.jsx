import { useEffect } from "react";

function Login({
  setUsername,
  setPassword,
  check,
  authentication,
  setAuthentication,
}) {
  useEffect(() => {
    setAuthentication(0);
  }, []);

  return (
    <>
      <text className="card-title card-title-size">LOGIN</text>
      {authentication === -1 && (
        <text className="card-title">Invalid Credentials!</text>
      )}
      <br></br>
      <br></br>
      <text className="card-title">Username</text>
      <input
        type="text"
        className="input"
        required
        onChange={(event) => setUsername(event.target.value)}
      ></input>
      <br></br>
      <text className="card-title">Password</text>
      <input
        type="password"
        className="input"
        required
        onChange={(event) => setPassword(event.target.value)}
      ></input>
      <br></br>
      <button
        id="login"
        onClick={() => {
          check();
        }}
      >
        CLICK!
      </button>
    </>
  );
}

export default Login;
