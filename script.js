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
                gameBoard.gameBoardArray[clickedTile.dataset.index] = gameController.player1.symbol;
                clickedTile.innerHTML = gameController.player1.symbol;
                gameController.player1Turn = false;
            }else{
                gameBoard.gameBoardArray[clickedTile.dataset.index] = gameController.player2.symbol;
                clickedTile.innerHTML = gameController.player2.symbol;
                gameController.player1Turn = true;
            }
        }
    }

    return {
        gameBoardArray,
        initialize,
        placeSymbol
    }
})();

const player = (symbol, name) => {

    return {symbol, name};
}

const gameController = (() => {
    var player1Turn = true;
    gameBoard.initialize();

    const player1 = player('X', 'Player 1');
    const player2 = player('O', 'Player 2');

    return{
        player1Turn,
        player1,
        player2
    }
})();


