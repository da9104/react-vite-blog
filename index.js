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
app.use('/', express.static('client/dist'))
app.use(notFound)
app.use(errorHandler)

const server = require('http').createServer(app)
const {Server} = require("socket.io");
const io = new Server(server, {
  cors:{
      origin: process.env.FRONTEND_URL
  }
})

let users = []; 

io.on("connection",(socket)=>{
  console.log(`User Connected ${socket.id}  ${socket.name}`)
  // io.use(fuction(socket, next) {
  // })

  socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

  socket.on('message', (data) => {
    // console.log(data.message);
     io.emit('messageResponse', data);
  });

  socket.on('newUser', (data) => {
    console.log(data.userName)
    io.emit('newUserResponse', users);
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
     //Updates the list of users when a user disconnects from the server
     users = users.filter((user) => user.socketID !== socket.id);
     //Sends the list of users to the client
     io.emit('newUserResponse', users);
     socket.disconnect();
  });

})

if (process.env.NODE_ENV === 'production') {
  // Express serve up production assets
  app.use(express.static('client/dist'))
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })
}

server.listen(process.env.PORT || 5002, () => {
  console.log("the server is running on port 5002")
  mongoose.connect(process.env.DB_CONNECT_STRING).then(console.log('db connected')).catch(err => console.log(err))
})

module.exports = server