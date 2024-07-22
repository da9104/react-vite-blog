import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from "react-router-dom";
import Loader from '../components/Loader'
import Posts from '../components/Posts'

function Home() {
    const { currentUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
      if(!currentUser) {
        setIsLoading(true)
        setTimeout(() => {navigate("/")}, 2000)
      }   
    }, [currentUser])

    if(isLoading) {
        return <Loader />
    }

    return (
        <>
       {currentUser ? <Posts /> : <p> Please log in to access this page. </p>}
        </>
    )
}

export default Home