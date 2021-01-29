import React, { useEffect, useState } from "react";
import { Typography, Divider } from "@material-ui/core";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

import styles from "./LineGraph.module.css";
import { fetchDailyRate } from "../../api";
import { buildChartData } from "../../utils/utils";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const casesTypeColors = {
  cases: "#cc1034",
  recovered: "#7dd71d",
  deaths: "#ff6c47",
};

export default function LineGraph({ casesType }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchApi = async () => {
      let data = await fetchDailyRate();
      const chartData = buildChartData(data, casesType);
      setData(chartData);
    };

    fetchApi();
  }, [casesType]);

  return (
    <div className={styles.graph}>
      <Divider light />
      <Typography gutterBottom variant="h6" className={styles.title}>
        Worldwide new {casesType}
      </Typography>
      {data?.length > 0 && (
        <Line
          maintainAspectRatio
          responsive
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}
