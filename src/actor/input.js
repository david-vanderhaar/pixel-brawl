export function createInput(game, actor) {
  return {
    LEFT: () => {
      return actor.input.keyboard.left.isDown || actor.input.controller.left.value > 0
    },
    RIGHT: () => {
      return actor.input.keyboard.right.isDown || actor.input.controller.right.value > 0
    },
    AIM_UP: () => {
      return Phaser.Input.Keyboard.JustDown(actor.input.keyboard.aim_up) || actor.input.controller.aim_up.value > 0.4
    },
    AIM_LEFT: () => {
      return Phaser.Input.Keyboard.JustDown(actor.input.keyboard.aim_left) || actor.input.controller.aim_left.value > 0
    },
    AIM_RIGHT: () => {
      return Phaser.Input.Keyboard.JustDown(actor.input.keyboard.aim_right) || actor.input.controller.aim_right.value > 0
    },
    LOCK: () => {
      return Phaser.Input.Keyboard.JustDown(actor.input.keyboard.lock) || actor.input.controller.lock.value > 0
    },
    UNLOCK: () => {
      return !actor.input.keyboard.lock.isDown && actor.input.controller.lock.value <= 0
    },
    LIGHT: () => {
      return Phaser.Input.Keyboard.JustDown(actor.input.keyboard.light) || justDown(actor.input.controller.light)
    },
    HEAVY: () => {
      return Phaser.Input.Keyboard.JustDown(actor.input.keyboard.heavy) || justDown(actor.input.controller.heavy)
    },
    DODGE: () => {
      return Phaser.Input.Keyboard.JustDown(actor.input.keyboard.dodge) || justDown(actor.input.controller.dodge)
    },
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
      left: {
        value: 0,
        duration: 0,
      },
      right: {
        value: 0,
        duration: 0,
      },
      aim_up: {
        value: 0,
        duration: 0,
      },
      aim_left: {
        value: 0,
        duration: 0,
      },
      aim_right: {
        value: 0,
        duration: 0,
      },
      lock: {
        value: 0,
        duration: 0,
      },
      light: {
        value: 0,
        duration: 0,
      },
      heavy: {
        value: 0,
        duration: 0,
      },
      dodge: {
        value: 0,
        duration: 0,
      },
    },
    update: (actor) => {
      if (actor.input.pad !== null) {
        try {
          actor.input.controller.left.value = actor.input.pad.axes[0].getValue() * -1;
          actor.input.controller.right.value = actor.input.pad.axes[0].getValue();
          actor.input.controller.aim_up.value = actor.input.pad.axes[4].getValue() * -1;
          actor.input.controller.aim_left.value = actor.input.pad.axes[3].getValue() * -1;
          actor.input.controller.aim_right.value = actor.input.pad.axes[3].getValue();
          actor.input.controller.lock.value = actor.input.pad.axes[2].getValue();
          actor.input.controller.light.value = actor.input.pad.buttons[5].value;
          actor.input.controller.heavy.value = actor.input.pad.axes[5].getValue();
          actor.input.controller.dodge.value = actor.input.pad.buttons[0].value;

          for (let control in actor.input.controller) {
            if (actor.input.controller[control].value > 0) {
              actor.input.controller[control].duration += 1;
            } else {
              actor.input.controller[control].duration = 0;
            }
          }
        } catch(error) {
          // console.error('No gamepad detected');
        }
      }
    }
  }
}

let justDown = (control) => {
  return control.duration == 1;
}
