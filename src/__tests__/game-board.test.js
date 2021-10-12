const gameBoard = require('../modules/game-board');

test('creates a gameboard', () => {
  const playerBoard = gameBoard();
  expect(playerBoard.name).toBe('anonymous');
  expect(playerBoard.ships).not.toBe(undefined);
  expect(playerBoard.attackedSpaces).not.toBe(undefined);
  expect(playerBoard.occupiedSpaces).not.toBe(undefined);
});

test('creates a ship', () => {
  const playerBoard = gameBoard();
  playerBoard.createShip('Carrier', 2, ['A1', 'A2']);
  expect(playerBoard.ships[0].name).toBe('Carrier');
  expect(playerBoard.occupiedSpaces.length).toBe(2);
});

test('are there any ships left', () => {
  const playerBoard = gameBoard();
  playerBoard.createShip('Carrier', 2, ['A1', 'A2']);
  expect(playerBoard.anyShipsLeft()).toBe(true);
});

test('are there any ships left false', () => {
  const playerBoard = gameBoard();
  expect(playerBoard.anyShipsLeft()).toBe(false);
});

test('receiveAttack() updates attackedSpaces', () => {
  const playerBoard = gameBoard();
  playerBoard.receiveAttack('A1');
  expect(playerBoard.attackedSpaces).toStrictEqual(['A1']);
});

test('receiveAttack() updates attackedSpaces - multiple attacks', () => {
  const playerBoard = gameBoard();
  playerBoard.receiveAttack('A1');
  playerBoard.receiveAttack('A2');
  playerBoard.receiveAttack('A3');
  expect(playerBoard.attackedSpaces).toStrictEqual(['A1', 'A2', 'A3']);
});

test('attacking the same space throws an error', () => {
  expect(() => {
    const playerBoard = gameBoard();
    playerBoard.receiveAttack('A1');
    playerBoard.receiveAttack('A2');
    playerBoard.receiveAttack('A2');
  }).toThrow(Error);
});

// if this test fails, delete it
test('attacking an unoccupied space results in a miss', () => {
  const playerBoard = gameBoard();
  playerBoard.createShip('Carrier', 2, ['A1', 'A2']);
  expect(playerBoard.receiveAttack('B7')).toBe('You missed');
});
// if this test fails, delete it
test('attacking an occupied space results in a hit', () => {
  const playerBoard = gameBoard();
  playerBoard.createShip('Carrier', 2, ['A1', 'A2']);
  expect(playerBoard.receiveAttack('A1')).toBe('You Hit');
});
