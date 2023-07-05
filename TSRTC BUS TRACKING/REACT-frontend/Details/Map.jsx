import "./Details.css";
import ReactMapGL, {
  Marker,
  // NavigationControl,
  // GeolocateControl,
  // ScaleControl,
  // FullscreenControl,
  // useMap,
  Source,
  Layer,
} from "react-map-gl";
import { useState } from "react";
import { useEffect, useMemo, useContext } from "react";
import * as React from "react";
function Map({ arr, LastLoc, route }) {
  if (arr !== undefined && LastLoc !== undefined && route !== undefined) {
    var len = arr.length;
    const avg = { latitude: 0, longitude: 0 };
    var latsum = 0.0,
      lngsum = 0.0;
    for (let i = 0; i < arr.length; i++) {
      latsum += arr[i].Loc.lat;
      lngsum += arr[i].Loc.lon;
    }
    avg.latitude = latsum / arr.length.toFixed(10);
    avg.longitude = lngsum / arr.length.toFixed(10);
    // console.log(avg);
    let state = {
      longitude: avg.longitude,
      latitude: avg.latitude,
      zoom: 10,
    };
    const [viewState, SetViewState] = useState(state);
    const pins = useMemo(
      () =>
        arr.map((coord, index) => (
          <Marker
            color="red"
            key={`marker-${index}`}
            longitude={coord.Loc.lon}
            latitude={coord.Loc.lat}
            anchor="center"
          >
            {index != 0 && index != len - 1 && (
              // <img
              //   style={{ transform: "scale(.3)", borderRadius: "50%" }}
              //   src="E:\MERN-Stack\client\TSRTC\public\alamy-1686074192.jpg"
              // ></img>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "black",
                  height: "10px",
                  width: "10px",
                  borderRadius: "50%",
                }}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    height: "6px",
                    width: "6px",
                    borderRadius: "50%",
                  }}
                ></div>
              </div>
            )}
          </Marker>
        )),
      []
    );
    useEffect(() => {
      if (
        viewState.latitude === avg.latitude &&
        viewState.longitude === avg.longitude
      )
        return;
      viewState.latitude = avg.latitude;
      viewState.longitude = avg.longitude;
      // console.log(avg);
    }, [avg.latitude, avg.longitude]);
    //203A path- geojson file format
    const path = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: route,
          },
          properties: {
            prop0: "value0",
            prop1: 0.0,
          },
        },
      ],
    };

    return (
      <>
        <div className="container-map">
          <ReactMapGL
            className="map"
            {...viewState}
            onMove={(evt) => SetViewState(evt.viewState)}
            transitionDuration="200"
            mapboxAccessToken="--your token--"
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/miniproject14/clj7hmbrn006y01r2bcviegeg"
          >
            {/* <NavigationControl position="top-left" showCompass={0} /> */}
            {/* <ScaleControl /> */}
            {pins}
            <Marker
              className="busMarker"
              longitude={LastLoc.lon}
              latitude={LastLoc.lat}
              anchor="bottom"
              // style={{ height: "50px" }}
            >
              {/* <img
                className="bus"
                src="E:\MERN-Stack\client\TSRTC\public\bus-icon.svg"
              ></img> */}
              <text className="bus">
                <strong>BUS</strong>
              </text>
            </Marker>

            <Source id="route" type="geojson" data={path}>
              <Layer
                id="route"
                layout={{ "line-cap": "round", "line-join": "round" }}
                paint={{
                  "line-color": "darkcyan",
                  "line-width": 10,
                }}
                source="route"
                type="line"
              />
            </Source>
          </ReactMapGL>
        </div>
      </>
    );
  }
}

export default Map;
