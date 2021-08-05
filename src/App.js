import React, { useRef, useEffect, useState } from "react";
import data from "./Data.json";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

import "./App.css";
mapboxgl.accessToken =
  "pk.eyJ1IjoiYjE4ZWUwMTYiLCJhIjoiY2tyeDUyc2RuMG11ODJwcHNseDM4NnM4dSJ9.8L91csQvPoEzsh5k1s53pQ";

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(77.59);
  const [lat, setLat] = useState(12.26);
  const [zoom, setZoom] = useState(8);
  const [population, setPopulation] = useState("84.4 lakh");
  // console.log(data[0].city);e

  const func = (value) => {
    data.map((item) => {
      if (item.city === value) {
        // console.log(value);
        console.log(item.lat);
        console.log(item.lng);
        setLat(item.lat);
        setLng(item.lng);
        setPopulation(item.population);
        console.log(population);

        map.current.flyTo({
          center: [item.lng, item.lat],
        });
      }
    });
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div className="all">
        <div className="city">
          <div className="population">Population : {population}</div>

          <select className="select" onChange={(e) => func(e.target.value)}>
            <option value="Bengluru">Bengluru</option>

            <option value="Mumbai">Mumbai</option>

            <option value="Delhi">Delhi</option>

            <option value="Kolkata">Kolkata</option>

            <option value="Jaipur">Jaipur</option>
          </select>
          <br />
        </div>

        <div className="map">
          <div ref={mapContainer} className="map-container" />
        </div>
      </div>
    </div>
  );
}
