import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

//import "./styles.scss";
export default function Map() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5005/map/users")
      .then((res) => res.json())
      .then((users) => setUsers(users));
  }, []);

  return (
    //<h>Hello</h
    <MapContainer
      style={{ height: "100vh" }}
      center={[0.0, 0.0]}
      zoom={4}
      maxZoom={18}
      minZoom={3}
      attributionControl={false}
    >
      <TileLayer url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`} />

      <MarkerClusterGroup>
        {users.map((user) => (
          <Marker
            position={[
              user.location.coordinates.latitude,
              user.location.coordinates.longitude,
            ]}
          >
            <Popup>
              <div>
                <img src={user.picture.thumnail} alt="User profile" />
                <p>{`${user.name.first} ${user.name.last}`}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
