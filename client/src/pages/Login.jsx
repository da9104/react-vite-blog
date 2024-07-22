import { useContext, useState } from "react"
import { UserContext } from "../context/userContext"
import { Link } from 'react-router-dom';
import axios from 'axios'
import { socket } from "../socket"

function Login() {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
    })
    const [errorMessage, setErrorMessage] = useState('')
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const [userName, setUserName] = useState('');

    const inputHandleChnage = (e) => {
        setUserData(preveState => {
        return {...preveState, [e.target.name]: e.target.value}
      })
    }
    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_ASSETS_URL}/api/auth/login`, userData)
          const user = await response.data
          if (userData.email === "" || userData.password === "") {
            setErrorMessage("Empty email/password field");
           } else if (!user) {
            setErrorMessage("Invalid email/password");
          } else {
            setCurrentUser(user)
           //  setUserName(user)
           //   socket.emit('newUser', { userName: firstName, socketID: socket.id });
            window.location.pathname = "/home";
           }
        } catch (error) {
            console.log(error)
            setErrorMessage("Invalid email/password");
        }
     }

    return (
        <>
        <div className="flex min-h-full flex-col justify-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          { errorMessage && <p className="font-bold text-red-600"> {errorMessage} </p> }
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>
      
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form     
          onSubmit={handleLoginSubmit} 
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
                required 
                className="block w-full rounded-md border-0  p-4  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
      
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                </div>
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
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
            </div>
          </form>
      
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Create a new account </Link>
          </p>
        </div>
      </div>
      </>
    )
}

export default Login