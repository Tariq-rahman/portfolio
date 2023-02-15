const unitSize = 10;
const Xmax = 600;
const Ymax = 600;
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
    x: -unitSize,
    y: 0
}
var gaming = false


function drawSnake(ctx) {
    ctx.fillStyle = '#00FF00';
    ctx.strokeStyle = '#000000';

  for (let i=0; i < snake.body.length; i++) {
      ctx.fillRect(snake.body[i].x, snake.body[i].y, unitSize, unitSize);
      ctx.strokeRect(snake.body[i].x, snake.body[i].y, unitSize, unitSize);
  }
}

function clearTail(ctx, tail) {
    ctx.clearRect(tail.x -1 , tail.y -1 , unitSize + 2, unitSize + 2)
}

function move(ctx) {
    let head = {
        x: 0,
        y: 0
    }

    head.x = snake.body[0].x + velocity.x
    head.y = snake.body[0].y + velocity.y

    snake.body.unshift(head)
    let tail = snake.body.pop()

    if (head.x <= 0 || head.x >= Xmax || head.y <= 0 || head.y >= Ymax) {
        gameOver()
    }

    return tail
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
        velocity.y = unitSize
    }

    // Up
    if (direction === UP) {
        if (velocity.direction === DOWN) {
            console.log("can't move")
            return // cannot turn directly backwards
        }

        velocity.direction = DOWN
        velocity.x = 0
        velocity.y = -unitSize
    }
}

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
    setInterval(function () {
        if (gaming) {
            let tail = move(ctx)
            clearTail(ctx, tail)
            drawSnake(ctx)
        }
    }, 100)
}

function gameOver() {
    gaming = false
    console.log("gameover")
}
