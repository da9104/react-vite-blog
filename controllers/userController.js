const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, cb) => {
  process.nextTick(function() {
    cb(null, { id: user.id, name: user.firstName });
  });
 // done(null, user.id);
});

passport.deserializeUser((id, cb) => {
  process.nextTick(function() {
     User.findById(id).then(user => {
      cb(null, user)
     })
  })
})

const registerUser = async (req, res, next) => {
    try {
        const {email, firstName, lastName, password} = req.body
        if (!email || !firstName || !lastName || !password ) {
          return next(new Error('You need to fill the forms', { cause: res.status }))
        }
        const newEmail = email.toLowerCase()
        const emailExits = await User.findOne({email : newEmail})
        if(emailExits) {
            return next(new Error('Email already existed.', { cause: res.status }))
        }
        if((password.trim()).length < 10) {
            return next(new Error('Password should be at least 10 characters', { cause: res.status }))
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const newUser = await new User({firstName, lastName, email: newEmail, password: hashPassword}).save()
        return res.status(201).json(`${newUser.email} new user created.`)
       } catch (err) {
        console.log(err)
        return next(new Error('Try again, can not create a new account.', { cause: res.status }, err))
    }
}

const loginUser = async (req, res, next) => {
    // passport.use(new LocalStrategy(async function verify(email, password, cb) {
    //   try {
    //     const newEmail = req.body.email.toLowerCase()
    //     const user =  User.findOne({ email: newEmail }, function(err, row) {
    //       if (err) { return cb(err); }
    //       if (!row) { return cb(null, false, { message: 'Incorrect email or password.' }); }
       
    //       const comparePassword = bcrypt.compare(password, user.password, function(err) {
    //         if (err) { return cb(err); }
    //         if (!comparePassword) {
    //           return cb(null, false, { message: 'Incorrect email or password.' });
    //         }
    //         const { _id: id, name } = user
    //         const token = jwt.sign({id, name}, process.env.JWT_KEY, {expiresIn: '1d'})
    //         res.status(200).json({token, id, name})
    //         return cb(null, row);
    //       })
    //   })
    //  } catch (err) {
    //     console.log(err)
    //   }
    //   try {
    //     await passport.authenticate('local')(req, res, next);
    //   } catch (err) {
    //     next(err);
    //   }

  try {
    const { email, password } = req.body
    if (!email || !password) {
      return next(new Error('You need to fill the forms', { cause: res.status }))
    }
    const newEmail = email.toLowerCase()
    const user = await User.findOne({email : newEmail})
    if(!user) {
        return next(new Error('Invalid credentials.', { cause: res.status }))
    }
    const comparePassword = await bcrypt.compare(password, user.password)
    if(!comparePassword) {
        return next(new Error('Invalid credentials.', { cause: res.status }))
    }
    const { _id: id, name } = user
    // passport.use(new LocalStrategy(user.authenticate()));

    const token = jwt.sign({id, name}, process.env.JWT_KEY, {expiresIn: '1d'})
    return res.status(200).json({token, id, name})
    // return res.status(200).json('logged in')
  }
  catch (err) {
    console.log(err)
    return next(new Error('Try again, can not log in.', { cause: res.status }, err))
  }
// })) }
 }

module.exports = { registerUser, loginUser }