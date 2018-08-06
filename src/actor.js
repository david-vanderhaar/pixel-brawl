import * as actionFSM from './state-machines/actionFSM';
import * as aimFSM from './state-machines/aimFSM';

export function createActor(game, x, y) {
  let new_actor = game.add.group();
  new_actor.x = x;
  new_actor.y = y;
  new_actor.states = {
    actions: new actionFSM.FSM,
    aim: new aimFSM.FSM
  }

  // controls
  console.log(game.input)
  new_actor.input = {
    keyboard: {
      left: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      aim_up: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      aim_down: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
      aim_front: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    },
    controller: {
      pad: null,
      left: null,
      right: null,
      aim_up: null,
      aim_down: null,
      aim_front: null,
    }
  }
  //end controls
  // ui
  new_actor.hit_box = new_actor.create(x, y, 'body')
  new_actor.hit_box.name = 'hit_box';
  new_actor.aim_up = new_actor.create(x, y - 42, 'direction')
  new_actor.aim_up.name = 'aim_up';
  new_actor.aim_down = new_actor.create(x, y + 42, 'direction')
  new_actor.aim_down.name = 'aim_down';
  new_actor.aim_front = new_actor.create(x + 42, y, 'direction')
  new_actor.aim_front.name = 'aim_front';
  new_actor.ui_directions = [
    new_actor.aim_up,
    new_actor.aim_down,
    new_actor.aim_front,
  ];
  new_actor.ui_directions.forEach((element) => {
    element.setScale(.6);
    element.alpha = .5;
  });
  // end ui
  // update
  new_actor.update = (game) => {
    try {
      new_actor.input.pad = game.input.gamepad.getPad(0);
      new_actor.input.controller.left = new_actor.input.pad.axes[0].getValue();
      new_actor.input.controller.right = new_actor.input.pad.axes[0].getValue();
      new_actor.input.controller.aim_up = new_actor.input.pad.axes[4].getValue();
      new_actor.input.controller.aim_down = new_actor.input.pad.axes[4].getValue();
      new_actor.input.controller.aim_front = new_actor.input.pad.axes[3].getValue();
    } catch(error) {
      // console.error('No gamepad detected');
    }

    switch (new_actor.states.actions.state) {
      case 'standing':
        actionFSM.standing(new_actor);
        break;
      case 'moving':
        actionFSM.moving(new_actor);
        break;
    }

    switch (new_actor.states.aim.state) {
      case 'up':
        aimFSM.aimingUp(game, 'up', new_actor);
        break;
      case 'down':
        aimFSM.aimingDown(game, 'down', new_actor);
        break;
      case 'front':
        aimFSM.aimingFront(game, 'front', new_actor);
        break;
    }

  }
  //end update
  return new_actor;
};
