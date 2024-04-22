import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor';
import DOMPurify from 'dompurify';

const PostItem = ({ postId, thumbnail, category, title, author, description, createdAt }) => {
   const shortDescription = description.length > 140 ? description.substr(0, 140) + '...' : description;
   const clean = DOMPurify.sanitize(shortDescription)
   const postTitle = title.length > 25 ? title.substr(0, 25) + '...' : title;
   
   return (   
        <div className="group relative">
               <div key={postId} className="mt-4 flex flex-col justify-evenly">
                <div className="aspect-h-1 h-52 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 z-0">
                    <img 
                    src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${thumbnail}`} 
                    alt={title}
                    className="h-52 w-full object-cover object-center lg:w-full lg:h-3/2" />
                </div>

                <div className='post-category'>
                    {/* "/posts/categories/:category" */}
                <Link to={`/posts/categories/${category}`}>
                    <p className="mt-1 text-sm font-medium text-gray-900"> {category}</p>
                </Link>
                </div>
              
                <div>
                    <h3 className="text-sm text-gray-700">
                        <Link to={`/posts/${postId}`}> 
                            <p> {postTitle} </p>
                        </Link>
                    </h3>
                </div>

                <div className=''>
                <p className="mt-1 text-sm font-medium text-gray-900"> 
                <PostAuthor authorId={author} createdAt={createdAt} /> 
                </p>
                <Link to={`/posts/${postId}`}>
                 <p dangerouslySetInnerHTML={{ __html: clean }} className="mt-1 text-sm text-gray-500" />
                </Link>
                </div>
            </div>
          </div>
    )
}

export default PostItem