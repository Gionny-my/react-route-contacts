import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { IActionProps, IContact, ILoaderProps, isIContact } from '../../types';
import { getContact, updateContact } from '../../contacts';

import styles from "./index.module.less";

interface ILoaderReturn {
  contact: IContact;
}

export async function loader(props: ILoaderProps): Promise<ILoaderReturn> {
  const { params } = props;
  if ('contactId' in params && typeof params.contactId === 'string') {
    const contact = await getContact(params.contactId);
    if (contact !== null) {
      return { contact };
    }
  }

  throw new Response('', {
    status: 404,
    statusText: 'No Person',
  });
}

export async function action(props: IActionProps) {
  const { request, params } = props;
  const formData = await request?.formData() || new FormData();
  const data = Object.fromEntries(formData);
  const id = params?.contactId;
  if (!id) {
    throw new Response('', {
      status: 404,
      statusText: 'No Person',
    })
  }
  if (isIContact(data)) {
    await updateContact(id, data);
    return redirect(`/contacts/${id}`);
  }
  throw new Response('', { status: 404, statusText:'Form Error' })
}

export default function EditContact(){
  const { contact } = useLoaderData() as ILoaderReturn;
  const navigate = useNavigate();
  
  return (
    <>
      <Form method="post" className={styles.outer}>
        <input type="hidden" name="id" value={contact.id} />
        <div className={styles.form}>
          <label htmlFor="name">名字</label>
          <input type="text" name="name" id="name" defaultValue={contact.name} />
          <label htmlFor="photo">照片地址</label>
          <input type="text" name="photo" id="photo" defaultValue={contact.photo} />
          <label htmlFor="note">个性签名</label>
          <textarea name="note" id="note" defaultValue={contact.note} />
        </div>
        <button type="submit">保存</button>
        <button onClick={() => { navigate(-1) }}>取消</button>
      </Form>
    </>
  );
}