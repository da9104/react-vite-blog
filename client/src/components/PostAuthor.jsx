import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const PostAuthor = ({ authorId, createdAt }) => {
    const [author, setAuthor] = useState([])
    useEffect(() => {
        const getAuthor = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/${authorId}`)
            setAuthor(res?.data)
        } catch(err) {
            console.log(err)
        }
     }
     getAuthor()
    }, [])
    // console.log(author)
    return (
        <>
        <div className='profile flex flex-row'>
        { author?.avatar ? <img 
            className='w-10 rounded-full -mt-30 border-8 border-white'
            src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${author?.avatar}`} 
            alt={author?.firstName} 
         /> : <svg className="my-2 mx-2 rounded-full bg-gray-50 h-5 w-5 text-orange-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>  }
           <Link className="self-center" to={`/posts/users/${authorId}`}> <p className="self-center "> By: {author?.firstName + ' ' + author?.lastName} </p> </Link>
          </div>
         <div>
            <small> <ReactTimeAgo date={new Date(createdAt)} locale={'en-US'}/></small>
         </div>   
        </>
    )
}

export default PostAuthor