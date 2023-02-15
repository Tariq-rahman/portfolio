// Define variables for the game
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

// Get elements from the HTML
const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const restartButton = document.querySelector('.restart');

// Add event listeners to the cells and the restart button
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartButtonClick);

// Handle a cell click event
function handleCellClick(event) {
    const cellIndex = parseInt(event.target.getAttribute('data-col'));
    console.log(cellIndex)
    console.log(gameOver);
    if (board[cellIndex] === '' && !gameOver) {
        board[cellIndex] = currentPlayer;
        event.target.innerText = currentPlayer;
        if (!checkForWin() && !checkForDraw()) {
            switchPlayers();
        }
    }
}

// Handle a restart button click event
function handleRestartButtonClick() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    cells.forEach(function (cell) {
        cell.innerText = '';
        cell.classList.remove("win")
    } );
    message.innerText = 'Player X\'s turn';
}

// Check if a player has won the game
function checkForWin() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
            gameOver = true;
            message.innerText = `Player ${currentPlayer} wins!`;

            // highlight the winning combination on the board
            document.querySelector('[data-col="' + a +'"]').classList.add("win")
            document.querySelector('[data-col="' + b +'"]').classList.add("win")
            document.querySelector('[data-col="' + c +'"]').classList.add("win")

            return true
        }
    }

    return false
}

// Check if the game is a draw
function checkForDraw() {
    if (!board.includes('') && !gameOver) {
        gameOver = true;
        message.innerText = 'It\'s a draw!';

        return true
    }

    return false
}

// Switch the current player
function switchPlayers() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.innerText = `Player ${currentPlayer}'s turn`;
}
