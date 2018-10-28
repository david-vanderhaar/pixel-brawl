import { createActor } from './actor';
import * as Animations from './animations/index';

export class Boot extends Phaser.Scene {
  constructor () {
    super({ key: 'Boot', active: true });
  }

  create() {
    console.log('Boot Initiated')
    this.scene.start('Load');
  }
}

export class Load extends Phaser.Scene {
  constructor () {
    super({ key: 'Load', active: false });
  }
  preload() {
      this.load.image('logo', 'assets/logo.png');
      this.load.image('body', 'assets/red.png');
      this.load.image('direction', 'assets/blue.png');
      this.load.spritesheet('squares', 'assets/square2.png', { frameWidth: 32, frameHeight: 32 });
      this.load.spritesheet('sword_guy', 'assets/SwordGuy_SHEET.png', { frameWidth: 64, frameHeight: 64 });
      // this.load.spritesheet('adventurer', 'assets/adventurer-v1.5-Sheet.png', { frameWidth: 50, frameHeight: 37 });
      // this.load.spritesheet('adventurer_2', 'assets/adventurer-hand-combat-Sheet.png', { frameWidth: 50, frameHeight: 37 });
      // this.load.spritesheet('longsword_idle', 'assets/sheets/longsword_idle.png', { frameWidth: 64, frameHeight: 64 });
      // this.load.spritesheet('longsword_walk', 'assets/sheets/longsword_walk.png', { frameWidth: 64, frameHeight: 64 });
      // this.load.spritesheet('longsword_block_1', 'assets/sheets/longsword_block_1.png', { frameWidth: 64, frameHeight: 64 });
      // this.load.spritesheet('longsword_mittlehau', 'assets/sheets/longsword_mittlehau.png', { frameWidth: 64, frameHeight: 64 });
      // this.load.spritesheet('longsword_zornhau', 'assets/sheets/longsword_zornhau.png', { frameWidth: 64, frameHeight: 64 });

  }

  create() {
    let logo = this.add.image(400, 150, 'logo');

    this.tweens.add({
        targets: logo,
        y: 450,
        duration: 2000,
        ease: 'Power2',
        yoyo: true,
        loop: -1
    });

    setTimeout(() => {
      this.scene.start('Play')
    }, 100)

    Animations.initAnimations(this);

  }

}

let actor;
let dummy;

export class Play extends Phaser.Scene {
  constructor () {
    super({ key: 'Play', active: false });
  }
  create() {
    this.add.text(80, 20, 'Play')
    this.add.text(80, 50, 'Press a button on the Gamepad to use', { font: '16px Courier', fill: '#00ff00' });
    this.pixel_brawl = {}
    this.pixel_brawl.actors = [];
    this.pixel_brawl.maxPlayers = 2;
    // this.pixel_brawl.dummy = this.physics.add.sprite(600, 200, 'body')
    addPad(this);

    // remove after testing
    // this.pixel_brawl.actors.push(createActor(this, this.pixel_brawl.actors.length, 200, 200))
    // this.pixel_brawl.actors.push(createActor(this, this.pixel_brawl.actors.length, 400, 200, true))
    // end remove

  } //end create

  update() {
    this.pixel_brawl.actors.forEach((actor) => {
      actor.update(this)
    })
  }
}

let addPad = (game) => {
  game.input.gamepad.once('down', function (pad, button, index) {
    if (!pad.hasOwnProperty('isActive')) {
      pad['isActive'] = true;
      let actor = createActor(game, this.pixel_brawl.actors.length, 200, 200);
      actor.input.pad = pad
      game.pixel_brawl.actors.push(actor)
    } else {
      console.log('taken')
    }
    if (game.pixel_brawl.actors.length < game.pixel_brawl.maxPlayers) {
      addPad(game);
    }
  }, game);
}
