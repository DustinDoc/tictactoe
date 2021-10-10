"use strict";

const gameBoard = (() => {
    const gameBoardArray = new Array(9);
    let gameTiles = document.getElementsByClassName('tile');

    const initialize = () =>{
        for(let tile of gameTiles){
            tile.addEventListener('click', (e) => {
                placeSymbol(e);
            })
        }
    }

    const placeSymbol = (e) => {
        let clickedTile = e.target;
        if(clickedTile.innerHTML == ""){
            if(gameController.player1Turn == true){
                gameBoard.gameBoardArray[clickedTile.dataset.index] = gameController.getPlayer1Symbol();
                clickedTile.innerHTML = gameController.getPlayer1Symbol();
                gameController.changeTurn();
            }else{
                gameBoard.gameBoardArray[clickedTile.dataset.index] = gameController.getPlayer2Symbol();
                clickedTile.innerHTML = gameController.getPlayer2Symbol();
                gameController.changeTurn();
            }
        }
    }

    return {
        gameBoardArray,
        initialize,
        placeSymbol
    }
})();

const player = (name, symbol, score) => {

    return {name, symbol, score};
}

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

    const changeTurn = () => {
        gameController.player1Turn *= -1;
    }

    const toggleScoreView = () => {
        let playerScoreView = document.getElementsByClassName('playerScore');
        for(let elem of playerScoreView){
            if(elem.classList.contains('hidden')){
               elem.classList.remove('hidden');
            }else{
                elem.classList.add('hidden');
            }
        }
    }

    const startNewGame = () => {
        let player1NameField = document.getElementById('player1NameField');
        let player2NameField = document.getElementById('player2NameField');

        if(player1NameField.textContent == ""){
            player1 = player('Player 1', 'X', '0');
        }else{
            player1 = player(player1NameField.innerText, 'X', '0');
        }

        if(player2NameField.textContent == ""){
            player2 = player('Player 2', 'O', '0');
        }else{
            player2 = player(player2NameField.innerText, 'O', '0');
        }

        let player1ScoreHeader = document.getElementById('player1ScoreHeader');
        let player2ScoreHeader = document.getElementById('player2ScoreHeader');

        player1ScoreHeader.textContent = player1.name;
        player2ScoreHeader.textContent = player2.name;

        gameBoard.initialize();
        toggleScoreView();
    }

    const startGameButton = document.getElementById('nameSubmit');
    startGameButton.addEventListener('click', () => {
        startNewGame();
    })

    return{
        player1Turn,
        changeTurn,
        toggleScoreView,
        player1,
        player2,
        getPlayer1Symbol,
        getPlayer2Symbol
    }
})();


