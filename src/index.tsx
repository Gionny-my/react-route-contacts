import './index.css';

import Contact, {action as contactAction, loader as contactLoader} from "./pages/Contact/index";
import EditContact, { action as editAction, loader as editLoader } from './pages/EditContact';
import Root, { action, loader as rootLoader } from './pages/Root/index';
import {
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";

import ErrorPage from "./pages/ErrorPage/index";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { action as deleteAction } from './pages/deleteContact';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: action,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: 'contacts/:contactId',
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: 'contacts/:contactId/edit',
            element: <EditContact />,
            loader: editLoader,
            action: editAction,
          },
          {
            path: 'contacts/:contactId/delete',
            action: deleteAction,
          },
        ]
      }
    ]
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
