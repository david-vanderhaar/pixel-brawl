import 'phaser';
import * as states from './gameStates';

let config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
      system: 'arcade'
    },
    scene: [
      states.Boot,
      states.Load,
      states.Play
    ]
};

let game = new Phaser.Game(config);
