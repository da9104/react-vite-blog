import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios'

function Home() {
    const { currentUser } = useContext(UserContext);
   
    useEffect(() => {
      const fetchUser = async () => {
      await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth`);
        };
      fetchUser()
      if(!currentUser) {
        setTimeout(() => {return window.location.pathname = "/"}, 2000)
      }   
    }, [currentUser])

    console.log(currentUser)

    return (
        <div>
       {currentUser ? (
        <>
          Protected content for logged-in users
          <Link to="/logout" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Log out </Link>
        </>
      ) : (
        <>
        <p> Please log in to access this page. </p>
        </>
      )}
        </div>
    )
}

export default Home