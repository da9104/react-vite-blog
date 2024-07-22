import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import axios from 'axios'

const DeletePost = ({ postId }) => {
    const [isLoading, setIsLoading] = useState(false)  
    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token
    const navigate = useNavigate();

    useEffect(() => {
        if(!currentUser) {
          setTimeout(() => {return navigate("/")}, 2000)
        }   
      }, [currentUser])
  
      const deletePost = async (postId) => {
        setIsLoading(true)
        try {
          const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/posts/${postId}`, { withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
            if (response.status === 200) {
              window.location.pathname = "/home";
            } else {
              console.log('server:', response.data)
              window.location.pathname = "/home";
            }
         } catch (err) {
          if (err.response && err.response.status === 403) {
             console.error('Error: User is not authorized to delete posts');  
          }
          console.error('Error deleting post:', err.response);
        } finally {
          setIsLoading(false);
        }
      }

    if(isLoading) {
      return <Loader />
     }

    return (
        <>
         { currentUser? (
         <Link onClick={() => deletePost(postId)} 
         className="middle none center rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
         data-ripple-light="true"> Delete </Link> ) : ( <p> Please log in</p> ) }
       </>
    )
}

export default DeletePost