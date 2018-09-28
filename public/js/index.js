var socket = io();

socket.on('connect', function()  {
    console.log('connected to server');
});

socket.on('disconnect',function() {
    console.log('disconnected from server');
});

socket.on('newMessage', function (newMsg) {
    
    var formattedTime = moment(newMsg.createdAt).format('h:mm a');
    var template = $("#message-template").html();
    var html = Mustache.render(template,{
        text : newMsg.text,
        from : newMsg.from,
        createdAt: formattedTime
    });
    
    // var formattedTime = moment(newMsg.createdAt).format('h:mm a');
    // var li = $("<li></li>");
    // li.text(`${newMsg.from} ${formattedTime}: ${newMsg.text}`);
    // $("ol").append(li);

    $("ol").append(html);
});

socket.on('welcomeMsg', function(msg) {
    console.log(msg);
});

socket.on('newJoinee',function(msg) {
    console.log(msg);
});

socket.on('locationMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');

    var template = $("#location-message-template").html();
    var html = Mustache.render(template,{
        url : message.url,
        from : message.from,
        createdAt: formattedTime
    });

    // var li = $("<li></li>");
    // var a = $('<a target="_blank">My current location</a>');
    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);
    // $("ol").append(li);
    $("ol").append(html);
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();
    
    var messageTextBox = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    },function(){
        messageTextBox.val('');
    });
});


 var locationButton = $("#send-location");

 locationButton.on('click', function(){
     if(!navigator.geolocation) 
     {
         return alert('your browser is not supported');
     }

     locationButton.attr('disabled', 'disaled').text('Sending Location ...')

     var location = navigator.geolocation.getCurrentPosition(function(location){
         console.log(location);
         locationButton.removeAttr('disabled').text('Send Location');
         socket.emit('createLocationMessage',{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
         });

     },function(){
        alert('You have to give permission to get the location');
        locationButton.removeAttr('disabled').text('Send Location');;
     });
});