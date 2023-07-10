import 'phaser';
import * as states from './gameStates';

let config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        // debug: false,
        debug: true,
      },
    },
    input: {
      gamepad: true
    },
    scene: [
      states.Boot,
      states.Load,
      states.Play
    ]
};

let game = new Phaser.Game(config);
