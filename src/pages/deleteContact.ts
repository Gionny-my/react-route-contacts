import { IActionProps } from '../types';
import { deleteContact } from '../contacts';
import { redirect } from 'react-router-dom';

export async function action(props: IActionProps) {
  const { params } = props;
  const id = params['contactId'];
  if (id && window.confirm('你想要删了ta吗？')) {
    await deleteContact(id);
    return redirect('/');
  }
  throw new Response('', { status: 404, statusText: 'Deletion Failed'});
}