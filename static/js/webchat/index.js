var socket
var chatBody

function stripHTML(dirtyString) {
  var container = document.createElement('div');
  var text = document.createTextNode(dirtyString);
  container.appendChild(text);
  return container.innerHTML; // innerHTML will be a xss safe string
}


$( document ).ready(function() {

    chatBody = $('#chatBody')
    socket = new WebSocket("ws://" + window.location.host + "/webchat/");
    socket.onmessage = function(e) {

        console.log(e.data)
        var data = JSON.parse(e.data);
        chatBody.append("["+data['username']+"] " + stripHTML(data['message'])+ '<br>')


    }
    socket.onopen = function() {
        console.log('Socket opened!')

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

        var data = { }
        data['message'] = message
        data['username'] = userName

        var content = JSON.stringify(data)
        //console.log(content)

        socket.send(content)

}

