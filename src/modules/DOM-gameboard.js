const PubSub = require('pubsub-js');
const gameBoardLogic = require('./game-board-logic');

const computerGameBoard = document.querySelector('#computer-game-board');
const playerGameBoard = document.querySelector('#player-game-board');

const possibleTargets = (() => {
  const yAxis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const finalArray = [];
  yAxis.forEach((letter) => {
    for (let i = 1; i <= 10; i += 1) {
      finalArray.push(letter.concat(i));
    }
  });
  return finalArray;
})();

function createGrid(user, gameboard, array) {
  array.forEach((gridReference) => {
    const div = document.createElement('div');
    div.className = `${gridReference} ${user} gridsquare inactive`;
    div.dataset.grid = gridReference;
    gameboard.appendChild(div);
  });
}

const messageFromCheck = (messageFrom) => {
  if (messageFrom === 'computer') {
    return document.querySelectorAll('.computer');
  }
  return document.querySelectorAll('.user');
};

function handleNewShip(topic, data) {
  // console.log(data[0]);
  const messageFrom = data[0];
  const messageArray = data[1];
  const shipName = data[2];
  shipName.replace((/ /g, ''));

  const gridArray = messageFromCheck(messageFrom);

  gridArray.forEach((grid) => {
    const gridCheck = messageArray.some((testGridRef) => grid.dataset.grid === testGridRef);

    if (gridCheck === true) {
      grid.classList.remove('inactive');
      grid.classList.add('active');
      grid.classList.add(shipName);
    }
  });
}

function handleReceivedAttackDOM(topic, data) {
  const gridArray = messageFromCheck(data.gameBoardName);
  gridArray.forEach((grid) => {
    const gridCheck = grid.dataset.grid === data.gridLocation;

    if (gridCheck === true && data.didItHit === false) {
      grid.classList.add('miss');
    } else if (gridCheck === true && data.didItHit === true) {
      grid.classList.add('hit');
    }
  });
}

function handleAttackClick(event) {
  const attackGridLocation = event.path[0].dataset.grid;
  PubSub.publish('send-attack', { name: 'user', attackGridLocation });
}

function addShips() {}

function computerBoardEventManager(enableDisable) {
  const gridContainer = document.getElementById('computer-game-board');
  if (enableDisable) {
    return gridContainer.addEventListener('click', handleAttackClick);
  }
  return gridContainer.removeEventListener('click', handleAttackClick);
}

function playerBoardEventManager(enableDisable) {
  const gridContainer = document.getElementById('player-game-board');
  if (enableDisable) {
    return gridContainer.addEventListener('click', addShips);
  }
  return gridContainer.removeEventListener('click', addShips);
}

function mouseOut(e, ship) {
  const { target } = e;
  const validPlacementArray = gameBoardLogic.validPlacementArray(5, 'xAxis');

  if (target.id !== 'player-game-board') {
    target.classList.remove('black');
  }

  console.log(target);
}

function mouseOver(e, ship) {
  const { target } = e;

  if (target.id !== 'player-game-board') {
    target.classList.add('black');
  }
}

function addShipsMouseOverEvents(enableDisable, currentShip) {
  const gridContainer = document.getElementById('player-game-board');
  gridContainer.addEventListener('mouseover', function doSomething(e) {
    mouseOver(e, currentShip);
  });

  gridContainer.addEventListener('mouseout', function dosomething(e) {
    mouseOut(e, currentShip);
  });
}

PubSub.subscribe('new-ship', handleNewShip);
PubSub.subscribe('received-attack', handleReceivedAttackDOM);

const createComputerBoard = () => createGrid('computer', computerGameBoard, possibleTargets);
const createPlayerBoard = () => createGrid('user', playerGameBoard, possibleTargets);

addShipsMouseOverEvents();

export {
  createComputerBoard,
  createPlayerBoard,
  playerBoardEventManager,
  computerBoardEventManager,
};
