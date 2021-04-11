import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import styled from "styled-components";
import L from "leaflet";

//import "./styles.scss";
export default function Map() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5005/map/users")
      .then((res) => res.json())
      .then((users) => setUsers(users));
  }, []);
  console.log(users);
  const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
      html: `<span class="Hello">${cluster.getChildCount()}</span>`,
      className: "marker-cluster-custom",
      iconSize: L.point(40, 40, true),
    });
  };

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
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>
        {users.map((user) => (
          <Marker position={[user.latitude, user.longitude]}>
            <Popup>
              <div>
                <img src={user.image_url} alt="User profile" />
                <p>{`${user.username}`}</p>
                <p>{`${user.dob}`}</p>
                <p>{`${user.description}`}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
