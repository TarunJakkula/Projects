import { useNavigate } from "react-router-dom";

function Header3() {
  const navigate = useNavigate();
  return (
    <>
      <text className="heading3">tbt.</text>
      <div className="padding">
        <button
          className="buttons"
          onClick={() => {
            navigate(-1);
          }}
        >
          BACK
        </button>
      </div>
    </>
  );
}

export default Header3;
