import { possibleTargets, createGrid } from './modules/DOM-gameboard';

const gameLoop = require('./modules/game-loop');
const PubSub = require('pubsub-js');

createGrid(possibleTargets);
gameLoop();
