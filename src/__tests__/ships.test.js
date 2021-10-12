const newShip = require('../modules/ships');

test('does it return anything', () => {
  const carrier = newShip('Carrier', 5, ['A1', 'B1', 'C1', 'D1', 'E1']);
  expect(carrier).not.toBe(undefined);
});

test('returns correct ship length', () => {
  const carrier = newShip('Carrier', 5, ['A1', 'B1', 'C1', 'D1', 'E1']);
  expect(carrier.shiplength).toBe(5);
});

test('returns correct ship name', () => {
  const carrier = newShip('Carrier', 5, ['A1', 'B1', 'C1', 'D1', 'E1']);
  expect(carrier.name).toBe('Carrier');
});

test('ship knows its location', () => {
  const carrier = newShip('Carrier', 5, ['A1', 'B1', 'C1', 'D1', 'E1']);
  expect(carrier.location).toStrictEqual({ A1: false, B1: false, C1: false, D1: false, E1: false });
});

test('Ship Location Array Length must match ship length', () => {
  expect(() => {
    const carrier = newShip('Carrier', 5, ['A1', 'B1', 'C1', 'D1']);
  }).toThrow(Error);
});

test('Takes a hit', () => {
  const carrier = newShip('Carrier', 5, ['A1', 'B1', 'C1', 'D1', 'E1']);
  expect(carrier.hit('A1')).toBe('Hit');
});

test('updates hit location correctly', () => {
  const carrier = newShip('Carrier', 5, ['A1', 'B1', 'C1', 'D1', 'E1']);
  carrier.hit('A1');
  expect(carrier.location).toStrictEqual({ A1: true, B1: false, C1: false, D1: false, E1: false });
});

test('hit() updates ship.location hit value false/true', () => {
  const carrier = newShip('Carrier', 5, ['A1', 'B1', 'C1', 'D1', 'E1']);
  carrier.hit('A1');
  expect(carrier.location.A1).toBe(true);
});

test('isSunk to return true when all all sections are hit', () => {
  const carrier = newShip('Carrier', 5, ['A1', 'B1', 'C1', 'D1', 'E1']);
  ['A1', 'B1', 'C1', 'D1', 'E1'].forEach((e) => carrier.hit(e));
  expect(carrier.isSunk()).toBe(true);
});

test('isSunk to return false when all all sections are not hit', () => {
  const carrier = newShip('Carrier', 5, ['A1', 'B1', 'C1', 'D1', 'E1']);
  ['A1', 'B1', 'C1', 'D1'].forEach((e) => carrier.hit(e));
  expect(carrier.isSunk()).toBe(false);
});
