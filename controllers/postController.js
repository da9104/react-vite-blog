const mongoose = require('mongoose')
const Post = mongoose.model('posts')
const User = mongoose.model('users')
const path = require('path')
const fs = require('fs')
const {v4: uuid} = require('uuid')
const HttpError = require('../models/ErrorModel')

const getPosts = async (req, res, next) => {
  try { 
    const posts = await Post.find().sort({updatedAt: -1})
    res.status(200).json(posts)
  } catch (err) {
    return next(new HttpError(err))
  }
}

const getCategoryList = async (req, res, next) => {
    try {
        const categories = await Post.aggregate([
          { $project: { _id: 0, category: 1 } }
        ])
        // Assuming categories is an array of documents
         const categoryList = categories.map(doc => doc.category); // Extract category values
         // console.log(categoryList)
         res.josn(categoryList)
    } catch (err) {
        return next(new HttpError(err))
    }
}

/////
//
////
const getSinglePost = async (req, res, next) => {
  try { 
    const postId = req.params.id
    const post = await Post.findById(postId)
    if(!post) {
      return next(new HttpError("Not found", 404))
    }
    res.status(200).json(post)
  } catch (err) {
    return next(new HttpError(err))
  }
}
/////
// api/posts
////
const createPost = async (req, res, next) => {
    try {
        let { title, category, description } = req.body
        if(!title || !category || !description) {
            return next(new HttpError('You need to fill the forms', 422))    
           }
        const {thumbnail} = req.files
        if (thumbnail.size > 5000000) {
            return next(new HttpError('File size has limitted 2MB', 402))
          }
        let fileName = thumbnail.name
        let splittedFilename = fileName.split('.')
        let newFileName = splittedFilename[0] + uuid() + "." + splittedFilename[splittedFilename.length-1]
        thumbnail.mv(path.join(__dirname, '..', '/uploads', newFileName), async (err) => { 
            const newPost = await new Post({title, category, description, thumbnail: newFileName, author: req.user.id}).save()
            if (!newPost) {
                return next(new HttpError("The post can not be created.", 422))
            }
            const currentUser = await User.findById(req.user.id)
            const userPostCount = currentUser.posts + 1
            await User.findByIdAndUpdate(req.user.id, { posts: userPostCount })
            res.status(201).json(newPost)
        })
    } catch (err) {
        return next(new HttpError(err, 402))
    }
}

const editPost = async (req, res, next) => {
    try {
      let fileName
      let newFileName
      let updatedPost
      const postId = req.params.id
      let { title, category, description } = req.body
      if(!title || !category || !description) {
         return next(new HttpError('You need to fill the forms', 422))    
       }
       const oldPost = await Post.findById(postId)
       if (req.user.id == oldPost.author) {
        if(!req.files) {
            updatedPost = await Post.findByIdAndUpdate(postId, { title, category, description }, {new: true})
          } else {
            fs.unlink(path.join(__dirname, '..', 'uploads', oldPost.thumbnail), async (err) => {
                if (err) {
                    return next(new HttpError(err, 402))
                }
            })
            const {thumbnail} = req.files
            if (thumbnail.size > 2000000) {
                return next(new HttpError("Thumbnail size is exceeded", 402))
            }
            fileName = thumbnail.name
            let splittedFilename = fileName.split('.')
            newFileName = splittedFilename[0] + uuid() + "." + splittedFilename[splittedFilename.length-1]
            thumbnail.mv(path.join(__dirname, '..', 'uploads', newFileName), async (err) => {
                if(err) {
                    return next(new HttpError(err))
                }
            })
            updatedPost = await Post.findByIdAndUpdate(postId, {title, category, description, thumbnail: newFileName}, {new: true}) 
          }
          if (!updatedPost) {
            return next(new HttpError('Cannot update the post. try again', 402))
          }
          res.status(200).json(updatedPost)
       } else {
        return next(new HttpError('Post cannot be edited.', 402))
       }
    } catch (err) {
        return next(new HttpError(err, 402))
    }
}

const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id
        if (!postId) {
            return next(new HttpError("Post is not found.", 400))
        }
        const post = await Post.findById(postId)
        const fileName = post?.thumbnail
        if (req.user.id == post.author) {
            fs.unlink(path.join(__dirname, '..', 'uploads', fileName), async (err) => {
                if(err) {
                    return next(new HttpError(err))
                } else {
                    await Post.findByIdAndDelete(postId)
                    const currentUser = await User.findById(req.user.id)
                    const userPostCount = currentUser?.posts -1
                    await User.findByIdAndUpdate(req.user.id, {posts: userPostCount})
                    res.json(`${postId} successfully deleted.`)
                }
            })
        } else {
            return next(new HttpError('Post cannot be deleted.', 403))
        }
       
    } catch (err) {
        return next(new HttpError(err, 402))
    }
}

const getCategories = async (req, res, next) => {
   try {
    const {category} = req.params
    const categoryPosts = await Post.find({category}).sort({createdAt: -1})
    res.status(200).json(categoryPosts)
   } catch (err) {
    return next(new HttpError(err, 402))
   }
}

/// api/posts/users/:id
const getUserPosts = async (req, res, next) => {
 try {
    const {id} = req.params
    const posts = await Post.find({author: id}).sort({createdAt:-1})
    res.status(200).json(posts)
 } catch(err) {
    return next(new HttpError(err, 402))
 }
}

module.exports = { getPosts, getSinglePost, createPost, editPost, deletePost, getCategories, getUserPosts, getCategoryList }