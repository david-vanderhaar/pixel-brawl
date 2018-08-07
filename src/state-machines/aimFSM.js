let StateMachine =  require('javascript-state-machine');

export class FSM extends StateMachine {
  constructor() {
    super({
      init: 'up',
      transitions: [
        { name: 'aim_up', from: [ 'down', 'front'], to: 'up' },
        { name: 'aim_down', from: [ 'up', 'front'], to: 'down' },
        { name: 'aim_front', from: [ 'down', 'up'], to: 'front' },
      ],
      methods: {
        onAimUp:  function() { console.log('I aimed up')    },
        onAimDown: function() { console.log('I aimed down')  },
        onAimFront: function() { console.log('I aimed front')  },
      }
    })
  }
}

export function aimingUp(game, dir, actor) {
  if (actor.input.keyboard.aim_down.isDown || actor.input.controller.aim_down > 0.4) {
    actor.ui.update(game, 'down', actor);
    actor.states.aim.aimDown();
  } else if (actor.input.keyboard.aim_front.isDown || actor.input.controller.aim_front > 0) {
    actor.ui.update(game, 'front', actor);
    actor.states.aim.aimFront();
  }

  if (actor.states.aim.is('up') && actor.ui.directions.aim_up.scaleX < actor.ui.constants.scaleActive) {
    actor.ui.update(game, 'up', actor);
  }
}
export function aimingDown(game, dir, actor) {
  if (actor.input.keyboard.aim_up.isDown || actor.input.controller.aim_up < -0.4) {
    console.log(actor.input.keyboard.aim_up)
    actor.ui.update(game, 'up', actor);
    actor.states.aim.aimUp();
  } else if (actor.input.keyboard.aim_front.isDown || actor.input.controller.aim_front > 0) {
    actor.ui.update(game, 'front', actor);
    actor.states.aim.aimFront();
  }
  if (actor.states.aim.is('down') && actor.ui.directions.aim_up.scaleX < actor.ui.constants.scaleActive) {
    actor.ui.update(game, 'down', actor);
  }
}
export function aimingFront(game, dir, actor) {
  if (actor.input.keyboard.aim_up.isDown || actor.input.controller.aim_up < -0.4) {
    actor.ui.update(game, 'up', actor);
    actor.states.aim.aimUp();
  } else if (actor.input.keyboard.aim_down.isDown || actor.input.controller.aim_down > 0.4) {
    actor.ui.update(game, 'down', actor);
    actor.states.aim.aimDown();
  }
  if (actor.states.aim.is('front') && actor.ui.directions.aim_up.scaleX < actor.ui.constants.scaleActive) {
    actor.ui.update(game, 'front', actor);
  }
}
