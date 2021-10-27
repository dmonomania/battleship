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

module.exports = { startPointToFullShipGrid, validPlacementArray };
