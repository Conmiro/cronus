

$( document ).ready(function() {
    console.log("ready");


    // Note that the path doesn't matter right now; any WebSocket
    // connection gets bumped over to WebSocket consumers
    var socket = new WebSocket("ws://" + window.location.host + "/chat/");
    socket.onmessage = function(e) {

        console.log(e.data);

    }
    socket.onopen = function() {
        socket.send("hello world");
    }

    // Call onopen directly if socket is already open
    if (socket.readyState == WebSocket.OPEN) socket.onopen();

})

