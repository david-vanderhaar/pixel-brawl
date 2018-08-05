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
let a;
let group;
export class Play extends Phaser.Scene {
  constructor () {
    super({ key: 'Play', active: false });
  }
  create() {
    this.add.text(80, 20, 'Play')

    let createActor = (game, x, y) => {
      let new_actor = this.add.group();
      new_actor.x = x;
      new_actor.y = y;
      // controls
      new_actor.input = {
        left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
        right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
        aim_up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        aim_left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        aim_right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        aim_right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      }
      //end controls
      // ui
      new_actor.hit_box = new_actor.create(x, y, 'body')
      new_actor.hit_box.name = 'hit_box';
      new_actor.aim_up = new_actor.create(x, y - 42, 'direction')
      new_actor.aim_up.name = 'aim_up';
      new_actor.aim_left = new_actor.create(x - 42, y + 32, 'direction')
      new_actor.aim_left.name = 'aim_left';
      new_actor.aim_right = new_actor.create(x + 42, y + 32, 'direction')
      new_actor.aim_right.name = 'aim_right';
      new_actor.ui_directions = [
        new_actor.aim_up,
        new_actor.aim_left,
        new_actor.aim_right,
      ];
      new_actor.ui_directions.forEach((element) => {
        element.setScale(.6);
        element.alpha = .5;
      });
      // end ui
      // update
      new_actor.update = (game) => {
        if (new_actor.input.left.isDown) {
          Phaser.Actions.IncX(new_actor.getChildren(), -4);
        }
        else if (new_actor.input.right.isDown) {
          Phaser.Actions.IncX(new_actor.getChildren(), 4);
        }

        if (new_actor.input.aim_up.isDown) {
          game.tweens.add({
            targets: new_actor.aim_up,
            scaleX: .8,
            scaleY: .8,
            alpha: 1,
            duration: 1000,
            ease: 'Elastic',
            easeParams: [ 1.5, 0.5 ],
            delay: 0
          });
          game.tweens.add({
            targets: new_actor.aim_left,
            scaleX: .6,
            scaleY: .6,
            alpha: .5,
            duration: 1000,
            ease: 'Elastic',
            easeParams: [ 1.5, 0.5 ],
            delay: 0
          });
          game.tweens.add({
            targets: new_actor.aim_right,
            scaleX: .6,
            scaleY: .6,
            alpha: .5,
            duration: 1000,
            ease: 'Elastic',
            easeParams: [ 1.5, 0.5 ],
            delay: 0
          });
        }
        else if (new_actor.input.aim_left.isDown) {
          game.tweens.add({
            targets: new_actor.aim_left,
            scaleX: .8,
            scaleY: .8,
            alpha: 1,
            duration: 1000,
            ease: 'Elastic',
            easeParams: [ 1.5, 0.5 ],
            delay: 0
          });
          game.tweens.add({
            targets: new_actor.aim_up,
            scaleX: .6,
            scaleY: .6,
            alpha: .5,
            duration: 1000,
            ease: 'Elastic',
            easeParams: [ 1.5, 0.5 ],
            delay: 0
          });
          game.tweens.add({
            targets: new_actor.aim_right,
            scaleX: .6,
            scaleY: .6,
            alpha: .5,
            duration: 1000,
            ease: 'Elastic',
            easeParams: [ 1.5, 0.5 ],
            delay: 0
          });
        }
        else if (new_actor.input.aim_right.isDown) {
          game.tweens.add({
            targets: new_actor.aim_right,
            scaleX: .8,
            scaleY: .8,
            alpha: 1,
            duration: 1000,
            ease: 'Elastic',
            easeParams: [ 1.5, 0.5 ],
            delay: 0
          });
          game.tweens.add({
            targets: new_actor.aim_up,
            scaleX: .6,
            scaleY: .6,
            alpha: .5,
            duration: 1000,
            ease: 'Elastic',
            easeParams: [ 1.5, 0.5 ],
            delay: 0
          });
          game.tweens.add({
            targets: new_actor.aim_left,
            scaleX: .6,
            scaleY: .6,
            alpha: .5,
            duration: 1000,
            ease: 'Elastic',
            easeParams: [ 1.5, 0.5 ],
            delay: 0
          });
        }
      }
      //end update
      return new_actor;
    };

    actor = createActor(this, 200, 200);
  } //end create

  update() {
    actor.update(this);
    // Phaser.Actions.IncX(group.getChildren(), .1);
    // actor.aim_left.x += .2
    // actor.getChildren().forEach((child) => {
    //   child.x += .1;
    // })
  }
}
