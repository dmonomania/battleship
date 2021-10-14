const PubSub = require('pubsub-js');

const gameBoard = document.querySelector('.grid-container');
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

function createGrid(array) {
  array.forEach((gridReference) => {
    const div = document.createElement('div');
    div.className = `${gridReference} gridsquare inactive`;
    div.dataset.grid = gridReference;
    gameBoard.appendChild(div);
  });
}

function handleNewShip(topic, data) {
  //   console.log(data[2]);
  const messageFrom = data[0];
  const messageArray = data[1];
  const shipName = data[2];
  shipName.replace((/ /g, ''));

  const gridArray = (() => {
    if (messageFrom === 'computer') {
      return document.querySelectorAll('.gridsquare');
    }
    return document.querySelectorAll('.computer');
  })();

  gridArray.forEach((grid) => {
    const gridCheck = messageArray.some((testGridRef) => grid.dataset.grid === testGridRef);

    if (gridCheck === true) {
      grid.classList.remove('inactive');
      grid.classList.add('active');
      grid.classList.add(shipName);
    }
  });
}

PubSub.subscribe('new-ship', handleNewShip);
export { createGrid, possibleTargets };
