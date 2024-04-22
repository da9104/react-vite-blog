import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import Loader from '../components/Loader'
import Posts from '../components/Posts'

function Home() {
    const { currentUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
      if(!currentUser) {
        setIsLoading(true)
        setTimeout(() => {return window.location.pathname = "/"}, 2000)
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