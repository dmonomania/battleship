function newShip(name, shiplength, locationArray = []) {
  if (shiplength !== locationArray.length) {
    throw new Error('Ship length does not match gameboard position');
  }
  const location = locationArray.reduce(
    (previous, current) => ({ ...previous, [current]: false }),
    {}
  );

  return {
    name,
    shiplength,
    location: location,
    numberOfHits: 0,
    isSunk() {
      return this.numberOfHits === shiplength ? true : false;
    },
    hit(gridsquare) {
      this.location[gridsquare] = true;
      this.numberOfHits += 1;
      return 'Hit';
    },
  };
}

module.exports = newShip;
