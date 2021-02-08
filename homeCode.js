//const
const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

//Wolrd
let width = canvas.width;
let height = canvas.height;
let game = false;
let time = 6;
let scale = 28;

//Snake 
let snakeHeadX = 0;
let snakeHeadY = 0;
let snakeP = 0;
let snakePX = [];
let snakePY = [];
let direction = 'null';

//Apple 
let appleX = Math.floor(Math.random() * scale);
let appleY = Math.floor(Math.random() * scale);

//function 
function update() {
    clear();
    snakeUpdate();
    collision();
    eatApple();
    snakeParts();
    drawApple();
    drawSnake();
    gameOver();

    if (game == true) {  
        setTimeout(update, 1000 / time);
    }
};

function clear() {
    c.fillStyle = 'black';
    c.fillRect(0, 0, width, height);

    document.getElementById("score").innerHTML = 'score: ' + snakeP;
};

function snakeUpdate() {
    if (direction == 'u') {
        snakeHeadY -= scale;
    }
    if (direction == 'b') {
        snakeHeadY += scale;
    }
    if (direction == 'l') {
        snakeHeadX -= scale;
    }
    if (direction == 'r') {
        snakeHeadX += scale;
    }
};

function drawSnake() {
    c.fillStyle = 'green';
    c.fillRect(snakeHeadX, snakeHeadY, scale, scale);

    snakePX.push(snakeHeadX);
    snakePY.push(snakeHeadY);

    for (i = 0; i < snakeP; i++) {
        c.fillStyle = 'rgba(0, 128, 0, 0.8)';
        c.fillRect(snakePX[i], snakePY[i], scale, scale);
    }
};

function drawApple() {
    c.fillStyle = 'red';
    c.fillRect(appleX * scale, appleY * scale, scale, scale);
};

function eatApple() {
    if (snakeHeadX == (appleX * scale) && snakeHeadY == (appleY * scale)) {
        snakeP += 1;
        
        appleX = Math.floor(Math.random() * scale);
        appleY = Math.floor(Math.random() * scale); 
    }
};

function snakeParts() {
    if (snakeP < snakePX.length) {
        snakePX.shift();
        snakePY.shift();
    };
};

function collision() {
    if (snakeHeadX == 0 - scale) {
        snakeHeadX = width - scale;
    };
    if (snakeHeadY == 0 - scale) {
        snakeHeadY = height - scale;
    };
    if (snakeHeadX == width) {
        snakeHeadX = 0;
    };
    if (snakeHeadY == height) {
        snakeHeadY = 0;
    };

    for (i = 0; i < snakeP; i++) {
        if (snakeHeadX == snakePX[i] && snakeHeadY == snakePY[i]) {
            game = false;
        };
    };
};

function gameOver() {
    if (game == false) {
        document.getElementById("score").style.display = 'none';
        document.getElementById("canvas").style.display = 'none';
        document.getElementById("startGame").style.display = 'flex';
        eatApple();
        snakeP = 0;
        snakeHeadX = 0;
        snakeHeadY = 0;
        snakePX = [];
        snakePY = [];
        direction = 'null';
    }
}

function display() {
    game = true;
    document.getElementById("score").style.display = 'flex';
    document.getElementById("canvas").style.display = 'flex';
    document.getElementById("startGame").style.display = 'none';
    update();
}

//Event
window.addEventListener('keydown', key);

function key(e) {
    //up
    if (e.keyCode == 87) {
        if (direction != 'b') {
            direction = 'u';
        };
    };
    //bottom
    if (e.keyCode == 83) {
        if (direction != 'u') {
            direction = 'b';
        };
    };
    //left
    if (e.keyCode == 65) {
        if (direction != 'r') {
            direction = 'l';
        };
    };
    //right
    if (e.keyCode == 68) {
        if (direction != 'l') {
            direction = 'r';
        };
    };
};

update();

