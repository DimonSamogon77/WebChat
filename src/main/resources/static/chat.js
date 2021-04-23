var stompClient = null;

function connect() {
    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/chat',
            function (sendMessage) {
                const messageObj = JSON.parse(sendMessage.body);
                showMessage(messageObj.from, messageObj.text);
        });
    });
    stompClient.send("/chat/dialogue", {}, JSON.stringify({'from': $("#name").val(), 'text': 'connected to server'}));
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}

function sendMessage() {
    stompClient.send("/chat/dialogue", {}, JSON.stringify({'from': $("#name").val(), 'text': $("#message").val()}));
}

function showMessage(sender, text) {
    $(".dialog__content").append(`<p class="dialog__message">${sender}: ${text}</p>`);
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { 
        connect();
    });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendMessage(); });
});