import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import "./Map.css";
import { fetchCountriesData } from "../../api/index";
import { showDataOnMap } from "../../utils/utils";

export default function Map({ casesType, center, zoom }) {
  const [mapCountries, setMapCountries] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const data = await fetchCountriesData();

      setMapCountries(data);
    };

    fetchApi();
  }, []);

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(mapCountries, casesType)}
      </MapContainer>
    </div>
  );
}
