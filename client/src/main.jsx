import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Root.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx';
import ErrorPage from './pages/ErrorPage.jsx'
import Home from './pages/Home'
import Logout from './pages/Logout.jsx'
import UserProvider from './context/userContext.jsx'


const router = createBrowserRouter([
  { path: "*", Component: Root },
  { 
    path: "/", 
    element: <UserProvider><Root /></UserProvider>,
    errorElement: <ErrorPage />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/logout", element: <Logout /> },
      { path: "/login", element: <Login /> },
    ]},
  { path: "/register", element: <Register /> }, //public route
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
