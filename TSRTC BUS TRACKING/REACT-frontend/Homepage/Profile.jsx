import { useEffect, useState } from "react";
import Axios from "axios";
function Profile({
  username,
  setPassword,
  password,
  email,
  busDetails,
  getDetails,
  list,
}) {
  const [not, setNot] = useState(false);
  const [newpassword, setNew] = useState("");
  const [pnot, setPnot] = useState(-1);
  const [set, setSet] = useState(false);
  const [empty, setEmpty] = useState(-1);

  const updateList = (re) => {
    if (busDetails.some((el) => el._id === re._id) || false) {
      Axios.post("http://localhost:3001/removeList", {
        Username: username,
        busnumber: re._id,
      }).then((response) => {
        if (response !== "Error") {
          getDetails();
        }
      });
    } else {
      Axios.post("http://localhost:3001/addList", {
        Username: username,
        busnumber: re._id,
      }).then((response) => {
        if (response !== "Error") {
          getDetails();
        }
      });
    }
  };

  const updatePass = () => {
    Axios.post("http://localhost:3001/updateProfile", {
      Username: username,
      newpassword: newpassword,
    }).then((response) => {
      if (response.statusText === "OK") {
        setSet(true);
        setPassword(newpassword);
        setNew("");
      }
    });
  };

  return (
    <div className=" card-profile flex">
      <div className="grid">
        <text className="card-profile-title card-profile-title-size">
          PROFILE
        </text>
        <br></br>
        <div className="details card-profile card-profile-title">
          <text>USERNAME: {username}</text>
          <text>EMAIL: {email}</text>
        </div>
        <br></br>
        <div className="changepassword card-profile card-profile-title">
          {/* <text>Current Password</text> */}
          <input
            type="password"
            placeholder="Current Password"
            onChange={(event) => {
              event.target.value !== password && event.target.value !== ""
                ? setNot(true)
                : setNot(false);
            }}
          ></input>
          {not && <text>*incorrect password</text>}
          <br></br>
          {/* <text>New Password</text> */}
          <input
            type="password"
            placeholder="New Password"
            onChange={(event) => {
              setNew(event.target.value);
              event.target.value === "" ? setEmpty(true) : setEmpty(false);
            }}
          ></input>
          {empty && empty !== -1 && <text>*Empty Password</text>}
          <br></br>
          {/* <text>Re-enter New Password</text> */}
          <input
            type="password"
            placeholder="Re-enter New Password"
            onChange={(event) => {
              event.target.value !== newpassword && event.target.value !== ""
                ? setPnot(true)
                : setPnot(false);
            }}
          ></input>
          {pnot && pnot !== -1 && <text>*password doesn't match</text>}
          <br></br>
          <button
            className="button-profile-pass"
            onClick={() => {
              if (!pnot && !not && !empty && empty !== -1) {
                updatePass();
              } else if (empty === -1) {
                setEmpty(true);
              } else if (pnot === -1) {
                setPnot(true);
              }
            }}
          >
            Enter
          </button>
          {set && <text>Password updated!</text>}
        </div>
      </div>
      <div className="grid">
        <text className="card-profile-title card-profile-title-size">
          BUS-ROUTES
        </text>
        <br></br>
        <table className="card-profile-title">
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="tbody-profile">
            {list.map((response) => (
              <>
                <tr>
                  <td className="routes-table-division">
                    <text className="card-profile-title-small">
                      {response.BusNumber}
                    </text>
                  </td>
                  <td className="routes-table-division">
                    <button
                      className="click-profile"
                      key={response._id}
                      onClick={() => {
                        updateList(response);
                      }}
                    >
                      {busDetails.some((el) => el._id === response._id) || false
                        ? "Remove"
                        : "Add"}
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Profile;
