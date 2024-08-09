import { Form, useLoaderData } from "react-router-dom";
import { IActionProps, IContact, ILoaderProps } from '../../types';
import { getContact, updateContact } from '../../contacts';

import Favorite from './Favorite';
import styles from "./index.module.less";
import { useCallback } from 'react';

interface ILoaderReturn {
  contact: IContact;
}

export async function loader(props: ILoaderProps): Promise<ILoaderReturn> {
  const { contactId } = props.params;
  if (contactId) {
    const contact = await getContact(contactId);
    if (contact !== null) {
      return { contact };
    }
  }
  throw new Response('', {
    status: 404,
    statusText: encodeURIComponent('查无此人'),
  });
}

export async function action(props: IActionProps) {
  const { params, request } = props;
  const formData = await request.formData();
  const form = Object.fromEntries(formData);
  if ('contactId' in params && typeof params.contactId === 'string') {
    if ('isFavorite' in form) {
      return await updateContact(params.contactId, {
        id: params.contactId,
        isFavorite: form.isFavorite === 'false',
      });
    } else {
      throw new Response('', { status: 404, statusText: encodeURIComponent('收藏失败') });
    }
  } else {
    throw new Response('', { status: 404, statusText: encodeURIComponent(`URL参数错误`) });
  }
}

export default function Contact(){
  const { contact } = useLoaderData() as ILoaderReturn;

  const onDelete = useCallback((event: React.FormEvent<HTMLButtonElement>) => {
    if (!window.confirm('你要删了ta吗？')) {
      event.preventDefault();
    }
  }, []);

  return (
    <div className={styles.outer}>
      <img src={contact.photo} alt="" className={styles.photo}/>
      <div className={styles.info}>
        <div className={styles.nameLine}>
          <div className={contact.name ? '' : styles.noName}>{ contact.name || '佚名' }</div>
          <Favorite isFavorite={contact.isFavorite || false} />
        </div>
        <div>{contact.note || '这个人什么也没留下'}</div>
        <div className={styles.buttonLine}>
          <Form action="edit"><button type="submit">编辑</button></Form>
          <Form action="delete" method="post"><button type="submit" onSubmit={onDelete}>删除</button></Form>
        </div>
      </div>
    </div>
  );
}

