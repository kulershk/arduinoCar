var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// var motor = require("motor-l298n");
var keysPressed = [];

var DRIVE = "LEFT";
var STEAR = "RIGH";

// var l298n = motor.setup(in1Pin, in2Pin, enable1Pin, in3Pin, in4Pin, enable2Pin);
// l298n.setSpeed(DRIVE, 40);
// l298n.setSpeed(STEAR, 40);

http.listen(3000, function() {
    console.log('listening on *:3000');
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log('a user connected!');

    socket.on('key_pressed', function(key) {
        console.log('key pressed: '+key);
        keysPressed.push(key);
        console.log(keysPressed);
        if(key === "STOP"){
            keysPressed = keysPressed.filter((elem)=>{
                return elem === key;
            });
        }
        //check
        if(keysPressed.includes("W")){
            // l298n.forward("LEFT");
        }


    });

    socket.on('key_released', function(key) {
        console.log('key released: '+key);
        keysPressed = keysPressed.filter((elem)=>{
            return elem !== key;
        });
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});