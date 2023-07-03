function Header2({ profile, setProfile, navigate }) {
  return (
    <>
      <text className="heading2">tbt.</text>
      <div className="padding">
        <button
          className="buttons"
          onClick={() => (profile ? setProfile(false) : setProfile(true))}
        >
          PROFILE
        </button>
        <button
          className="buttons"
          onClick={() => {
            navigate("/", { replace: true });
          }}
        >
          LOGOUT
        </button>
      </div>
    </>
  );
}

export default Header2;
