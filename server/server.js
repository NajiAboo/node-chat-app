 const express = require('express');
 const http = require('http');
 const path = require('path');
 const socketIO = require('socket.io');
 const  {generateMessage,generateLocationMessage} = require('./utils/message');


 const publicPath = path.join(__dirname, '../public');
 const port = process.env.PORT || 3000;

  var app = express();
  var server = http.createServer(app);
  var io =  socketIO(server);

  console.log(publicPath);

  io.on('connection',(socket) =>{
    console.log('user connected');
     
    socket.emit('newMessage', generateMessage('admin','welcome to chat app')); //welcomeMsg ends here

    socket.broadcast.emit('newMessage',generateMessage('admin','ew user joined'));

    socket.on('disconnect',() =>{
        console.log('user disconnected')        ;
    });

    socket.on('createMessage', (crMessage, callback) => {
        console.log('create message');
        console.log(crMessage);

        io.emit('newMessage', generateMessage( crMessage.from, crMessage.text));
         callback('received the message');
    }); // create message ends here
    
    socket.on('createLocationMessage', (coords) =>{
        io.emit('locationMessage', 
                generateLocationMessage('Admin',coords.latitude,coords.longitude));
    });

  });

  app.use(express.static(publicPath));


 server.listen(port,() => {
   console.log( `server started on ${port}`);
 });
 