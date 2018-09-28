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


$('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    },function(){

    });
});