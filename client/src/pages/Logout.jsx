import { useContext, useEffect } from "react"
import { UserContext } from "../context/userContext"

const Logout = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext)
    
    useEffect(() => {
        if (currentUser) {
           localStorage.removeItem("user");
           setCurrentUser(null)
           window.location.pathname = "/login";
         }
    }, [currentUser, setCurrentUser])

    return (
        <div>
            logging out...
        </div>
    )
}

export default Logout