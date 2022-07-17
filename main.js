var board;
var playerO = "O";
var playerX = "X";
var currentPlayer = playerO;
var clickO = new Audio('sounds/click/Oclick.mp3');
var clickX = new Audio('sounds/click/Xclick.mp3');
var currentClickAudio = clickO;
var gameOver = false;

window.onload = function() {
    setGame();
}

function setGame() {
    document.getElementById("game-info").innerHTML = currentPlayer + "'s Turn";

    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]

    for (let r = 0; r < 3; r++){
        for (let c = 0; c < 3; c++){
            let tile = document.createElement("div");
            tile.id = r.toString() + '-' + c.toString();
            tile.classList.add("tile");
            tile.classList.add("pointer");
            if (r == 0 || r == 1) {
                tile.classList.add("horizontal-line");
            }
            if (c == 0 || c == 1) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", setTile);
            document.getElementById("board").append(tile);
        }
    }
}

function setTile() {
    if (gameOver) {
        location.reload();
        return;
    }

    let coords = this.id.split("-")
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1])

    if (board[r][c] != ' ') {
        return;
    }

    board[r][c] = currentPlayer;
    currentClickAudio.play();
    this.innerText = currentPlayer;
    this.classList.add("arrow");

    if (currentPlayer == playerO) {
        currentPlayer = playerX;
        currentClickAudio = clickX;
    }

    else {
        currentPlayer = playerO;
        currentClickAudio = clickO;
    }

    checkWinner();
    
    if (!gameOver) {
        checkDraw();
        if (!gameOver) {
            document.getElementById("game-info").innerHTML = currentPlayer + "'s turn";        
        }
    }
}

function checkDraw() {
    let nonemptySpaces = 0;
    board.forEach(row => {
        row.forEach(space => {
            if (space != ' ') {
                nonemptySpaces++
            }
        });
    });
    if (nonemptySpaces == 9) {
        gameOver = true;
        document.getElementById("game-info").innerHTML = "It's a draw";
    }
    
}

function checkWinner() {
    // horizontal
    for (let r = 0; r < 3; r++) {
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' ') {
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(r.toString() + '-' + i.toString())
                tile.classList.add("winner");
            }
            endGame();
            return;
        }
    }

    // vertical
    for (let c = 0; c < 3; c++) {
        if (board[0][c] == board[1][c] && board[1][c] == board[2][c] && board[0][c] != ' ') {
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(i.toString() + '-' + c.toString())
                tile.classList.add("winner")
            }
            endGame();
            return;
        }
    }

    //diagonally
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
        for (let i = 0; i < 3; i++){
            let tile = document.getElementById(i.toString() + '-' + i.toString())
            tile.classList.add("winner")
        }
        endGame();
        return;
    }

    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        let tile = document.getElementById("0-2")
        tile.classList.add("winner")

        tile = document.getElementById("1-1")
        tile.classList.add("winner")

        tile = document.getElementById("2-0")
        tile.classList.add("winner")

        endGame();
        return;
    }
}

function endGame() {
    gameOver = true;
    if (currentPlayer == playerO) {
        currentPlayer = playerX;
    }

    else {
        currentPlayer = playerO;
    }
    document.getElementById("game-info").innerHTML = currentPlayer + " won the game";
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++){
            if (board[r][c] == ' ') {
                tile = document.getElementById(r.toString() + '-' + c.toString());
                tile.classList.add("arrow");
            }
        }
    }
}