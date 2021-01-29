import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";

import styles from "./Table.module.css";
import { fetchCountriesData } from "../../api";
import { sortData } from "../../utils/utils";

export default function Table() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const data = await fetchCountriesData();
      const sortedData = sortData(data);
      setTableData(sortedData);
    };

    fetchApi();
  }, []);

  return (
    <div className={styles.table}>
      <Typography gutterBottom variant="h6" style={{ fontWeight: "bold" }}>
        Live cases per country
      </Typography>
      <div className={styles.innerTable}>
        {tableData.map(({ country, cases }) => (
          <tr key={country}>
            <td>{country}</td>
            <td>
              <strong>
                {cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </strong>
            </td>
          </tr>
        ))}
      </div>
    </div>
  );
}
