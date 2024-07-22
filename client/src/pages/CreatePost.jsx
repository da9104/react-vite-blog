import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext';
import { redirectDocument } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'


const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const {currentUser} = useContext(UserContext)
    const [errorMessage, setErrorMessage] = useState('')
    const token = currentUser?.token

    useEffect(() => {
        if(!currentUser) {
          setTimeout(() => {return redirectDocument("/")}, 2000)
        }  
      }, [currentUser])

    const modules = {
        toolbar: [
            [{'header': [1,2,3,4,5,6, false]}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote' ],
            [{'header': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'indent',
        'link', 'image'
    ]

    const POST_CATEGORY = ['Miscellaneous', 'Business', 'Inspo', 'Education', 'Art', 'Entertainment', 'Book', 'Blog']

    const createPost = async (e) => {
        e.preventDefault()
        const postData = new FormData()
        postData.set('title', title)
        postData.set('category', category || 'Miscellaneous')
        postData.set('description', description)
        postData.set('thumbnail', thumbnail)

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/posts`, postData, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
            if (response.status == 201) {
              return window.location.pathname = "/home";
            } else {
                setErrorMessage('Error: unable to create a post')
            }
        } catch (err) {
            console.log(err)
            setErrorMessage('Error: unable to create a post')
        }
    }

    return (
        <section className='post-create-form container '>
            { errorMessage && <p className='error mx-5 my-5 text-center'> {errorMessage} </p> }
            <div className='flex justify-center '>
            { currentUser? (<form className='form space-y-4' onSubmit={createPost}>
              <input type="text" placeholder='Title' value={title} autoFocus onChange={(e) => setTitle(e.target.value)} />
              <select name="category" value={category} id="category" onChange={(e) => setCategory(e.target.value)}>
                   { POST_CATEGORY.map((category) => {
                      return <option key={category}>{category}</option>
                   })}
              </select>
              <ReactQuill modules={modules} formats={formats} theme="snow" value={description} onChange={setDescription} />
              <input type="file" onChange={e => setThumbnail(e.target.files[0])} accept='png, jpg, jpeg' />
              <button type='submit'
              className='middle none center rounded-lg bg-indigo-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-indigo-500/20 transition-all hover:shadow-lg hover:shadow-indigo-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'>Post</button>
            </form>
            ) : (<p className='text-center'> Please log in</p>) }
            </div>
         </section>
    )
}



export default CreatePost