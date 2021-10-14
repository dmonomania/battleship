const PubSub = require('pubsub-js');
const newShip = require('./ships');

function baseGameBoard() {
  return {
    name: 'anonymous',
    ships: [],
    attackedSpaces: [],
    occupiedSpaces: [],

    receiveAttack(gridlocation) {
      const attackedAlready = this.attackedSpaces.find((e) => e === gridlocation);
      if (attackedAlready !== undefined) {
        throw new Error('This space has already been attacked');
      }

      this.attackedSpaces.push(gridlocation);

      for (let i = 0; i < this.ships.length; i++) {
        if (this.ships[i].location[gridlocation] === undefined) {
          if (i < this.ships.length - 1) {
            continue;
          } else {
            let message = 'You missed';
            return message;
            /// pubsub.publish something here
          }
        } else {
          this.ships[i].hit(gridlocation);
          // update the dom here pubsub publish something
          const hasItSunk = this.ships[i].isSunk();
          if (hasItSunk === true) {
            this.ships.slice(i, 1);
            // pubsub something here
          }
          let message = 'You Hit';
          return message;
          break;
        }
      }
    },

    createShip(name, length, gridArray) {
      const ship = newShip(name, length, gridArray);
      gridArray.forEach((e) => this.occupiedSpaces.push(e));
      this.ships.push(ship);
      PubSub.publish('new-ship', ['computer', gridArray, name]);
    },
    anyShipsLeft() {
      return this.ships.length === 0 ? false : true;
    },
  };
}

function computerGameBoard() {
  const gameBoard = Object.assign(baseGameBoard());
  function validPlacementArray(shipLength, axis) {
    const yAxis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const xAxis = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

    if (axis === 'xAxis') {
      xAxis.length = xAxis.length - shipLength + 1;
    } else {
      yAxis.length = yAxis.length - shipLength + 1;
    }

    const finalArray = [];
    yAxis.forEach((letter) => {
      for (let i = 0; i < xAxis.length; i += 1) {
        finalArray.push(letter.concat(xAxis[i]));
      }
    });
    return finalArray;
  }

  function pickStartPoint(array) {
    const startPoint = Math.floor(Math.random() * array.length);
    return array[startPoint];
  }

  function startPointToFullShipGrid(startPoint, shipLength, chosenAxis) {
    const fullGrid = validPlacementArray(1, 'xAxis');
    const startPointIndex = fullGrid.findIndex((e) => e === startPoint);
    const finalShipGrid = [];
    if (chosenAxis === 'xAxis') {
      for (let i = 0; i < shipLength; i += 1) {
        const number = startPointIndex + i;
        finalShipGrid.push(fullGrid[number]);
      }
    } else {
      for (let i = 0; i < shipLength; i += 1) {
        const number = startPointIndex + i * 10;
        finalShipGrid.push(fullGrid[number]);
      }
    }
    return finalShipGrid;
  }

  function placeComputerShips(shipname, shiplength) {
    const randomAxis = (() => (Math.floor(Math.random() * 2) === 1 ? 'xAxis' : 'yAxis'))();
    const availablePositions = validPlacementArray(shiplength, randomAxis);

    let isValid = false;
    let fullShipGridLocationArray;
    do {
      const startPoint = pickStartPoint(availablePositions);
      fullShipGridLocationArray = startPointToFullShipGrid(startPoint, shiplength, randomAxis);
      // need to move this method as it's applicable elsewhere too
      const findOne = (haystack, arr) => arr.some((v) => haystack.includes(v));

      const gridCheck = findOne(this.occupiedSpaces, fullShipGridLocationArray);

      if (gridCheck === false) {
        isValid = true;
      }
    } while (isValid === false);

    this.createShip(shipname, shiplength, fullShipGridLocationArray);
  }

  return {
    ...gameBoard,
    placeComputerShips,
  };
}

module.exports = { baseGameBoard, computerGameBoard };

// const allShipVariations = [
//   { name: 'Aircraft-Carier', length: 5 },
//   { name: 'Battleship', length: 4 },
//   { name: 'Submarine', length: 3 },
//   { name: 'Cruiser', length: 3 },
//   { name: 'Destoyer', length: 2 },
// ];

// const computerthingy = computerGameBoard();
// allShipVariations.forEach((ship) => {
//   computerthingy.placeComputerShips(ship.name, ship.length);
// });
