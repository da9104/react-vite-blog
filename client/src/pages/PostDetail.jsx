import { useContext, useState, useEffect } from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader'
import DeletePost from './DeletePost'
import { UserContext } from '../context/userContext'
import DOMPurify from "dompurify";

const PostDetail = () => {
    const {id} = useParams()
    const [post, setPost] = useState()
    const [authorId, setAuthorId] = useState()
    const [errorMessage, setErrorMessage] = useState(null)
    const [isLoading, setIsLoading] =useState(false)
    const { currentUser } = useContext(UserContext)
    
    useEffect(() => {
        const getPost = async () => {
            setIsLoading(true)
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/posts/${id}`)
               if (res.data) {
                   setPost(res?.data)
                   setAuthorId(res.data.author)
               } else {
                   setErrorMessage('Failed to fetch post data');
               }
            } catch (err) {
                setErrorMessage(err)
            } finally {
                setIsLoading(false);
            }
        }
        getPost()
    }, [])

    if(isLoading) {
        return <Loader />
    }


    return (
        <section className='post-detail container py-3 px-3'>
          { errorMessage && <p className='font-bold text-red-600'>{errorMessage}</p>}
          { post && <div>
         <div className=" flex flex-row justify-between"> 
         <p className='text-2xl font-bold text-gray-700 py-3 px-3'> {post.title} </p> 
             <div className='mt-1'>
            { currentUser?.id == post?.author && 
              <div className="flex flex-row gap-6">
                <Link to={`/posts/${post?._id}/edit-post`} 
                className="middle none center rounded-lg bg-orange-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"> Edit </Link>
                <DeletePost postId={id} />
              </div> 
            }
          </div>
              </div>
                <div className='aspect-h-1 h-76 overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75'>
                    <img 
                    className='m-auto h-full w-4/3 object-cover object-center md:h-full lg:w-2/3'
                    src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${post.thumbnail}`} 
                    alt="thumbnail" />
                </div>
          <PostAuthor authorId={authorId} createdAt={post.createdAt} />
           <p className='px-5 py-5' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.description) }} />
        </div>  }
        {!post && !isLoading && <> 
            <p> No posts found. </p>
            <Link to='/create-post'> Create a post now </Link>
            </> 
        }
        </section>
    )
}

export default PostDetail