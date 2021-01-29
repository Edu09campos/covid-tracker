import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

import styles from "./utils.module.css";

const casesTypeColors = {
  cases: {
    multiplier: 200,
    option: { color: "#cc1034", fillColor: "#cc1034" },
  },
  recovered: {
    multiplier: 300,
    option: { color: "#7dd71d", fillColor: "#7dd71d" },
  },
  deaths: {
    multiplier: 500,
    option: { color: "#ff6c47", fillColor: "#ff6c47" },
  },
};

export const prettyPrintStat = (stat, plus) =>
  plus
    ? stat
      ? `+ ${numeral(stat).format("0.0a")}`
      : "+ 0"
    : stat
    ? `${numeral(stat).format("0.0a")}`
    : "0";

export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

export const showDataOnMap = (data, casesType) =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      pathOptions={casesTypeColors[casesType].option}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className={styles.container}>
          <div
            className={styles.flag}
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />
          <div className={styles.name}>{country.country}</div>
          <div className={styles.confirmed}>
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className={styles.recovered}>
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className={styles.deaths}>
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
