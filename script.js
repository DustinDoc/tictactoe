"use strict";

const gameBoard = (() => {
    const gameBoardArray = new Array(9);
    
    const render = () => {
        let gameTiles = document.getElementsByClassName('tile');
        console.log(gameTiles);
        for(let i = 0; i < gameBoardArray.length; i++){
            gameTiles.item(i).innerHTML = gameBoard.gameBoardArray[i];
        }
    }
    return {
        gameBoardArray,
        render
    }
})();

const gameController = (() => {
    gameBoard.gameBoardArray = ['X', 'X', 'O', 'X', 'X', 'O', 'X', 'X', 'O'];
    gameBoard.render(); 
})();

const player = (symbol, name) => {

    return {symbol, name};
}
