const { registerUser, loginUser, getUser, getAuthors, changeAvatar, editUser } = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

module.exports = (app) => {
    app.get('/api/auth', getAuthors, (req, res, next) => {  
     res.send(req.user)  
      if (!req.user) {
        return res.status(401).send({ error: 'You must log in' })
    }
      next()
    })
    app.post('/api/auth/register', registerUser)
    app.post('/api/auth/login', loginUser)
    app.get('/api/auth/:id', getUser)
    app.post('/api/auth/change-avatar', authMiddleware, changeAvatar)
    app.patch('/api/auth/edit-user', authMiddleware, editUser)
}