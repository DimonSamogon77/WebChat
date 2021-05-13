let stompClient = null;
let userName;

function connect(inputSelector) {
    let socket = new SockJS('/ws');
    userName = document.querySelector(inputSelector);

    document.querySelector('.header__info').innerHTML = `You logged as ${userName}`; 

    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/chat',
            function (sendMessage) {
                const messageObj = JSON.parse(sendMessage.body);
                showMessage(messageObj.from, messageObj.text);
        });
        stompClient.send("/chat/dialogue", {}, JSON.stringify({'from': userName, 'text': 'connected to server'}));
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
    document.querySelector('.registration').classList.remove('hide');
    document.querySelector('.main-chat').classList.add('hide');
}

function sendMessage() {
    stompClient.send("/chat/dialogue", {}, JSON.stringify({'from': userName, 'text': $("#message").val()}));
    document.querySelector('#message').value = '';
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
    const regForm = document.querySelector('.registration__form');
    const regButton = document.querySelector('.registration__button');
    const authForm = document.querySelector('.registration__authorization-form');
    const regButton = document.querySelector('.registration__authorization-button');

    regButton.addEventListener('click', (event) => {
        event.preventDefault();
        const regFormData = JSON.stringify(Object.fromEntries((new FormData(regForm)).entries()));

        $.ajax({
            url: "http://localhost:8080/chatik/signup",
            //url: "https://chatdimonanton.herokuapp.com/chatik/login",
            type: "POST",
            data: regFormData,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: (data) => {
                console.log(data);
                document.querySelector('.registration').classList.add('hide');
                document.querySelector('.main-chat').classList.remove('hide');
                connect('.registration__registration-input');
            }
        });
    });
    authButton.addEventListener('click', (event) => {
        event.preventDefault();
        const authFormData = JSON.stringify(Object.fromEntries((new FormData(authForm)).entries()));

        $.ajax({
            url: "http://localhost:8080/chatik/signin",
            //url: "https://chatdimonanton.herokuapp.com/chatik/login",
            type: "POST",
            data: authFormData,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: (data) => {
                console.log(data);
                document.querySelector('.registration').classList.add('hide');
                document.querySelector('.main-chat').classList.remove('hide');
                connect('.registration__authorization-input');
            }
        });
    });
}

form();