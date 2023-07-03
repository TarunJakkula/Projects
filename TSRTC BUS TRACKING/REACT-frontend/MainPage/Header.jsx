function Header({ state, setState, setAuthentication }) {
  return (
    <>
      <div className="heading">
        <text> tbt. </text>
      </div>
      <div className="btndiv">
        {state !== 0 && (
          <button
            className="button"
            onClick={() => {
              setState(0);
              setAuthentication(0);
            }}
          >
            HOME
          </button>
        )}
        {state !== 1 && (
          <button className="button" onClick={() => setState(1)}>
            SIGN-IN
          </button>
        )}
        {state !== 2 && (
          <button className="button" onClick={() => setState(2)}>
            SIGN-UP
          </button>
        )}
      </div>
    </>
  );
}
export default Header;
