const unitSize = 10;
const Xmax = 600;
const Ymax = 600;

const UP = "UP";
const DOWN = "DOWN";
const LEFT = "LEFT";
const RIGHT = "RIGHT";


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

var velocity = {
    direction: LEFT,
    x: -unitSize,
    y: 0
}
var gaming = false

// Draw the snake with a green body and black border
function drawSnake(ctx) {
    ctx.fillStyle = '#00FF00'; // green
    ctx.strokeStyle = '#000000'; // black

    // Loop through the body segments and draw them
    for (let i=0; i < snake.body.length; i++) {
        ctx.fillRect(snake.body[i].x, snake.body[i].y, unitSize, unitSize);
        ctx.strokeRect(snake.body[i].x, snake.body[i].y, unitSize, unitSize);
    }
}

// Clear the tail segment of the snake body
function clearTail(ctx, tail) {
    // Clear the tail end after moving. +2 on the unit size to account for the border
    ctx.clearRect(tail.x -1 , tail.y -1 , unitSize + 2, unitSize + 2)
}

// Move the snake with the current velocity
// implements movement by adding a head segment to the body and removing the tail
// returns the tail so that it can be cleared by the canvas
function move() {
    let head = {
        x: 0,
        y: 0
    }

    head.x = snake.body[0].x + velocity.x
    head.y = snake.body[0].y + velocity.y

    snake.body.unshift(head)


    return snake.body.pop()
}

// Changes the direction of the snake, by the use of the arrow keys
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

        velocity.direction = DOWN
        velocity.x = 0
        velocity.y = unitSize
    }

    // Up
    if (direction === UP) {
        if (velocity.direction === DOWN) {
            console.log("can't move")
            return // cannot turn directly backwards
        }

        velocity.direction = UP
        velocity.x = 0
        velocity.y = -unitSize
    }
}

// Start the game
function start() {
    let c = document.getElementById("snake-canvas");
    let ctx = c.getContext("2d");
    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowRight":
                changeDirection(RIGHT)
                console.log("right")
                break;
            case "ArrowLeft":
                changeDirection(LEFT)
                console.log("left")
                break;
            case "ArrowUp":
                changeDirection(UP)
                console.log("up")
                break;
            case "ArrowDown":
                changeDirection(DOWN)
                console.log("down")
                break;
        }
    });
    gaming = true
    drawSnake(ctx)

    // Start running the game. The speed is dictated by the interval timeout. Less is faster game
    setInterval(function () {
        if (gaming) {
            let tail = move(ctx)
            clearTail(ctx, tail)
            drawSnake(ctx)
            checkGameOver()
        }
    }, 100)
}

// Checks if the game is over by comparing the head of the snake to the max coordinates
// If the game is over, the game will end
function checkGameOver() {
    let head = snake.body[0]
    if (head.x <= 0 || head.x >= Xmax || head.y <= 0 || head.y >= Ymax) {
        gaming = false
        alert("gameover")
    }
}