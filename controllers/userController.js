const fs = require('fs')
const path = require('path')
const { v4: uuid } = require('uuid')
// const passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const User = mongoose.model('users');
const HttpError = require('../models/ErrorModel')


//////
// Task:
// Passport-session implementing
//////

// passport.serializeUser((user, cb) => {
//   process.nextTick(function() {
//     cb(null, { id: user.id, name: user.firstName });
//   });
//  // done(null, user.id);
// });

// passport.deserializeUser((id, cb) => {
//   process.nextTick(function() {
//      User.findById(id).then(user => {
//       cb(null, user)
//      })
//   })
// })

///////
// Register user route
// api/auth/register
//////
const registerUser = async (req, res, next) => {
    try {
        const {email, firstName, lastName, password} = req.body
        if (!email || !firstName || !lastName || !password ) {
          return next(new HttpError('You need to fill the forms', 402))
        }
        const newEmail = email.toLowerCase()
        const emailExits = await User.findOne({email : newEmail})
        if(emailExits) {
            return next(new HttpError('Email already existed.', 422))
        }
        if((password.trim()).length < 10) {
            return next(new HttpError('Password should be at least 10 characters', 422))
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const newUser = await new User({firstName, lastName, email: newEmail, password: hashPassword}).save()
        const token = jwt.sign({ id: newUser.id, firstName }, process.env.JWT_KEY, {expiresIn: '1d'});
        return res.status(201).json({token, id: newUser.id, firstName})
       } catch (err) {
        console.log(err)
        return next(new HttpError('Try again, can not create a new account.', 422, err))
    }
}


///////
// Login user route
// api/auth/login
//////
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
    const user = await User.findOne({ email : newEmail })
    if(!user) {
        return next(new Error('Invalid credentials.', { cause: res.status }))
    }
    const comparePassword = await bcrypt.compare(password, user.password)
    if(!comparePassword) {
        return next(new Error('Invalid credentials.', { cause: res.status }))
    }
    const { _id: id, firstName } = user
    const token = jwt.sign({id}, process.env.JWT_KEY, {expiresIn: '1d'})
    return res.status(200).json({token, id, firstName})
  }
  catch (err) {
    console.log(err)
    return next(new Error('Try again, can not log in.', { cause: res.status }, err))
  }
// })) }
}


///////
// Get user route
// api/auth/:id
////// 
const getUser = async (req, res, next) => {
 try {
  const { id } = req.params
  const user = await User.findById(id).select('-password')
  if(!user) {
    return next(new HttpError('Try again, user not find.', 404))
  }
   res.status(200).json(user)
 } catch (err) {
  return next(new HttpError(err))
 }
}

///////
// Get authors route
// api/auth/
////// 
const getAuthors = async (req, res, next) => {
  try {
    const allUsers = await User.find().select('-password')
    // console.log(req.user)
    res.json(allUsers)
  } catch(err) {
    return next(new HttpError(err))
  }
}

const changeAvatar = async (req, res, next) => {
  try {
    if (!req.files.avatar) {
      return next(new HttpError('Please upload an image file', 402))
    }
   // find user from database
   const user = await User.findById(req.user.id)
   if (user.avatar) {
      fs.unlink(path.join(__dirname, '..', 'uploads', user.avatar), (err) => {
          if(err) {
            return next(new HttpError(err)) 
          }
      })
   }
   const {avatar} = req.files
   if(avatar.size > 10000000) {
      return next(new HttpError('file size has limitted 1000KB', 422))
   }
   let fileName;
   fileName = avatar.name
   let splittedFilename = fileName.split('.')
   let newFilename = splittedFilename[0] + uuid() + '.' + splittedFilename[splittedFilename.length-1]
   avatar.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
    if(err) {
      return next(new HttpError(err))
    }
    const updatedAvatar = await User.findByIdAndUpdate(req.user.id, { avatar: newFilename }, { new: true })
    if(!updatedAvatar) {
      return next(new HttpError('Avatar can not be canged.', 422))
    }
     return res.status(200).json(updatedAvatar)
  })
  } catch (err) {
    return next(new HttpError(err))
  }
}

const editUser = async (req, res, next) => {
  try {  
  const {id} = req.params
  const { email, currentPassword, newPassword, confirmNewPassword } = req.body
  if(!email || !currentPassword || !newPassword || !confirmNewPassword) {
    return next(new HttpError('You need to fill the forms', 422))
  }
  const user = await User.findById(req.user.id)
  if(!user) {
    return next(new HttpError('User not found.', 403))
  }
  const emailExits = await User.findOne({email})
  if (emailExits && (emailExits._id !== req.user.id)) {
    return next(new HttpError('Email already existed. Try a new one', 422))
    //  const newInfo = await User.findByIdAndUpdate(req.user.id, { email : emailExits, password: hash }, { new: true })
    //  } else {
    //    return next(new HttpError('Email already existed.', 422))
  }
  const validateUserPassword = await bcrypt.compare(currentPassword, user.password)
  if (!validateUserPassword) {
    return next(new HttpError('Invalid current password.', 422))
  }
  if (newPassword !== confirmNewPassword) {
    return next(new HttpError('New password do not match.', 422))

  }
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(newPassword, salt)
  const newInfo = await User.findByIdAndUpdate(req.user.id, { email, password: hash }, { new: true })
  return res.status(200).json(newInfo)  
} catch (err) {
  console.log(err)
 }
}


module.exports = { registerUser, loginUser, getUser, getAuthors, changeAvatar, editUser }