import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/userContext"
import { redirect, redirectDocument } from "react-router-dom";
import Loader from '../components/Loader'

const Logout = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true) 
        if (currentUser) {
           localStorage.removeItem("user");
           setCurrentUser(null)
           setIsLoading(false)
           redirectDocument("/login")
         }
         return () => {
            setCurrentUser(null)
         }
    }, [currentUser, setCurrentUser])

    if(isLoading) {
        return <Loader />
    }

    return (
        <div>
            logging out...
        </div>
    )
}

export default Logout