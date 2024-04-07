import {
    Route,
    Routes,
  } from "react-router-dom";
import Layout from './components/Layout.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home'
import App from './App.jsx'
import Logout from './pages/Logout.jsx'

export default function Root() {
    return (
      <Routes>
        <Route element={<Layout />}>
            <Route path="*" element={<App />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    );
  }