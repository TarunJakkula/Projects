import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Body3 from "./Body3.jsx";
import "./Details.css";
import Header3 from "./Header3.jsx";

function Details() {
  const { id } = useParams();
  const [details, setD] = useState({});
  const [location, setL] = useState("");
  const [crash, setCrash] = useState("");

  const setArr = (x) => {
    const arr1 = [];
    const arr2 = [];
    for (const i of x.Locations) {
      arr1.push(i.Loc);
      arr2.push(i.area);
    }
    calc(x, arr1, arr2);
  };

  //calculating nearest
  const distance = (p, point) => {
    return Math.sqrt(
      Math.pow(point.lat - p.lat, 2) + Math.pow(point.lon - p.lon, 2)
    );
  };
  const calc = (x, arr1, arr2) => {
    var point = { lat: x.Location.lat, lon: x.Location.lon }, //idhi update
      closest = arr1.reduce(
        (
          a,
          b // which bus
        ) => (distance(a, point) < distance(b, point) ? a : b)
      );
    setL(arr2[arr1.findIndex((y) => y.lat === closest.lat)]);
    if (x.Emergency.lat !== 0) {
      var point = { lat: x.Emergency.lat, lon: x.Emergency.lon }, //idhi update
        closest = arr1.reduce(
          (
            a,
            b // which bus
          ) => (distance(a, point) < distance(b, point) ? a : b)
        );
      setCrash(arr2[arr1.findIndex((y) => y.lat === closest.lat)]);
    }
  };

  const fetch = () => {
    Axios.post("http://localhost:3001/fetchDetails", {
      id: id,
    }).then((response) => {
      if (response.data === "Error") console.log(response.data);
      else {
        setD(response.data);
        setArr(response.data);
      }
    });
  };

  const setLatLon = (lati, loni, time) => {
    Axios.post("http://localhost:3001/updateLocation", {
      id: id,
      lat: lati,
      lon: loni,
      time: time,
    }).then((response) => {
      response !== null && fetch();
    });
  };

  const setEmergency = (lati, loni, time, Reason) => {
    Axios.post("http://localhost:3001/updateEmergency", {
      id: id,
      lat: lati,
      lon: loni,
      time: time,
      res: Reason,
    }).then((response) => {
      response !== null && fetch();
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <div className="header3">
        <Header3 />
      </div>
      <div className="body3">
        <Body3
          details={details}
          setLatLon={setLatLon}
          location={location}
          setEmergency={setEmergency}
          crash={crash}
        />
      </div>
    </>
  );
}

export default Details;
