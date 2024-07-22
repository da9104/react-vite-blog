import { useState, useEffect } from 'react' 
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import axios from 'axios'

const Authors = () => {
    const [authors, setAuthors] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
      const getAuthors = async () => {
        setIsLoading(true)
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth`)
            if (res) {
                setAuthors(res?.data)
            } else {
                setErrorMessage('Cannot found.')
            }
        } catch (err) {
            console.log(err)
        }
        setIsLoading(false)
      }
      getAuthors()
    }, [])

    if(isLoading) {
        return <Loader />
    }

    return (
     <section className='authors-section'>
        { errorMessage && <p className="font-bold text-red-600"> {errorMessage} </p> }
        { authors && authors.length > 0 ? (
                <div>
                 {
                    authors.map(({ _id: id, avatar, firstName, lastName, posts }) => {
                        return <Link key={id} to={`/posts/users/${id}`} className='flex flex-row gap-2'>
                          { avatar ? <img 
                            className='w-10 rounded-full -mt-30 border-8 border-white'
                            src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${avatar}`}
                            alt={id} />
                             : <svg className=" bg-gray-50 h-5 w-5 text-orange-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                             </svg> }
                            <h4 className='self-center justify-center'>{firstName} {lastName}</h4>
                            <p className='self-center'> Posts: {posts}</p>
                        </Link>
                    })
                 }
                </div>
                ) : (
                <p> No user found.</p>
                )}
  </section>
    )
}

export default Authors