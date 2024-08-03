import { Form } from "react-router-dom";
import React from "react";
import styles from "./index.module.less";

export default function Root(){
  return (
    <>
      <div className={styles.outer}>
        <div id="sideBar">
          <form method="post" action="/">
            <input type="search" name="search" id="search" />
            <div id="searchSpinner"></div>
            <div id="searchBtn"></div>
          </form>
          <form action="">
            <button type="submit">+</button>
          </form>
        </div>
        <div id="details">
          111
        </div>
      </div>
    </>
  );
}