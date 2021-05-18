let stompClient = null;
let userName;

function connect(name) {
    let socket = new SockJS('/ws');
    userName = name;

    document.querySelector('.header__info').innerHTML = `You logged as ${userName}`;

    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/chat',
            function (sendMessage) {
                const messageObj = JSON.parse(sendMessage.body);
<<<<<<< HEAD
                showMessage(userName, messageObj.text);
        });
        stompClient.send("/chat/dialogue", {}, JSON.stringify({'from': userName, 'text': 'connected to server'}));
=======
                showMessage(name, messageObj.text);
            });
        stompClient.send("/chat/dialogue", {}, JSON.stringify({'from': name, 'text': 'connected to server'}));
>>>>>>> 85da268b5c24f8d24aa940e121dd76b6f628297b
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
    $("#disconnect").click(function () {
        disconnect();
    });
    $("#send").click(function () {
        sendMessage();
    });
});

function form() {
    const regForm = document.querySelector('.registration__form');
    const regButton = document.querySelector('.registration__button');
    const authForm = document.querySelector('.registration__authorization-form');
    const authButton = document.querySelector('.registration__authorization-button');

    regButton.addEventListener('click', (event) => {
        event.preventDefault();
        const regFormData = JSON.stringify(Object.fromEntries((new FormData(regForm)).entries()));

        $.ajax({
            // url: "http://localhost:8080/chatik/signup",
            url: "https://chatdimonanton.herokuapp.com/chatik/signup",
            type: "POST",
            data: regFormData,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: (data) => {
                if (data) {
                    console.log(data);
                    document.querySelector('.registration').classList.add('hide');
                    document.querySelector('.main-chat').classList.remove('hide');
                    connect(document.querySelector('.registration__registration-input').value);
                    document.querySelector('.registration__registration-alert').innerHTML = '';
                    document.querySelector('.registration__authorization-alert').innerHTML = '';
                } else {
                    document.querySelector('.registration__registration-alert').innerHTML = "user with this email is already exist";
                }
            }
        });
    });
    authButton.addEventListener('click', (event) => {
        event.preventDefault();
        const authFormData = JSON.stringify(Object.fromEntries((new FormData(authForm)).entries()));

        $.ajax({
            // url: "http://localhost:8080/chatik/verification",
            url: "https://chatdimonanton.herokuapp.com/chatik/verification",
            type: "POST",
            data: authFormData,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: (data) => {
                console.log(data);
<<<<<<< HEAD

=======
>>>>>>> 85da268b5c24f8d24aa940e121dd76b6f628297b
                if (data === 1) {
                    $.ajax({
                        // url: "http://localhost:8080/chatik/signin",
                        url: "https://chatdimonanton.herokuapp.com/chatik/signin",
                        type: "POST",
                        data: authFormData,
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        success: (data) => {
                            console.log(data);
                            document.querySelector('.registration').classList.add('hide');
                            document.querySelector('.main-chat').classList.remove('hide');
                            connect(data.userName);
                            document.querySelector('.registration__registration-alert').innerHTML = '';
                            document.querySelector('.registration__authorization-alert').innerHTML = '';
                        }
                    });
                } else {
                    document.querySelector('.registration__authorization-alert').innerHTML = 'wrong password/email';
                }
            }
        })
    });
}

form();