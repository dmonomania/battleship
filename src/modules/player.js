const PubSub = require('pubsub-js');

function player() {
  // TODO: need pubsubs for player won lose count
  return {
    name: '',
    gamesLost: 0,
    gamesWon: 0,
    gamesPlayed() {
      return this.gamesLost + this.gamesWon;
    },
  };
}

function computerPlayer() {
  const basePlayer = Object.assign(player());

  const possibleTargets = (() => {
    const yAxis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const finalArray = [];
    yAxis.forEach((letter) => {
      for (let i = 1; i <= 10; i++) {
        finalArray.push(letter.concat(i));
      }
    });
    return finalArray;
  })();

  const previouslyAttackedTargets = [];
  // TODO - set up the computer attack to be a little smarter
  const smartNextChoice = [];

  function attack() {
    if (possibleTargets.length === 0) {
      throw new Error('No more targets');
    }

    const attackLocationNumber = chooseGridLocation();
    const attackGridLocation = possibleTargets[attackLocationNumber];

    possibleTargets.splice(attackLocationNumber, 1);
    previouslyAttackedTargets.push(attackLocationNumber);

    const pubSubTopic = 'attack.fromComputer';
    PubSub.publish(pubSubTopic, attackGridLocation);
  }

  function chooseGridLocation() {
    let validAttackLocation = false;

    function randomGridNumber() {
      return Math.floor(Math.random() * possibleTargets.length);
    }
    let gridToAttack = randomGridNumber();
    do {
      gridToAttack = randomGridNumber();
      const gridCheck = previouslyAttackedTargets.find((e) => e === gridToAttack);
      if (gridCheck !== undefined) {
        break;
      } else {
        validAttackLocation = true;
      }
    } while (validAttackLocation === false);

    return gridToAttack;
  }

  return {
    ...basePlayer,
    attack,
  };
}

module.exports = { computerPlayer: computerPlayer, player: player };
