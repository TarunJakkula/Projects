import { useNavigate } from "react-router-dom";
import Profile from "./Profile.jsx";

function Body2({
  username,
  setPassword,
  password,
  busDetails,
  list,
  profile,
  navigate,
  email,
  getDetails,
}) {
  let greets = "";
  const time = new Date();
  const t = time.getHours();
  if (t > 0 && t < 12) {
    greets = "Morning";
  } else if (t >= 12 && t < 17) {
    greets = "Afternoon";
  } else {
    greets = "Evening";
  }
  return (
    <>
      {profile !== true ? (
        <>
          <div className="greet">
            <text className="greeting">
              Good {greets} {username}!
            </text>
            <br></br>
            <text className="subtext">Buses on your trip to MVSREC</text>
          </div>
          <br></br>
          <div className="detailtab">
            <table className="tabledesign">
              <thead className="theaddesign">
                <tr key="header">
                  <th key="header-d1">BUS NUMBER</th>
                  <th key="header-d2">START LOCATION</th>
                  <th key="header-d3">END LOCATION</th>
                </tr>
              </thead>
              <tbody className="tbodydesign">
                {busDetails.map((b) => (
                  <tr key={b._id}>
                    <td className="tdDesign" key={b.BusNumber}>
                      <button
                        className="table-btn"
                        onClick={() =>
                          navigate(`/main/${JSON.stringify(b._id)}`)
                        }
                      >
                        {b.BusNumber}
                      </button>
                    </td>
                    <td className="tdDesign" key={b.StartLocation}>
                      {b.StartLocation}
                    </td>
                    <td className="tdDesign" key={b.EndLocation}>
                      {b.EndLocation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br></br>
            <footer className="hashtag">
              #Click on the bus number for detailed view
            </footer>
          </div>
        </>
      ) : (
        <div className="Pcard">
          <Profile
            username={username}
            setPassword={setPassword}
            password={password}
            email={email}
            busDetails={busDetails}
            getDetails={getDetails}
            list={list}
          />
        </div>
      )}
    </>
  );
}

export default Body2;
