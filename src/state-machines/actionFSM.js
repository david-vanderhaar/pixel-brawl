let StateMachine =  require('javascript-state-machine');

export class FSM extends StateMachine {
  constructor() {
    super({
      init: 'standing',
      transitions: [
        { name: 'move',  from: 'standing', to: 'moving'    },
        { name: 'stand', from: 'moving',   to: 'standing'  },
      ],
      methods: {
        onMove:  function() { console.log('I began moving')    },
        onStand: function() { console.log('I began standing')  },
      }
    })
  }
}

export function moving(actor) {
  if (actor.input.keyboard.left.isDown || actor.input.controller.left < 0) {
    Phaser.Actions.IncX(actor.getChildren(), -4);
  }
  else if (actor.input.keyboard.right.isDown || actor.input.controller.right > 0) {
    Phaser.Actions.IncX(actor.getChildren(), 4);
  } else {
    actor.states.actions.stand();
  }
}

export function standing(actor) {
  if (actor.input.keyboard.left.isDown || actor.input.controller.left < 0) {
    actor.states.actions.move();
  }
  else if (actor.input.keyboard.right.isDown || actor.input.controller.right > 0) {
    actor.states.actions.move();
  }
}
