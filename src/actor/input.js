export function createInput(game) {
  console.log(Phaser.Input.Keyboard.KeyCodes)
  return {
    keyboard: {
      left: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      aim_up: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      aim_left: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      aim_right: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      lock: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT),
      light: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
      heavy: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R),
      dodge: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ALT),
    },
    pad: null,
    controller: {
      pad: null,
      left: null,
      right: null,
      aim_up: null,
      aim_left: null,
      aim_right: null,
      lock: null,
      light: null,
      heavy: null,
      dodge: null,
    },
    update: (actor) => {
      if (actor.input.pad !== null) {
        try {
          // actor.input.pad = game.input.gamepad.getPad(0);
          actor.input.controller.left = actor.input.pad.axes[0].getValue();
          actor.input.controller.right = actor.input.pad.axes[0].getValue();
          actor.input.controller.aim_up = actor.input.pad.axes[4].getValue();
          actor.input.controller.aim_left = actor.input.pad.axes[3].getValue();
          actor.input.controller.aim_right = actor.input.pad.axes[3].getValue();
          actor.input.controller.lock = actor.input.pad.axes[2].getValue();
          actor.input.controller.light = actor.input.pad.R1;
          actor.input.controller.heavy = actor.input.pad.axes[5].getValue();
          actor.input.controller.dodge = actor.input.pad.A;
        } catch(error) {
          // console.error('No gamepad detected');
        }
      }
    }
  }
}
