var socket = io();

socket.on('connect', function()  {
    console.log('connected to server');
});

socket.on('disconnect',function() {
    console.log('disconnected from server');
});

socket.on('newMessage',(newMsg)=>{
    console.log('New Message');
    console.log(newMsg);
});