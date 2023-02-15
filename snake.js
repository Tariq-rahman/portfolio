const unitSize = 10;
const Xmax = 600;
const Ymax = 600;
var c = document.getElementById("snake-canvas");
var ctx = c.getContext("2d");
var snake = {
    body: [
        {
            x: 300,
            y: 300,
        },
        {
            x: 310,
            y: 300
        },
        {
            x:320,
            y:300
        }
    ]
}
const UP = "UP";
const DOWN = "DOWN";
const LEFT = "LEFT";
const RIGHT = "RIGHT";
var velocity = {
    direction: LEFT,
    x: unitSize,
    y: 0
}

drawSnake(snake)


function drawSnake() {
    ctx.fillStyle = '#00FF00';
    ctx.strokeStyle = '#000000';
  for (let i=0; i < snake.body.length; i++) {
      ctx.fillRect(snake.body[i].x, snake.body[i].y, unitSize, unitSize);
      ctx.strokeRect(snake.body[i].x, snake.body[i].y, unitSize, unitSize);
  }
}

function move() {
    let head = snake.body[0]
    head.x = head.x + velocity.x
    head.y = head.y + velocity.y

    snake.body.unshift(head)
    snake.body.pop()
    drawSnake()
    if (head.x <= 0 || head.x >= Xmax || head.y <= 0 || head.y >= Ymax) {
        gameOver()
    }

}

function changeDirection(direction) {
    // If we're already moving in the direction do nothing
    if (direction === velocity.direction) {
       return
    }

    // Left
    if (direction === LEFT) {
        if (velocity.direction === RIGHT) {
            console.log("can't move")
            return // cannot turn directly backwards
        }

        velocity.direction = LEFT
        velocity.x = -unitSize
        velocity.y = 0
    }

    // Right
    if (direction === RIGHT) {
        if (velocity.direction === LEFT) {
            console.log("can't move")
            return // cannot turn directly backwards
        }

        velocity.direction = RIGHT
        velocity.x = unitSize
        velocity.y = 0
    }

    // Down
    if (direction === DOWN) {
        if (velocity.direction === UP) {
            console.log("can't move")
            return // cannot turn directly backwards
        }

        velocity.direction = UP
        velocity.x = 0
        velocity.y = -unitSize
    }

    // Up
    if (direction === UP) {
        if (velocity.direction === DOWN) {
            console.log("can't move")
            return // cannot turn directly backwards
        }

        velocity.direction = DOWN
        velocity.x = 0
        velocity.y = unitSize
    }
}

function start() {

}

function gameOver() {
    console.log("gameover")
}
