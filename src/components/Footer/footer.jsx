import React from "react";
import { FaHeart } from "react-icons/fa";
import { Typography } from "@material-ui/core";
import cx from "classnames";

import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Typography className={styles.notes}>
        Made with <FaHeart color="#61dbfb" /> by Eduardo Campos.
      </Typography>
      <Typography
        variant="caption"
        style={{ color: "#aaaaaa" }}
        className={cx(styles.notes, styles.bottom)}
      >
        Covid-19 Tracker, v2.0.0
      </Typography>
    </footer>
  );
}
