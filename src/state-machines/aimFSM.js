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

function updateAimUI(game, dir, actor) {
  let dirs = ['up', 'down', 'front'];

  game.tweens.add({
    targets: actor['aim_' + dir],
    scaleX: .8,
    scaleY: .8,
    alpha: 1,
    duration: 1000,
    ease: 'Elastic',
    easeParams: [ 1.5, 0.5 ],
    delay: 0
  });

  dirs.filter((d) => d != dir).forEach((d) => {
    game.tweens.add({
      targets: actor['aim_' + d],
      scaleX: .6,
      scaleY: .6,
      alpha: .5,
      duration: 1000,
      ease: 'Elastic',
      easeParams: [ 1.5, 0.5 ],
      delay: 0
    });
  });
}

export function aimingUp(game, dir, actor) {
  if (actor.input.keyboard.aim_down.isDown || actor.input.controller.aim_down > 0.4) {
    updateAimUI(game, 'down', actor);
    actor.states.aim.aimDown();
  } else if (actor.input.keyboard.aim_front.isDown || actor.input.controller.aim_front > 0) {
    updateAimUI(game, 'front', actor);
    actor.states.aim.aimFront();
  }
}
export function aimingDown(game, dir, actor) {
  if (actor.input.keyboard.aim_up.isDown || actor.input.controller.aim_up < -0.4) {
    updateAimUI(game, 'up', actor);
    actor.states.aim.aimUp();
  } else if (actor.input.keyboard.aim_front.isDown || actor.input.controller.aim_front > 0) {
    updateAimUI(game, 'front', actor);
    actor.states.aim.aimFront();
  }
}
export function aimingFront(game, dir, actor) {
  if (actor.input.keyboard.aim_up.isDown || actor.input.controller.aim_up < -0.4) {
    updateAimUI(game, 'up', actor);
    actor.states.aim.aimUp();
  } else if (actor.input.keyboard.aim_down.isDown || actor.input.controller.aim_down > 0.4) {
    updateAimUI(game, 'down', actor);
    actor.states.aim.aimDown();
  }
}
