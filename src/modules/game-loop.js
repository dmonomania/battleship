const PubSub = require('pubsub-js');
const gameBoard = require('./game-board');
const playerFactory = require('./player');

const allShipVariations = [
  { name: 'Aircraft Carier', length: 5 },
  { name: 'Battleship', length: 4 },
  { name: 'Submarine', length: 3 },
  { name: 'Cruiser', length: 3 },
  { name: 'Destoyer', length: 2 },
];

const userPlayer = playerFactory.player();
const computerPlayer = playerFactory.computerPlayer();
const userGameBoard = gameBoard.baseGameBoard();
const computerGameBoard = gameBoard.computerGameBoard();

let whosTurnIsIt = 'player1';

function startgame() {
  /// set player turn (random);
  /// build DOM stuff
}
allShipVariations.forEach((ship) => {
  computerGameBoard.placeComputerShips(ship.name, ship.length);
});

console.log(computerGameBoard);
