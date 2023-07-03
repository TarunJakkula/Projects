import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import Map from "./Map.jsx";
function Body3({ details, setLatLon, location, setEmergency, crash }) {
  const contentStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "grid",
    minWidth: "1350px",
    placeItems: "center",
  };
  const [reason, setReason] = useState("Reason Not provided");
  return (
    <div className="BusDetails Flexy">
      <div className="impbuttons">
        <div className="impbuttonsd">
          <button
            className="changebutton"
            type="button"
            onClick={() => {
              navigator.geolocation.getCurrentPosition((position) => {
                setLatLon(
                  position.coords.latitude,
                  position.coords.longitude,
                  new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                    .toISOString()
                    .slice(11, 16)
                );
              });
            }}
          >
            Update Location
          </button>
          <Popup
            trigger={
              <button className="changebutton" type="button">
                Emergency changelog
              </button>
            }
            position="right center"
            modal
            contentStyle={contentStyle}
          >
            {(close) => (
              <div className="popup">
                <button className="close-button" onClick={() => close()}>
                  x
                </button>
                {crash !== "" && (
                  <>
                    <text className="emergency-details">Emergency Details</text>
                    <text className="Haveit">Location</text>
                    <text className="data">{crash}</text>
                    <text className="Haveit">Updated at</text>
                    <text className="data">{details.Emergency.Updated}</text>
                    <text className="Haveit">Cause of emergency</text>
                    <text className="data">{details.Emergency.reason}</text>
                  </>
                )}
                <text>----------------------------------------</text>
                <text className="emergency-details">Report an emergency</text>
                <input
                  type="text"
                  placeholder="Describe - such as bus crash, accident etc."
                  className="popup-input"
                  onChange={(event) => {
                    setReason(event.target.value);
                    event.target.value === "" &&
                      setReason("-Reason Not provided-");
                  }}
                ></input>
                <button
                  className="changebutton pop"
                  onClick={() => {
                    navigator.geolocation.getCurrentPosition((position) => {
                      setEmergency(
                        position.coords.latitude,
                        position.coords.longitude,
                        new Date(
                          Date.now() - new Date().getTimezoneOffset() * 60000
                        )
                          .toISOString()
                          .slice(11, 16),
                        reason
                      );
                    });
                  }}
                >
                  Report Emergency
                </button>
              </div>
            )}
          </Popup>
          <br></br>
          <br></br>
          <br></br>
          <Map
            arr={details.Locations}
            LastLoc={details.Location}
            route={details.path}
          />{" "}
        </div>
      </div>
      <div className="text">
        <text className="head">Bus Details</text>
        <div className="info">
          <text className="Haveit">Bus No</text>
          <text className="data">{details.BusNumber}</text>
          <text className="Haveit">Last Known Location</text>
          <text className="data">Near{" " + location}</text>
          <text className="Haveit">Last Updated Time</text>
          <text className="data">{details.Updated}</text>
          <text className="Haveit">Start Location</text>
          <text className="data">{details.StartLocation}</text>
          <text className="Haveit">End Location</text>
          <text className="data">{details.EndLocation}</text>
        </div>
      </div>
    </div>
  );
}

export default Body3;
