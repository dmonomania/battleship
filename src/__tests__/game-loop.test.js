const gameLoop = require('../modules/game-loop');

const possibleTargets = (shipLength, axis) => {
  const yAxis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const xAxis = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  if (axis === 'xAxis') {
    xAxis.length = xAxis.length - shipLength + 1;
  } else {
    yAxis.length = yAxis.length - shipLength + 1;
  }

  const finalArray = [];
  yAxis.forEach((letter) => {
    for (let i = 0; i < xAxis.length; i++) {
      finalArray.push(letter.concat(xAxis[i]));
    }
  });
  return finalArray;
};

test('pick a random start point -- shiplength 5, xAxix', () => {
  const possibleArray = possibleTargets(5, 'xAxis');
  const array = gameLoop.validPlacementArray(5, 'xAxis');
  expect(gameLoop.pickStartPoint(array)).toBeOneOf(possibleArray);
});
test('pick a random start point -- shiplength 3, yAxix', () => {
  const possibleArray = possibleTargets(3, 'yAxis');
  const array = gameLoop.validPlacementArray(3, 'yAxis');
  expect(gameLoop.pickStartPoint(array)).toBeOneOf(possibleArray);
});
