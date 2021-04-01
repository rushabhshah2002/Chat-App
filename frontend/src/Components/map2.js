import React, { useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import "./map.styles.scss";
import { FlyToInterpolator } from "react-map-gl";
import * as d3 from "d3-ease";
const Map = () => {
  const [users, setUsers] = useState([]);

  const defaultViewport = {
    width: "68.5vw",
    height: "100vh",
    latitude: 23.022505,
    longitude: 72.571365,
    zoom: 3,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator(),
    transitionEasing: d3.easeCubic,
  };
  const [viewport, setViewport] = useState(defaultViewport);
  useEffect(() => {
    fetch("http://localhost:5005/map/users")
      .then((res) => res.json())
      .then((users) => setUsers(users));
  }, []);
  useEffect(() => {
    if (window.width < 800) {
      defaultViewport.width = "100vw";
      setViewport(defaultViewport);
    }
  }, [defaultViewport, setViewport]);

  return (
    <div className="map" id="map">
      <div className="map__container" id="map__container">
        <ReactMapGL
          {...viewport}
          minZoom={1}
          attributionControl={false}
          className="mapboxComponent"
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          mapStyle="mapbox://styles/heet-vakharia/ckeuzr84tak0719oc1kgj5c3m"
          mapboxApiAccessToken="pk.eyJ1IjoiaGVldC12YWtoYXJpYSIsImEiOiJja2V1ejJzam0zenRwMnNwYzVnOHRpb3RsIn0.ucjS-K-34-JJgvlfAbHmCw"
        >
          {countries.map((country) => {
            if (country.countryInfo.iso2) {
              return (
                <Marker
                  key={country.countryInfo.iso2}
                  latitude={country.countryInfo.lat}
                  longitude={country.countryInfo.long}
                >
                  <img
                    src={country.countryInfo.flag}
                    alt=""
                    className="markerIcon"
                    onClick={() => onClickHandle(country)}
                  />
                </Marker>
              );
            } else {
              return null;
            }
          })}
        </ReactMapGL>
      </div>
    </div>
  );
};

export default Map;
