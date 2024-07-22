const { Router } = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { createPost, getPosts, getSinglePost, getCategories, getUserPosts, editPost, deletePost, getCategoryList } = require('../controllers/postController')

const router = Router()

router.get('/', getPosts)
router.post('/', authMiddleware, createPost)
router.get('/:id', getSinglePost)
router.get('/categories/:category', getCategories)
router.get('/getCategoryList', getCategoryList)
router.get('/users/:id', getUserPosts)
router.patch('/:id', authMiddleware, editPost)
router.delete('/:id', authMiddleware, deletePost)

module.exports = router