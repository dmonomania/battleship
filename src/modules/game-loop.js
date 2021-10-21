const PubSub = require('pubsub-js');
const gameBoard = require('./game-board');
const playerFactory = require('./player');

const allShipVariations = [
  { name: 'Aircraft-Carier', length: 5 },
  { name: 'Battleship', length: 4 },
  { name: 'Submarine', length: 3 },
  { name: 'Cruiser', length: 3 },
  { name: 'Destoyer', length: 2 },
];

const userPlayer = playerFactory.computerPlayer();
const computerPlayer = playerFactory.computerPlayer();
const userGameBoard = gameBoard.computerGameBoard();
const computerGameBoard = gameBoard.computerGameBoard();

let whosTurnIsIt = 'player1';

function startGame() {
  // set names
  computerGameBoard.name = 'computer';
  computerPlayer.name = 'computer';
  userPlayer.name = 'user';
  userGameBoard.name = 'user';

  /// set player turn (random);
  /// build DOM stuff
  allShipVariations.forEach((ship) => {
    computerGameBoard.placeComputerShips(ship.name, ship.length);
    userGameBoard.placeComputerShips(ship.name, ship.length);
  });

  computerGameBoard.receiveAttack('A1');
}

function turnSequence() {
  // check turn
  // attack
  // check if any ships left
  // update turn
}

const attack = () => {};

function handleReceivedAttack(topic, data) {
  console.log(data);
  if (data.didItHit === true && data.areThereStillShips === false) {
    alert(`${data.gameBoardName} has lost all their ships`);
  } else {
    sendAttack(data.gameBoardName);
  }

  function sendAttack(name) {
    if (name === userGameBoard.name) {
      //userPlayer.attack(userGameBoard.name);
    } else {
      computerPlayer.attack(computerGameBoard.name);
    }
  }
}

function handleSendAttack(topic, data) {
  if (data.name === userGameBoard.name) {
    computerGameBoard.receiveAttack(data.attackGridLocation);
  } else {
    userGameBoard.receiveAttack(data.attackGridLocation);
  }
}

PubSub.subscribe('received-attack', handleReceivedAttack);
PubSub.subscribe('send-attack', handleSendAttack);
module.exports = startGame;
