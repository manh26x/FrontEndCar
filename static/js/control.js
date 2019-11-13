'use strict';


var controls = {
    'ahead' : document.querySelector("#ahead"),
    'down'  : document.querySelector("#down"),
    'left'  : document.querySelector("#left"),
    'right' : document.querySelector("#right")
};

var stompClient = null;
var username = null;

function connect() {
    username = document.querySelector("#username");

    var socket = new SockJS("/ws");
    stompClient = Stomp.over(socket);

    stompClient.connect({}, onConnected, onError);
}

connect();

function onConnected() {
    // Subscribe to the Topic Room
    stompClient.subscribe(window.location.pathname, onMessageReceived);
    // Tell your username to the server
    console.log(stompClient.body + " user");
    stompClient.send("/app/chat.addUser", {})
}

function onError() {
    console.log("Error");
}

function onMessageReceived(Payload) {

}


$(document).keyup(function (e) {
    console.log("ws " + stompClient.ws._transport.url);
    var message = "";
    $('#ahead').css({
        'transform' : 'translateY(0px)'
    });
    $('#down').css({
        'transform' : 'translateY(0px)'
    });
    $('#left').css({
        'transform' : 'translateX(0px)'
    });
    $('#right').css({
        'transform' : 'translateX(0px)'
    });
    $('#ahead p, #down p, #left p, #right p').css({
        'background-color' : 'rgb(54, 96, 117)'
    });

    switch (e.which) {
        case 87:
        case 38:
        case 104:
            $('#ahead').css({
                'transform' : 'translateY(-20px)'
            });

            $('#ahead p').css({
                'background-color' : 'pink'
            });
            message = "ahead";
            break;

        case 83:
        case 40:
        case 98:
            $('#down').css({
                'transform' : 'translateY(40px)'
            });

            $('#down p').css({
                'background-color' : 'pink'
            });
            message = "down";
            break;

        case 65:
        case 37:
        case 100:
            $('#left').css({
                'transform' : 'translateX(-20px)'
            });
            $('#left p').css({
                'background-color' : 'pink'
            });
            message="left";
            break;
        case 68:
        case 39:
        case 102:
            $('#right').css({
                'transform' : 'translateX(20px)'
            });


            $('#right p').css({
                'background-color' : 'pink'
            });
            message="right";
            break;

    }
    if(message !== "")
    stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(message));
});