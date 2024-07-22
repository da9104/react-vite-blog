import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import LandingPage from './LandingPage.jsx'
import Root from './Root.jsx'
import Login from './pages/Login.jsx'
import AuthorPosts from './pages/AuthorPosts.jsx'
import Register from './pages/Register.jsx';
import ErrorPage from './pages/ErrorPage.jsx'
import CreatePost from './pages/CreatePost.jsx'
import DeletePost from './pages/DeletePost.jsx'
import EditPost from './pages/EditPost.jsx'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import UserProfile from './pages/UserProfile.jsx'
import Logout from './pages/Logout.jsx'
import UserProvider from './context/userContext.jsx'
import PostDetail from './pages/PostDetail.jsx';
import CategoryPost from './pages/CategoryPost.jsx'
import Authors from './pages/Authors.jsx'

const router = createBrowserRouter([
  { 
    path: "/", 
    element: <UserProvider><Root /></UserProvider>,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: "/home", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/logout", element: <Logout /> },
      { path: "/profile/:id", element: <UserProfile /> },
      { path: "/create-post", element: <CreatePost /> },
      { path: "/myposts/:id", element: <Dashboard /> },
      { path: "/authors", element: <Authors /> },
      { path: "/posts/categories/:category", element: <CategoryPost />  },
      { path: "/posts/:id", element: <PostDetail />  },
      { path: "/posts/users/:id", element: <AuthorPosts />  },
      { path: "/posts/:id/edit-post", element: <EditPost /> },
      { path: "/posts/:id/delete-post", element: <DeletePost /> },
    ]},
    { path: "*", element: <Root /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
