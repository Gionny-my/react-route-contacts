import { Form, redirect, useLoaderData } from "react-router-dom";
import { IActionProps, IContact, ILoaderProps } from '../../types';

import { getContact } from '../../contacts';
import styles from "./index.module.less";

interface ILoaderReturn {
  contact: IContact;
}

export async function loader(props: ILoaderProps): Promise<ILoaderReturn> {
  const { contactId } = props.params;
  const contact = await getContact(contactId);
  if (contact === null) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }
  return { contact };
}

export async function action(props: IActionProps) {
  return redirect(`edit`);
}

export default function Contact(){
  const { contact } = useLoaderData() as ILoaderReturn;
  console.log(contact);

  return (
    <div className={styles.outer}>
      <img src={contact.photo} alt="" className={styles.photo}/>
      <div className={styles.info}>
        <div className={styles.nameLine}>
          <div className={contact.name ? '' : styles.noName}>{ contact.name || '佚名' }</div>
          <Favorite isFavorite={contact.isFavorite} />
        </div>
        <div>{contact.note || '这个人什么也没留下'}</div>
        <div className={styles.buttonLine}>
          <Form method="post"><button type="submit">编辑</button></Form>
          <form action=""><button type="submit">删除</button></form>
        </div>
      </div>
    </div>
  );
}

interface IFavoriteProps {
  isFavorite: boolean,
};

function Favorite(props: IFavoriteProps){
  const { isFavorite } = props;
  
  return (
    <>
      <Form method="post">
        <button
          name="favorite"
          value={`${isFavorite}`}
          type="submit"
          aria-label={isFavorite ? '取消收藏' : '添加收藏'}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </Form>
    </>
  );
}