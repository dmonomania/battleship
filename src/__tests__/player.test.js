const playerModule = require('../modules/player');

test('Attack can run 100 times', () => {
  expect(() => {
    const pc = playerModule.computerPlayer();
    for (let index = 1; index <= 100; index++) {
      pc.attack();
    }
  }).not.toThrow(Error);
});

test('Attack cannot run 101 times', () => {
  expect(() => {
    const pc = playerModule.computerPlayer();
    for (let index = 1; index <= 101; index++) {
      pc.attack();
    }
  }).toThrow(Error);
});
