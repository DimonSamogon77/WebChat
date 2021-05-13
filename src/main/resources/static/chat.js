let stompClient = null;

function connect() {
    let socket = new SockJS('/ws');

    document.querySelector('.connect__info').innerHTML = `You logged as ${document.querySelector('#name').value}`; 

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
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendMessage(); });
});

function form() {
    const form = document.querySelector('.registration__form');
    const formButton = document.querySelector('.registration__button');

    formButton.addEventListener('click', (event) => {
        event.preventDefault();
        const formData = JSON.stringify(Object.fromEntries((new FormData(form)).entries()));

        $.ajax({
            //url: "http://localhost:8080/chatik/login",
            url: "https://chatdimonanton.herokuapp.com/chatik/login",
            type: "POST",
            data: formData,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: (data) => {
                console.log(data);
                document.querySelector('.registration').classList.add('hide');
                document.querySelector('.main-chat').classList.remove('hide');
                connect();
            }
        });


    });
}

form();