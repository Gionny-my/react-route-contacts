import { Form, Link, NavLink, Outlet, redirect, useLoaderData, useLocation, useNavigation, useSubmit } from "react-router-dom";
import { IContact, ILoaderProps } from '../../types';
import { createContact, getContacts } from '../../contacts';
import { useCallback, useEffect, useState } from 'react';

import Favorite from '../Contact/Favorite';
import styles from "./index.module.less";

const SEARCH_KEY_WORD = 'q';

interface ILoaderReturn {
  contacts: IContact[];
  query: string; // 搜索参数
}
export async function loader(props: ILoaderProps): Promise<ILoaderReturn> {
  const { request } = props;
  const url = new URL(request.url);
  const query = url.searchParams.get(SEARCH_KEY_WORD) || '';
  const contacts = await getContacts(query);
  return { contacts, query }
}

export async function action() {
  const contact = await createContact();
  return redirect(`contacts/${contact.id}/edit`);
}

export default function Root(){
  const { contacts, query } = useLoaderData() as ILoaderReturn;
  const [searchValue, setSearchValue] = useState(query);
  
  useEffect(() => {
    setSearchValue(query);
  }, [query]);
  
  const submit = useSubmit();
  const onSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    submit(e.currentTarget.form, {
      replace: searchValue !== '',
    });
  }, [searchValue, submit]);
  
    const navigation = useNavigation();
    const isSearching = navigation.location ? new URLSearchParams(navigation.location.search).has(SEARCH_KEY_WORD) : false;

  return (
    <>
      <div className={styles.outer}>
        <div className={styles.sideBar}>
          <Link to="/" className={styles.title}>联系人</Link>
          <div className={styles.head}>
            <Form className={styles.searchBox}>
              <div className={`${styles.searchIcon} ${isSearching ? styles.searchSpinIcon : ''}`}></div>
              <input 
                name={SEARCH_KEY_WORD}
                type="search"
                placeholder="搜索..."
                value={searchValue}
                onChange={onSearch}
              />
            </Form>
            <Form method="post">
              <button type="submit" className={styles.createBtn}>+</button>
            </Form>
          </div>
          <div className={styles.contactDisplayOuter}>
            {
              contacts.length > 0 ? (
                <ul className={styles.contactDisplay}>
                  {
                    contacts.map(contact => (
                        <li key={contact.id} className={styles.contactNameLine}>
                          <NavLink to={`/contacts/${contact.id}`} className={({isActive, isPending}) => (
                              `${isActive ? styles.active : isPending ? styles.pending : ''} ${styles.contactName}`
                            )}>{contact.name || '佚名'}</NavLink>
                          <div className={styles.contactFavorite}>{contact.isFavorite ? '★' : ''}</div>
                        </li>
                    ))
                  }
                </ul>
              ) : '没有联系人'
            }
          </div>
        </div>
        <div className={`${styles.details} ${navigation.state === 'loading' ? styles.loading : ''}`}>
          <Outlet />
        </div>
      </div>
    </>
  );
}