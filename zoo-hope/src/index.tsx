import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PetList } from './components/pet-list/petList';
import routes from './data/router';
import Overlay from './components/overlay/Overlay';
import { AdminPage } from './components/admin-page';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter(routes);

root.render(
  <React.StrictMode>
    {true ? 
    <Overlay>
      <RouterProvider router={router} />
    </Overlay> :
    <AdminPage />
    }
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
