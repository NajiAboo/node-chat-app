var socket = io();

socket.on('connect', function()  {
    console.log('connected to server');
});

socket.on('disconnect',function() {
    console.log('disconnected from server');
});

socket.on('newMessage', function (newMsg) {
    var li = $("<li></li>");
    li.text(`${newMsg.from}: ${newMsg.text}`);
    $("ol").append(li);
});

socket.on('welcomeMsg', function(msg) {
    console.log(msg);
});

socket.on('newJoinee',function(msg) {
    console.log(msg);
});

socket.on('locationMessage', function(message){
    var li = $("<li></li>");
    var a = $('<a target="_blank">My current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    $("ol").append(li);
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    },function(){

    });
});


 var locationButton = $("#send-location");

 locationButton.on('click', function(){
     if(!navigator.geolocation) 
     {
         alert('your browser is not supported');
     }

     var location = navigator.geolocation.getCurrentPosition(function(location){
         console.log(location);
         socket.emit('createLocationMessage',{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
         });

     },function(){
        alert('You have to give permission to get the location');
     });
});