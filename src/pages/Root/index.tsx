import { Form } from "react-router-dom";
import React from "react";
import styles from "./index.module.less";

export default function Root(){
  return (
    <>
      <div className={styles.outer}>
        <div className={styles.sideBar}>
          <h1>React Route</h1>
          <div className={styles.title}>
            <form method="post" action="/" className={styles.searchBox}>
              <div id="searchBtn">🔍</div>
              <input type="search" name="search" id="search" />
              <div id="searchSpinner">?</div>
            </form>
            <form action="">
              <button type="submit" className={styles.createBtn}>+</button>
            </form>
          </div>
          <div>
            <ul>
              <li>
                <a href={`/contacts/1`}></a>
              </li>
            </ul>
          </div>
        </div>
        <div id="details">
          111
        </div>
      </div>
    </>
  );
}