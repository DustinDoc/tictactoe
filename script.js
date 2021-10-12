"use strict";

const gameBoard = (() => {
    const gameBoardArray = new Array(9);

    const resetGameBoard = () => {
        for(let i = 0; i < gameBoardArray.length; i++){
            gameBoardArray[i] = "";
        }
    }

    const placeSymbol = (e) => {
        let clickedTile = e.target;
        if(clickedTile.innerHTML == ""){
            if(gameController.player1Turn == true){
                gameBoard.gameBoardArray[clickedTile.dataset.index] = gameController.getPlayer1Symbol();
                displayController.renderDisplay();
                gameController.changeTurn();
            }else{
                gameBoard.gameBoardArray[clickedTile.dataset.index] = gameController.getPlayer2Symbol();
                displayController.renderDisplay();
                gameController.changeTurn();
            }
        }
    }

    return {
        gameBoardArray,
        placeSymbol,
        resetGameBoard
    }
})();

const player = (name, symbol, score) => {

    return {name, symbol, score};
}

const displayController = (() => {

    const playerNamesMenu = document.getElementById('playerNamesMenu');
    const playerScoreView = document.getElementsByClassName('playerScore');
    const headerButtons = document.getElementsByClassName('headerButton');
    const gameTiles = document.getElementsByClassName('tile');

    const setTilesListener = (e) => {
        gameBoard.placeSymbol(e);
    }

    const initialize = () => {
        for(let tile of gameTiles){
            tile.addEventListener('click', setTilesListener);
        }
    }

    const disableBoard = () => {
        for(let tile of gameTiles){
            tile.removeEventListener('click', setTilesListener);
        }
    } 

    const renderDisplay = () => {
        for(let i = 0; i < gameTiles.length; i++){
            gameTiles[i].textContent = gameBoard.gameBoardArray[i];
        }
    }

    const toggleNameMenuOff = () => {
        playerNamesMenu.style.display = "none";
    }

    const toggleNameMenuOn = () => {
        playerNamesMenu.style.display = "flex";
    }

    const toggleHeaderButtonsOn = () => {
        for(let button of headerButtons){
            button.style.display = "inline";
        }
    }

    const toggleHeaderButtonsOff = () => {
        for(let button of headerButtons){
            button.style.display = "none";
        }
    }

    const toggleScoreViewOn = () => {
        for(let elem of playerScoreView){
               elem.classList.remove('hidden');
            }
    }

    const toggleScoreViewOff = () => {
        for(let elem of playerScoreView){
            elem.classList.add('hidden');
        }
    }

    const setScoreHeader = () => {
        let player1ScoreHeader = document.getElementById('player1ScoreHeader');
        let player2ScoreHeader = document.getElementById('player2ScoreHeader');

        player1ScoreHeader.textContent = gameController.getPlayer1Name();
        player2ScoreHeader.textContent = gameController.getPlayer2Name();
    }

    return{
        initialize,
        disableBoard,
        renderDisplay,
        toggleNameMenuOff,
        toggleNameMenuOn,
        toggleHeaderButtonsOff,
        toggleHeaderButtonsOn,
        toggleScoreViewOff,
        toggleScoreViewOn,
        setScoreHeader
    }
})();

const gameController = (() => {
    var player1Turn = true;
    var player1;
    var player2;

    const getPlayer1Symbol = () => {
        return player1.symbol;
    }

    const getPlayer2Symbol = () => {
        return player2.symbol;
    }

    const getPlayer1Name = () => {
        return player1.name;
    }

    const getPlayer2Name = () => {
        return player2.name;
    }

    const changeTurn = () => {
        gameController.player1Turn *= -1;
    }

    const startNewGame = () => {
        let player1NameField = document.getElementById('player1NameField');
        let player2NameField = document.getElementById('player2NameField');

        if(player1NameField.value == ""){
            player1 = player('Player 1', 'X', '0');
        }else{
            player1 = player(player1NameField.value, 'X', '0');
        }

        if(player2NameField.value == ""){
            player2 = player('Player 2', 'O', '0');
        }else{
            player2 = player(player2NameField.value, 'O', '0');
        }

        displayController.initialize();
        displayController.setScoreHeader();
        displayController.toggleScoreViewOn();
        displayController.toggleNameMenuOff();
        displayController.toggleHeaderButtonsOn();
    }

    const startGameButton = document.getElementById('nameSubmit');
    startGameButton.addEventListener('click', () => {
        startNewGame();
    })

    const resetCurrentGameButton = document.getElementById('reset');
    resetCurrentGameButton.addEventListener('click', () => {
        gameBoard.resetGameBoard();
        displayController.renderDisplay();
    })

    const startNewGameButton = document.getElementById('restart');
    startNewGameButton.addEventListener('click', () => {
        displayController.toggleNameMenuOn();
        displayController.toggleScoreViewOff();
        displayController.toggleHeaderButtonsOff();
        gameBoard.resetGameBoard();
        displayController.disableBoard();
        displayController.renderDisplay();
    })

    return{
        player1Turn,
        changeTurn,
        player1,
        player2,
        getPlayer1Symbol,
        getPlayer2Symbol,
        getPlayer1Name,
        getPlayer2Name
    }
})();


