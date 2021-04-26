let stompClient = null;

function connect() {
    let socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/chat',
            function (sendMessage) {
                const messageObj = JSON.parse(sendMessage.body);
                showMessage(messageObj.from, messageObj.text);
        });
        stompClient.send("/chat/dialogue", {}, JSON.stringify({'from': $("#name").val(), 'text': 'connected to server'}));
    });
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

function form() {
    const form = document.querySelector('.registration__form');
    const formButton = document.querySelector('.registration__button');
    console.log(formButton)

    formButton.addEventListener('click', (event) => {
        event.preventDefault();
        formData = JSON.stringify(Object.fromEntries((new FormData(form)).entries()));
        console.log(formData)
        $.ajax({
            url: "http://localhost:8080/chatik/login",
            type: "POST",
            data: formData,
            contentType: "json",
            success: () => {
                $('.registration').classList.add('hide');
                $('.connect').classList.remove('hide');
            }
        })
    });
}

form();