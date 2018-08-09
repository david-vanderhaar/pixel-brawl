import { createActor } from './actor';

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
  }

}

let actor;

export class Play extends Phaser.Scene {
  constructor () {
    super({ key: 'Play', active: false });
  }
  create() {
    this.add.text(80, 20, 'Play')

    actor = createActor(this, 200, 200);

  } //end create
  
  update() {
    actor.update(this);
  }
}
