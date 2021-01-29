import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import cx from "classnames";

import styles from "./InfoBox.module.css";
import { prettyPrintStat } from "../../utils/utils";

export default function InfoBox({
  title,
  cases,
  total,
  updated,
  active,
  ...props
}) {
  let uniqueStyle;
  if (title === "Cases") {
    uniqueStyle = styles.cases;
  } else if (title === "Recovered") {
    uniqueStyle = styles.recovered;
  } else {
    uniqueStyle = styles.deaths;
  }

  return (
    <Card
      onClick={props.onClick}
      className={
        active
          ? cx(styles.infoBox, styles.selected, uniqueStyle)
          : cx(styles.infoBox, uniqueStyle)
      }
    >
      <CardContent>
        <Typography color="textSecondary" className={styles.title}>
          Covid-19 {title}:
        </Typography>
        <Typography
          variant="h5"
          className={title === "Recovered" ? styles.green : styles.quantity}
        >
          {prettyPrintStat(cases, true)}
        </Typography>
        <Typography color="textSecondary" className={styles.total}>
          Total: {prettyPrintStat(total, false)}
        </Typography>
        <Typography color="textSecondary">
          {new Date(updated).toDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
}
