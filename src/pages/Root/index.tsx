import { Form, Link, NavLink, Outlet, redirect, useLoaderData } from "react-router-dom";
import { createContact, getContacts } from '../../contacts';

import { IContact } from '../../types';
import React from "react";
import styles from "./index.module.less";

export async function loader() {
  const contacts = await getContacts('');
  return { contacts }
}

export async function actionCreateContact() {
  const contact = await createContact();
  return redirect(`contacts/${contact.id}/edit`);
}

export default function Root(){
  const loader = useLoaderData() as object;
  let contacts: IContact[] = [];
  if ('contacts' in loader && Array.isArray(loader.contacts)) {
    contacts = loader.contacts;
  }

  return (
    <>
      <div className={styles.outer}>
        <div className={styles.sideBar}>
          <Link to="/" className={styles.title}>联系人</Link>
          <div className={styles.head}>
            <Form method="post" className={styles.searchBox}>
              <div id="searchBtn">🔍</div>
              <input 
                id="search" 
                name="search" 
                type="search" 
                placeholder="搜索..." 
              />
              <div id="searchSpinner" aria-hidden hidden={true}>?</div>
            </Form>
            <Form method="post">
              <button type="submit" className={styles.createBtn}>+</button>
            </Form>
          </div>
          <div>
            {
              contacts.length > 0 ? (
                <ul className={styles.contactDisplay}>
                  {
                    contacts.map(contact => (
                        <li key={contact.id} className={styles.contactNameLine}>
                          <NavLink to={`/contacts/${contact.id}`} className={({ isActive, isPending}) => (
                            `${isActive ? styles.active : isPending ? styles.pending : ''} ${styles.contactName}`
                          )}>{contact.name || '佚名'}</NavLink>
                        </li>
                    ))
                  }
                </ul>
              ) : '没有联系人'
            }
          </div>
        </div>
        <div className={styles.details}>
          <Outlet />
        </div>
      </div>
    </>
  );
}