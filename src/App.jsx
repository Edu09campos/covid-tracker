import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@material-ui/core";
import "leaflet/dist/leaflet.css";

import {
  CountryPicker,
  InfoBox,
  Map,
  Table,
  Footer,
  LineGraph,
} from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";

export default function App() {
  const [info, setInfo] = useState({});
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    const fetchApi = async () => {
      setInfo(await fetchData("Global"));
    };

    fetchApi();
  }, []);

  const handleCountryChange = async (countryName) => {
    let data = await fetchData(countryName);
    setInfo(data);

    if (countryName !== "Global") {
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    } else {
      setMapCenter([34.80746, -40.4796]);
      setMapZoom(3);
    }
  };

  return (
    <>
      <div className={styles.app}>
        <div className={styles.left}>
          <div className={styles.header}>
            <h1>Covid-19 Tracker</h1>
            <CountryPicker handleCountryChange={handleCountryChange} />
          </div>

          <div className={styles.stats}>
            <InfoBox
              active={casesType === "cases"}
              onClick={(e) => setCasesType("cases")}
              title="Cases"
              cases={info.todayCases}
              total={info.cases}
              updated={info.updated}
            />
            <InfoBox
              active={casesType === "recovered"}
              onClick={(e) => setCasesType("recovered")}
              title="Recovered"
              cases={info.todayRecovered}
              total={info.recovered}
              updated={info.updated}
            />
            <InfoBox
              active={casesType === "deaths"}
              onClick={(e) => setCasesType("deaths")}
              title="Deaths"
              cases={info.todayDeaths}
              total={info.deaths}
              updated={info.updated}
            />
          </div>

          <Map casesType={casesType} center={mapCenter} zoom={mapZoom} />
        </div>
        <Card className={styles.right}>
          <CardContent>
            <Table />
            <LineGraph className={styles.graph} casesType={casesType} />
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
