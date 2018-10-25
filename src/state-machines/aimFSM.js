let StateMachine =  require('javascript-state-machine');

export class FSM extends StateMachine {
  constructor() {
    super({
      init: 'up',
      transitions: [
        { name: 'aim_up', from: [ 'left', 'right'], to: 'up' },
        { name: 'aim_left', from: [ 'up', 'right'], to: 'left' },
        { name: 'aim_right', from: [ 'left', 'up'], to: 'right' },
      ],
      methods: {
        onAimUp:  function() { console.log('I aimed up')    },
        onAimLeft: function() { console.log('I aimed left')  },
        onAimRight: function() { console.log('I aimed right')  },
      }
    })
  }
}

export function aimingUp(game, dir, actor) {
  if (actor.input.AIM_LEFT()) {
    actor.ui.aimUISwitch(game, 'left', actor);
    actor.states.aim.aimLeft();
  } else if (actor.input.AIM_RIGHT()) {
    actor.ui.aimUISwitch(game, 'right', actor);
    actor.states.aim.aimRight();
  }

  if (actor.states.aim.is('up') && actor.ui.directions.aim_up.scaleX < actor.ui.constants.scaleActive) {
    actor.ui.aimUISwitch(game, 'up', actor);
  }
}
export function aimingLeft(game, dir, actor) {
  if (actor.input.AIM_UP()) {
    actor.ui.aimUISwitch(game, 'up', actor);
    actor.states.aim.aimUp();
  } else if (actor.input.AIM_RIGHT()) {
    actor.ui.aimUISwitch(game, 'right', actor);
    actor.states.aim.aimRight();
  }
  if (actor.states.aim.is('left') && actor.ui.directions.aim_up.scaleX < actor.ui.constants.scaleActive) {
    actor.ui.aimUISwitch(game, 'left', actor);
  }
}
export function aimingRight(game, dir, actor) {
  if (actor.input.AIM_UP()) {
    actor.ui.aimUISwitch(game, 'up', actor);
    actor.states.aim.aimUp();
  } else if (actor.input.AIM_LEFT()) {
    actor.ui.aimUISwitch(game, 'left', actor);
    actor.states.aim.aimLeft();
  }
  if (actor.states.aim.is('right') && actor.ui.directions.aim_up.scaleX < actor.ui.constants.scaleActive) {
    actor.ui.aimUISwitch(game, 'right', actor);
  }
}
