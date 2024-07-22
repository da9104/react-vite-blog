import { useState, useEffect, useContext } from 'react'
import { UserContext } from "../context/userContext"
import { Link, useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader'
import PostItem from '../components/PostItem'
import axios from 'axios'

function Dashboard () {
    const {id} = useParams()
    const { currentUser } = useContext(UserContext);
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const token = currentUser?.token
    const navigate = useNavigate();

    useEffect(() => {
        if(!currentUser) {
            setIsLoading(true)
            setTimeout(() => {return navigate("/")}, 2000)
          }  

        const fetchPosts = async () => {
            setIsLoading(true)   
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/posts/users/${id}`, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
                setPosts(res?.data) // /users/:id
            } catch (err) {
                console.log(err)
            }
            setIsLoading(false)
        }
        fetchPosts()
    }, [currentUser])

    if(isLoading) {
        return <Loader />
    }

    return (
        <div>
         { posts.length > 0 ?
            <section className="container mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8">
             <div className="mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
             { posts.map(({ _id: id, thumbnail, category, title, author, description, createdAt }) => {
                return <PostItem key={id} category={category} postId={id} title={title} description={description} author={author} thumbnail={thumbnail} createdAt={createdAt} />
             })
            }
             </div>
            </section> : <div className='m-auto place-content-center'> 
            <p className='text-center'> No posts found. </p>
            <Link to='/create-post' className='block mx-auto text-center'> Create a post now </Link>
            </div>  
             }
        </div>
    )
}

export default Dashboard