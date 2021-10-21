const PubSub = require('pubsub-js');

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
  } else {
    return document.querySelectorAll('.user');
  }
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

function handleClick(event) {
  event.path[0].removeEventListener('click', handleClick);
  // console.log(event);
  const attackGridLocation = event.path[0].dataset.grid;
  PubSub.publish('send-attack', { name: 'user', attackGridLocation });
  // disable click
  // disable hover
  // send attack PubSub
}

function addClickListeners() {
  const gridArray = document.querySelectorAll('.computer');
  gridArray.forEach((grid) => {
    grid.addEventListener('click', handleClick);
  });
}

PubSub.subscribe('new-ship', handleNewShip);
PubSub.subscribe('received-attack', handleReceivedAttackDOM);

const createComputerBoard = () => createGrid('computer', computerGameBoard, possibleTargets);
const createPlayerBoard = () => createGrid('user', playerGameBoard, possibleTargets);

export { createComputerBoard, createPlayerBoard, addClickListeners };
