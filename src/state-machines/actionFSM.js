import { shouldDodge } from '../actor/helper';
let StateMachine =  require('javascript-state-machine');
// let visualize = require('javascript-state-machine/lib/visualize');

export class FSM extends StateMachine {
  constructor(actor) {
    super({
      init: 'standing',
      transitions: [
        { name: 'move',  from: ['standing', 'light_attacking', 'heavy_attacking', 'taking_hit', 'blocking', 'dodge_recovering', 'rolling'], to: 'moving'    },
        { name: 'stand', from: ['moving', 'light_attacking', 'heavy_attacking', 'taking_hit', 'blocking', 'dodge_recovering', 'rolling'],   to: 'standing'  },
        { name: 'light', from: ['moving', 'standing'],   to: 'light_attacking'  },
        { name: 'heavy', from: ['moving', 'standing'],   to: 'heavy_attacking'  },
        { name: 'hit', from: ['moving', 'standing', 'taking_hit', 'light_attacking', 'heavy_attacking', 'dodging', 'dodge_recovering', 'rolling'],   to: 'taking_hit'  },
        { name: 'block', from: ['moving', 'standing',], to: 'blocking'  },
        { name: 'dodge', from: ['moving', 'standing',], to: 'dodging'  },
        { name: 'dodge_recover', from: ['dodging'], to: 'dodge_recovering'  },
        { name: 'roll', from: ['dodging'], to: 'rolling'  },
      ],
      methods: {
        onInvalidTransition: function(transition, from, to) {
          console.log('invalid transition ', transition)
          console.log(from, to)
          return;
        },
        onMove:  function() {
          this.getActor().actor.ui.hit_box.destroy(this.getActor().actor);
          this.getActor().actor.ui.body.anims.play(this.getActor().actor.ui.animations + '_run');
        },
        onStand: function() {
          this.getActor().actor.ui.hit_box.destroy(this.getActor().actor);
          this.getActor().actor.ui.body.anims.play(this.getActor().actor.ui.animations + '_idle');
        },
        onLight: function() {
          this.getActor().actor.ui.body.anims.play(this.getActor().actor.ui.animations + '_light');
        },
        onHeavy: function() {
          this.getActor().actor.ui.body.anims.play(this.getActor().actor.ui.animations + '_heavy');
        },
        onHit: function() {
          this.getActor().actor.ui.hit_box.destroy(this.getActor().actor);
          // taking damage, should be moved to helper and improved. take into account, other actor script
          this.getActor().actor.health.value -= 1;
          this.getActor().actor.health.text.setText(`Player ${this.getActor().actor.id} Health: ${this.getActor().actor.health.value}`);
          // end
          this.getActor().actor.ui.body.anims.play(this.getActor().actor.ui.animations + '_hit');
          // this.getActor().actor.setVelocityX(-this.getActor().actor.speed, 0);
        },
        onBlock: function() {
          this.getActor().actor.ui.body.anims.play(this.getActor().actor.ui.animations + '_block');
        },
        onDodge: function() {
          this.getActor().actor.ui.body.anims.play(this.getActor().actor.ui.animations + '_dodge');
          let speed = this.getActor().actor.ui.body.body.velocity.x * this.getActor().actor.dodge_multiplier;
          this.getActor().actor.setVelocityX(speed, 0);
        },
        onDodgeRecover: function() {
          this.getActor().actor.ui.body.anims.play(this.getActor().actor.ui.animations + '_dodge_recovery');
        },
        onRoll: function() {
          this.getActor().actor.ui.body.anims.play(this.getActor().actor.ui.animations + '_roll');
        },
        getActor: function() { return this.actor },
      }
    })
    this.actor = actor;

  }
}

export function moving(actor) {
  if (actor.is_dummy) { actor.states.actions.stand(); return }

  if (shouldDodge(actor)) {
    actor.states.actions.dodge();
  } else if (actor.input.LIGHT()) {
    actor.states.actions.light();
  } else if (actor.input.HEAVY()) {
    actor.states.actions.heavy();
  } else if (actor.input.LEFT()) {
    if (actor.facingRight && actor.states.lock.is('unlocked')) { actor.facingRight = false; actor.ui.flip(actor);}
    let speed = actor.speed * (actor.states.lock.is('unlocked') ? actor.run_multiplier : 1);
    actor.setVelocityX(-speed, 0)
  } else if (actor.input.RIGHT()) {
    if (!actor.facingRight && actor.states.lock.is('unlocked')) { actor.facingRight = true; actor.ui.flip(actor);}
    let speed = actor.speed * (actor.states.lock.is('unlocked') ? actor.run_multiplier : 1);
    actor.setVelocityX(speed, 0)
  }  else {
    actor.states.actions.stand();
  }
}

export function standing(actor) {
  actor.setVelocityX(0, 0)

  if (shouldDodge(actor)) {
    actor.states.actions.dodge();
  }

  if (actor.input.LIGHT()) {
    actor.states.actions.light();
  }

  if (actor.input.HEAVY()) {
    actor.states.actions.heavy();
  }

  if (actor.input.LEFT()) {
    actor.states.actions.move();
  }

  if (actor.input.RIGHT()) {
    actor.states.actions.move();
  }
}

export function light_attacking(actor) {
  actor.setVelocityX(0, 0)
  let activeFrames = [4, 5]
  updateAttackState(actor, activeFrames);
}

export function heavy_attacking(actor) {
  actor.setVelocityX(0, 0)
  let activeFrames = [4, 5, 6]
  updateAttackState(actor, activeFrames);
}

export function taking_hit(actor) {
  if (!actor.ui.body.anims.isPlaying) {
    actor.states.actions.stand();
  }
}

export function blocking(actor) {
  if (!actor.ui.body.anims.isPlaying) {
    actor.states.actions.stand();
  }
}

export function dodging(actor) {
  if (actor.input.DODGE()) {
    actor.states.actions.roll();
  }
  if (!actor.ui.body.anims.isPlaying) {
    actor.states.actions.dodgeRecover();
  }
}

export function dodge_recovering(actor) {
  actor.setVelocityX(0, 0)
  if (!actor.ui.body.anims.isPlaying) {
    actor.states.actions.stand();
  }
}

export function rolling(actor) {
  if (!actor.ui.body.anims.isPlaying) {
    actor.states.actions.stand();
  }
}

// Helpers
let updateAttackState = function(actor, activeFrames) {
  let currentFrame = actor.ui.body.anims.currentFrame.index;
  if (activeFrames.indexOf(currentFrame) !== -1) {
    if (actor.ui.hit_box.box == null) {
      actor.ui.hit_box.create(actor);
    }
    actor.ui.hit_box.update(actor);
  }
  if (!actor.ui.body.anims.isPlaying) {
    actor.states.actions.stand();
  }
}
