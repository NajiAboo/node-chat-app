 const express = require('express');
 const http = require('http');
 const path = require('path');
 const socketIO = require('socket.io');
 const  {generateMessage} = require('./utils/message');


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

    socket.on('createMessage', (crMessage) => {
        console.log('create message');
        console.log(crMessage);

        io.emit('newMessage', generateMessage( crMessage.from, crMessage.text));

        // socket.broadcast.emit('newMessage',{
        //     from: crMessage.from,
        //     text: crMessage.text,
        //     createdAt: new Date().getTime()
        // });
    }); // create message ends here

    

  });

  app.use(express.static(publicPath));


 server.listen(port,() => {
   console.log( `server started on ${port}`);
 });
 