import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import styled from "styled-components";
import L from "leaflet";
import FMarker from "../assets/imgs/offline-marker.svg"
import OMarker from "../assets/imgs/online-marker.svg"
//import "./styles.scss";
export default function Map() {
  const [usersOffline, setUsersOffline] = useState([]);
  const [usersOnline,setUsersOnline]=useState([]);
  useEffect(() => {
    fetch("http://localhost:5005/map/users")
      .then((res) => res.json())
      .then((users) => {
        console.log(users)
        setUsersOnline(users.filter(user => user.status === 1));
        console.log(usersOnline);
      
        setUsersOffline(users.filter(user => user.status === 0));
        console.log(usersOffline)
      });
  }, []);
  const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
      html: `<span class="MapCluster">${cluster.getChildCount()}</span>`,
      className: "marker-cluster-custom",
      iconSize: L.point(40, 40, true),
    });
  };
  const IconOffline = L.icon({
    iconUrl: FMarker,
    iconSize: [64,64],
    iconAnchor: [32, 64],
    popupAnchor: [0,-60],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null
});
const IconOnline = L.icon({
  iconUrl: OMarker,
  iconSize: [64,64],
  iconAnchor: [32, 64],
  popupAnchor: [0,-60],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null
});
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
        {usersOffline.map((user) => (
          <Marker isUserOnline={user.status} position={[user.latitude, user.longitude]} icon={IconOffline}>
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
        {usersOnline.map((user) => (
          <Marker isUserOnline={user.status} position={[user.latitude, user.longitude]} icon={IconOnline}>
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
