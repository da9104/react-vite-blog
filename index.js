const express = require('express')
const app = express()
const dotenv = require('dotenv')
// const session = require('express-session')
// const passport = require('passport')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const bodyParser = require('body-parser') 
const cors = require("cors");
const upload = require('express-fileupload')
require('./models/User')
require('./models/Post')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')

dotenv.config()
app.use(cors({ methods:["GET","POST","PUT","DELETE","PATCH"], credentials: true, origin: process.env.FRONTEND_URL}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(upload())
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./router/auth')(app)
const postRoutes = require('./router/post')
app.use('/api/posts', postRoutes)
app.use(notFound)
app.use(errorHandler)

const server = require('http').createServer(app)
const {Server} = require("socket.io");
// const { createIOServer } = require("./io");
// createIOServer(server);

const io = new Server(server,{
  cors:{
      origin: process.env.FRONTEND_URL
  }
})


io.on("connection",(socket)=>{
  console.log(`User Connected ${socket.id}`)
// Lets create a send_message event that listens to the client whenever the 
// connected user calls the 'send_message' event allong with the data that
// contains the message data
  socket.on('send_message',(data)=>{
      socket.broadcast.emit('recive_message',data)
  })
})

server.listen(process.env.PORT || 5001, () => {
  console.log("the server is running on port 5002")
  mongoose.connect(process.env.DB_CONNECT_STRING).then(console.log('db connected')).catch(err => console.log(err))
  // mongoose.connect(process.env.DB_CONNECT_STRING).then(app.listen(process.env.PORT || 5001, () => {
//   console.log('server runs on', process.env.PORT || 5001)
// })).catch(error => {console.log(error)})
})

module.exports = server