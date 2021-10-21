import { addClickListeners, createComputerBoard, createPlayerBoard } from './modules/DOM-gameboard';

const gameLoop = require('./modules/game-loop');
const PubSub = require('pubsub-js');

createComputerBoard();
createPlayerBoard();
addClickListeners();
gameLoop();
