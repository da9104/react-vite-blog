import { useState, useContext, useEffect } from 'react'
import Loader from '../components/Loader'
import { useParams, Link } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import axios from 'axios'

function UserProfile () {
   const {id} = useParams()
   const [currentPassword, setCurrentPassword] = useState('')
   const [newPassword, setNewPassword] = useState('')
   const [confirmNewPassword, setConfirmNewPassword] = useState('')
   const [isLoading, setIsLoading] = useState(false)
   const [avatar, setAvatar] = useState()
   const [email, setEmail] = useState('')
   const [errorMessage, setErrorMessage] = useState('')
   const { currentUser } = useContext(UserContext)
   const [userData, setUserData] = useState({})
   const [isAvatarTouched, setIsAvatarTouched] = useState(false)
   const token = currentUser?.token

   useEffect(() => {
    if(!currentUser) {
        setIsLoading(true)
        setTimeout(() => {return window.location.pathname = "/"}, 2000)
      }   
        const getUser = async () => {
        setIsLoading(true)
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/${id}`, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
            const { email, avatar } = res.data
            if (currentUser) {
                setIsLoading(false)
             }
             setAvatar(avatar)
             setEmail(email)
             setUserData({...res.data})
        } catch (err) {
            setErrorMessage(err)
        }
    }
    getUser()
    }, [])

    if(isLoading) {
        return <Loader />
    }

    const changeAvatarHandler = async () => {
        setIsAvatarTouched(false)
        try {
           const postData = new FormData()
           postData.append('avatar', avatar) 
           const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/change-avatar`, postData, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
           setAvatar(res?.data.avatar)
            if(!postData) {
                setErrorMessage('error')
            }
        } catch (error) {
            console.log(error)
            setErrorMessage(error)
        }
    }

   const updateUserHandler = async (e) => {
    e.preventDefault()
    try {
        const userUpdatedData = new FormData()
        userUpdatedData.set('email', email)
        userUpdatedData.set('currentPassword', currentPassword)
        userUpdatedData.set('newPassword', newPassword)
        userUpdatedData.set('confirmNewPassword', confirmNewPassword)

        const res = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/edit-user`, userUpdatedData, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
        if (res.status == 200) {
            window.location.pathname = '/';
        } else {
            setErrorMessage('error!')
        }
    } catch(error) {
        setErrorMessage(`error: ${error.response.data.message}`, error.response.data.message)
     }
   }

    return (
        <section className='font-sans flex flex-col min-h-full justify-center items-center'>
        { errorMessage && <p className='error mx-5 my-5 text-center'> {errorMessage} </p> }
        { currentUser ? <>
            <h2 className='font-bold text-center mb-5'>User Profile</h2>
          
           { avatar ? <img 
             className="w-28 mx-auto rounded-full -mt-30 border-8 border-white" 
             src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${avatar}`} 
             alt="" /> : <svg className="m-auto border-gray-100 border-2 rounded-full  bg-gray-100 h-36 w-36 text-orange-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            }
            
             <form className='relative'>
                <input 
                className='invisible'
                type="file" 
                name="avatar" 
                id="avatar" 
                onChange={e => setAvatar(e.target.files[0])} 
                accept='png, jpg, jpeg' 
                />
                <label htmlFor='avatar' onClick={() => {setIsAvatarTouched(true)}}>
                    <svg className="absolute h-8 w-8 text-red-500 bottom-3 right-20"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="9" />  <path d="M9 12l2 2l4 -4" /></svg>
                </label>
               </form>
                { isAvatarTouched && <button className='avatar-btn relative' onClick={changeAvatarHandler}>
                     <svg id="avatar_touch" className="absolute h-8 w-8 text-white-50 bottom-3 -right-20"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="9" fill="#3B82F6" />  <path d="M9 12l2 2l4 -4" /></svg>
                </button> }
            
       <form className="flex flex-col items-center justify-center text-center" onSubmit={updateUserHandler}>
         <div className='card w-96 mx-auto bg-white space-y-6 hover:shadow'>
         <p className="text-2xl font-bold text-navy-700 dark:text-white">
            {userData?.posts && <p> {userData?.posts}</p>} 
            <p className="text-sm font-normal text-gray-600">
            <Link to={`/myposts/${currentUser.id}`}>Posts</Link> 
            </p>
         </p>
        
            <input 
            type="text" 
            placeholder={userData.firstName}
            className=" block w-full rounded-md border-0  p-4  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            disabled={userData.firstName && userData.firstName}
            />
            <input 
            type="text" 
            placeholder={userData.lastName} 
            className="block w-full rounded-md border-0  p-4  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            disabled={userData.firstName && userData.firstName}
           />
            <input 
             placeholder={userData.email} 
             value={email}
             id="email" 
             name="email" 
             type="email" 
             autoComplete="email" 
             onChange={(e) => {
                console.log(e.target.value)
                setEmail(e.target.value) 
            }}
             required 
             className="block w-full rounded-md border-0  p-4  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <input 
            required 
            className="block w-full rounded-md border-0  p-4  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="password" 
            name="password"
            placeholder="Current password" 
            value={currentPassword} 
            onChange={(e) => setCurrentPassword(e.target.value)}/>
            <input 
            required 
            className="block w-full rounded-md border-0  p-4  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="password" 
            placeholder="New password" 
            name="newPassword"
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)}/>
            <input 
            required 
            className="block w-full rounded-md border-0  p-4  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="password" 
            placeholder="Confirm new password" 
            name="confirmNewPassword"
            value={confirmNewPassword} 
            onChange={(e) => setConfirmNewPassword(e.target.value)}/>
            <button 
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            > Update Details</button>
            </div>
           </form>
           </> : <p> Please try again, </p> }
        </section>
    )
}

export default UserProfile