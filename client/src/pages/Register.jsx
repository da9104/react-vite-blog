import { useState, useContext } from "react"
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext"
import axios from "axios"

function Register() {
    const [userData, setUserData] = useState({
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    })
    const [errorMessage, setErrorMessage] = useState("")
    const { setCurrentUser } = useContext(UserContext)

    const inputHandleChnage = (e) => {
      setUserData(preveState => {
        return {...preveState, [e.target.name]: e.target.value}
      })
    }

    const registerUser = async (e) => {
       e.preventDefault()
       try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, userData)
        const newUser = await response.data
        if (userData.email === "" || userData.password === "") {
            setErrorMessage("Empty email/password field");
           } else if (!newUser) {
            setErrorMessage("Invalid email/password");  
          } else {
            setCurrentUser(newUser)
            localStorage.setItem("user", "true");
            window.location.pathname = "/home";
           }
        } catch(error) {
            console.log(error)
            setErrorMessage("Invalid email or password, try again");
         }
    }
    return (
        <>
        <div className="flex min-h-full flex-col justify-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          { errorMessage && <p className="font-bold text-red-600"> {errorMessage} </p> }
          <h2 className=" mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create your account</h2>
        </div>
        
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form     
          onSubmit={registerUser} 
          className="space-y-6" action="#">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input 
                value={userData.email}
                onChange={inputHandleChnage}
                id="email" 
                name="email" 
                type="email" 
                autoComplete="email" 
                placeholder="Email"
                required className="block w-full rounded-md border-0  p-4  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div className="flex flex-row gap-2 justify-evenly">
              <div className="mt-2 w-1/2">
              <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">First name</label>
                <input 
                value={userData.firstName}
                onChange={inputHandleChnage}
                id="firstName" 
                name="firstName" 
                type="text" 
                placeholder="First name"
                autoComplete="firstName" 
                required className="block w-full rounded-md border-0  p-4  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
              <div className="mt-2 w-1/2">
              <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                <input 
                value={userData.lastName}
                onChange={inputHandleChnage}
                id="lastName" 
                name="lastName" 
                type="text" 
                autoComplete="lastName" 
                placeholder="Last name"
                required 
                className="block w-full rounded-md border-0  p-4  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
      
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              
              </div>
              <div className="mt-2">
                <input 
                value={userData.password}
                onChange={inputHandleChnage}
                id="password" 
                name="password" 
                type="password" 
                placeholder="Password"
                autoComplete="current-password" required 
                className="block w-full rounded-md border-0  p-4  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
             
            </div>
      
            <div>
              <button 
              type="submit" 
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
            </div>
          </form>
      
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?
            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Sign in</Link>
          </p>
        </div>
      </div>
      </>
    )
}

export default Register