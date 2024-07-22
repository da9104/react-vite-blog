import { Route, Routes } from "react-router-dom";
import LandingPage from './LandingPage.jsx'
import Layout from './components/Layout.jsx'
import Login from './pages/Login.jsx'
import AuthorPosts from './pages/AuthorPosts.jsx'
import CategoryPost from './pages/CategoryPost'
import Authors from './pages/Authors'
import Home from './pages/Home'
import ErrorPage from './pages/ErrorPage.jsx'
import UserProfile from './pages/UserProfile'
import Register from './pages/Register.jsx';
import CreatePost from './pages/CreatePost.jsx'
import DeletePost from './pages/DeletePost.jsx'
import EditPost from './pages/EditPost.jsx'
import Logout from './pages/Logout.jsx'
import Dashboard from "./pages/Dashboard.jsx";
import PostDetail from './pages/PostDetail'

export default function Root() {
    return (
       <Routes>
        <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile/:id" element={<UserProfile /> } />
            <Route path="/register" element={<Register />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/authors" element={<Authors />} />
            <Route path="/myposts/:id" element={<Dashboard />} />
            <Route path="/posts/categories/:category" element={<CategoryPost />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/posts/users/:id" element={<AuthorPosts />} />
            <Route path="/posts/:id/edit-post" element={<EditPost />} />
            <Route path="/posts/:id/delete-post" element={<DeletePost />} />
        </Route>
      </Routes>
    );
  }