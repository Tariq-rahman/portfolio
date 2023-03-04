
function generateRandomPosition(config) {
    let pos = {
        x: 0,
        y: 0,
    }

    pos.x = Math.floor(Math.random() * (config.maxX -  config.minX)) +  config.minX // generates a random number between 600 ~ 1200
    pos.y = Math.floor(Math.random() * (config.maxY -  config.minY)) +  config.minY // rand num between min y and max y

    return pos;
}

function checkOverlap(newObject, gameObjects) {
    for (let i = 0; i < gameObjects.length; i++) {

        if (gameObjects[i].isCollided(newObject)) {
            return true;
        }
    }

    return false;
}

function randomisePosition(config, newObject, gameObjects) {
    let pos = generateRandomPosition(config);
    for (let i = 0; i < 10; i++) {
        if (!checkOverlap(newObject, gameObjects)) {
            break;
        }

        pos = generateRandomPosition()
    }

    return pos;
}

export {generateRandomPosition, randomisePosition, checkOverlap};