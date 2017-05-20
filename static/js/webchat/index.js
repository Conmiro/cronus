var socket
var chatBody

$( document ).ready(function() {

    chatBody = $('#chatBody')
    socket = new WebSocket("ws://" + window.location.host + "/chat/");
    socket.onmessage = function(e) {

        chatBody.append(e.data + " <br> ")
        console.log(e.data);

    }
    socket.onopen = function() {
        socket.send("[Server] Someone has joined.");
    }

    // Call onopen directly if socket is already open
    if (socket.readyState == WebSocket.OPEN) socket.onopen();


    $('#submitButton').click(sendMessage)

    $(document).keypress(function(e) {
    if(e.which == 13) {
        sendMessage()
    }
});



});




function sendMessage() {
        var userName = $('#usernameInput').val()
        var message = $('#messageInput').val()
        $('#messageInput').val('')

        var content = "["+userName+"] " + message
        socket.send(content)

}

