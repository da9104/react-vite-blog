import { useState, useEffect } from 'react'
import { UserContext } from '../context/userContext'
import { Link, useParams } from 'react-router-dom'
import PostItem from '../components/PostItem'
import Loader from '../components/Loader'
import axios from 'axios'

const AuthorPosts = () => {
    const {id} = useParams()
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true)   
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/posts/users/${id}`)
                setPosts(res?.data)
            } catch (err) {
                console.log(err)
            }
            setIsLoading(false)
        }
        fetchPosts()
    }, [id])

    if(isLoading) {
        return <Loader />
    }

    return (
        <section className='dashboard-posts'>
            { posts.length > 0 ?
            <section className="container mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8">
             <div className="mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
             { posts.map(({ _id: id, thumbnail, category, title, author, description, createdAt }) => {
                return <PostItem key={id} category={category} postId={id} title={title} description={description} author={author} thumbnail={thumbnail} createdAt={createdAt} />
             })
            }
             </div>
            </section> : <> 
            <p> No posts found. </p>
            </> 
             }
         </section>
    )
}

export default AuthorPosts