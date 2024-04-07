const { registerUser, loginUser } = require('../controllers/userController')
const passport = require('passport')

module.exports = (app) => {
    app.get('/api/auth', (req, res, next) => {
      res.send(req.user)  
      if (!req.user) {
        return res.status(401).send({ error: 'You must log in' })
    }
      next()
    })

    app.post('/api/auth/register', registerUser, function(req, res, next) {
        if (err) {
            return next(err)
        }
        res.redirect('/')
    //     req.login(user, function(err) {
    //         if (err) { return next(err); }
    //         res.redirect('/');
    //    });
    })

    app.post('/api/auth/login', loginUser, passport.authenticate('local', {
        successRedirect: '/api/auth',
        failureRedirect: '/'
      }));

    app.get('/api/auth/logout', (req, res, next) => {
        req.logout(function(err) {
            if (err) { return next(err) }
            res.redirect("/")
          });
    })

}


