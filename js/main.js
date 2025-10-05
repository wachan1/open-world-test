import { Game } from './game/Game.js';

window.addEventListener('DOMContentLoaded', () => {
  const game = new Game({
    stageW: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--stage-w')),
    stageH: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--stage-h')),
    worldW: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--world-w')),
    worldH: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--world-h')),
    rootSel: '#game',
    worldSel: '#world',
    debugSel: '#debug',
  });
  game.start();
});
