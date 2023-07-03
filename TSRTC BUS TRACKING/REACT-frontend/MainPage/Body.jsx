import Login from "./Login";
import Register from "./Register";

function Body({
  state,
  setState,
  setEmail,
  setUsername,
  setPassword,
  Password,
  addTodb,
  check,
  setAuthentication,
  authentication,
}) {
  return (
    <div className="flexbox">
      <div className="description title">
        <text>WELCOME TO</text>
        <text>TBT</text>
        <button id="knowmore" onClick={() => setState(3)}>
          KNOW MORE
        </button>
      </div>
      <div
        className={
          state === 1
            ? "card loginback"
            : state === 2
            ? "card registerback"
            : state === 3
            ? "card desback"
            : "card"
        }
      >
        {state !== 0 && (
          <>
            {state === 1 && (
              <Login
                setUsername={setUsername}
                setPassword={setPassword}
                check={check}
                authentication={authentication}
                setAuthentication={setAuthentication}
              />
            )}
            {state === 2 && (
              <Register
                setUsername={setUsername}
                setPassword={setPassword}
                Password={Password}
                setEmail={setEmail}
                addTodb={addTodb}
              />
            )}
            {state === 3 && (
              <div className="desc">
                <text className="card-title card-title-size">
                  TBT - TSRTC BUS TRACKING
                </text>
                <br></br>
                <text className="card-title card-title-sizes">
                  A Crowdsourcing App
                </text>
                <br></br>
                <text className="card-title card-title-sizes">
                  G Srishailam - Guide
                </text>
                <text className="card-title card-title-sizes">
                  This website was designed and built by students of
                </text>
                <text className="card-title card-title-sizes">
                  MVSR CSE 3rd Year
                </text>
                <ul className="card-title card-title-sizes">
                  <li>Tarun Jakkula</li>
                  <li>P.S.S Bharadwaj</li>
                  <li>B Sumvit</li>
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Body;
