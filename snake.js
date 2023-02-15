const unitSize = 10;
const Xmax = 600;
const Ymax = 600;

const UP = "UP";
const DOWN = "DOWN";
const LEFT = "LEFT";
const RIGHT = "RIGHT";

var c = document.getElementById("snake-canvas");
var ctx = c.getContext("2d");
var score = 0;
var apple = {
    x: 100,
    y: 100
}

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

// Draws an apple on the canvas
function drawApple(ctx) {
    ctx.fillStyle = '#EE4B2B' // red
    ctx.strokeStyle = '#000000'; // black

    ctx.fillRect(apple.x, apple.y, unitSize, unitSize)
    ctx.strokeRect(apple.x, apple.y, unitSize, unitSize)
}

// Move the snake with the current velocity
// implements movement by adding a head segment to the body and removing the tail
// returns the tail so that it can be cleared by the canvas
function move(ctx) {
    let head = {
        x: 0,
        y: 0
    }

    head.x = snake.body[0].x + velocity.x
    head.y = snake.body[0].y + velocity.y
    snake.body.unshift(head)

    if (isInside(apple, head)){
        score++
        ctx.clearRect(apple.x -1, apple.y -1, unitSize + 2, unitSize + 2)
        newApple()
        drawApple(ctx)
    } else {
        let tail = snake.body.pop()
        ctx.clearRect(tail.x -1 , tail.y -1 , unitSize + 2, unitSize + 2)
    }
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
            return // cannot turn directly backwards
        }

        velocity.direction = LEFT
        velocity.x = -unitSize
        velocity.y = 0
    }

    // Right
    if (direction === RIGHT) {
        if (velocity.direction === LEFT) {
            return // cannot turn directly backwards
        }

        velocity.direction = RIGHT
        velocity.x = unitSize
        velocity.y = 0
    }

    // Down
    if (direction === DOWN) {
        if (velocity.direction === UP) {
            return // cannot turn directly backwards
        }

        velocity.direction = DOWN
        velocity.x = 0
        velocity.y = unitSize
    }

    // Up
    if (direction === UP) {
        if (velocity.direction === DOWN) {
            return // cannot turn directly backwards
        }

        velocity.direction = UP
        velocity.x = 0
        velocity.y = -unitSize
    }
}

// Start the game
function start() {
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
    drawApple(ctx, apple)
    // Start running the game. The speed is dictated by the interval timeout. lower the interval, the faster the snake
    setInterval(function () {
        if (gaming) {
            move(ctx)
            drawSnake(ctx)
            updateScore()
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

// Checks if the given coordinates B is within the given coordinates A
// uses the unitSize to create a rectangle about the coordinate a and checks if b is within it
function isInside(a, b) {
    // x plane collision
    let xPlane = false
    if (
        (a.x >= b.x && a.x <= b.x + unitSize)
        || (a.x + unitSize >= b.x && a.x <= b.x)
    ) {
        xPlane = true
    }

    // y plane collision
    let yPlane = false
    if (
        (a.y >= b.y && a.y <= b.y + unitSize)
        || (a.y + unitSize >= b.y && a.y <= b.y)
    ) {
        yPlane = true
    }

    return xPlane && yPlane;
}

// Creates a new apple in a random location
// Ensures that the apple does not sit on the edges
function newApple() {
    apple.x = Math.floor(Math.random() * (Xmax/unitSize)) * unitSize // generates random number between 0 ~ 600 in increments of 10
    apple.y = Math.floor(Math.random() * (Ymax/unitSize)) * unitSize
}

function updateScore() {
    console.log(score)
}

// Resets the game and the board. todo wierd bug where spamming reset speeds up game??
function reset() {
     score = 0;

     apple = {
        x: 100,
        y: 100
    }

     snake = {
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

     velocity = {
        direction: LEFT,
        x: -unitSize,
        y: 0
    }
     gaming = false

    ctx.clearRect(0, 0, Xmax, Ymax)
}