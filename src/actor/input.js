export function createInput(game) {
  return {
    keyboard: {
      left: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      aim_up: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      aim_down: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
      aim_front: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      lock: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT),
    },
    pad: null,
    controller: {
      pad: null,
      left: null,
      right: null,
      aim_up: null,
      aim_down: null,
      aim_front: null,
      lock: null,
    },
    update: (actor) => {
      try {
        actor.input.pad = game.input.gamepad.getPad(0);
        actor.input.controller.left = actor.input.pad.axes[0].getValue();
        actor.input.controller.right = actor.input.pad.axes[0].getValue();
        actor.input.controller.aim_up = actor.input.pad.axes[4].getValue();
        actor.input.controller.aim_down = actor.input.pad.axes[4].getValue();
        actor.input.controller.aim_front = actor.input.pad.axes[3].getValue();
        actor.input.controller.lock = actor.input.pad.axes[2].getValue();
      } catch(error) {
        // console.error('No gamepad detected');
      }
    }
  }
}