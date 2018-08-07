let StateMachine =  require('javascript-state-machine');

export class FSM extends StateMachine {
  constructor() {
    super({
      init: 'unlocked',
      transitions: [
        { name: 'lock',  from: 'unlocked', to: 'locked'    },
        { name: 'unlock', from: 'locked',   to: 'unlocked'  },
      ],
      methods: {
        onLock: () => {
           console.log('I am locked')
        },
        onUnlock: () => {
          console.log('I am unlocked')
        },
      }
    })
  }
}

export function locked(actor) {
  if (!actor.input.keyboard.lock.isDown && actor.input.controller.lock <= 0) {
    actor.states.lock.unlock(actor);
    actor.ui_tweens.forEach((tween) => {
      tween.stop();
    });
    actor.ui_tweens = [];
    actor.ui_directions.forEach((element) => {
      element.setScale(.6);
      element.alpha = 0;
    });
  }
}

export function unlocked(actor) {
  if (actor.input.keyboard.lock.isDown || actor.input.controller.lock > 0) {
    actor.states.lock.lock(actor);
    actor.ui_directions.forEach((element) => {
      element.setScale(.6);
      element.alpha = .5;
    });
  }
}
