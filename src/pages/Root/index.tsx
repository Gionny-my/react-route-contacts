import { Form, Link, Outlet } from "react-router-dom";

import React from "react";
import styles from "./index.module.less";

export default function Root(){
  return (
    <>
      <div className={styles.outer}>
        <div className={styles.sideBar}>
          <h1 className={styles.title}>React Route</h1>
          <div className={styles.head}>
            <form method="post" action="/" className={styles.searchBox}>
              <div id="searchBtn">🔍</div>
              <input 
                id="search" 
                name="search" 
                type="search" 
                placeholder="搜索..." 
              />
              <div id="searchSpinner" aria-hidden hidden={true}>?</div>
            </form>
            <form action="">
              <button type="submit" className={styles.createBtn}>+</button>
            </form>
          </div>
          <div>
            <ul>
              <li>
                <Link to={`/contacts/1`}>三月七</Link>
              </li>
              <li>
                <Link to={`/contacts/2`}>伍四六</Link>
              </li>
            </ul>
          </div>
        </div>
        <div id="details">
          <Outlet />
        </div>
      </div>
    </>
  );
}