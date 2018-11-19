import { shouldDodge } from '../actor/helper';
let StateMachine =  require('javascript-state-machine');
// let visualize = require('javascript-state-machine/lib/visualize');

export class FSM extends StateMachine {
  constructor(actor) {
    super({
      init: 'standing',
      data: {
        parry_target: null,
      },
      transitions: [
        { name: 'move',  from: ['standing', 'light_attacking', 'heavy_attacking', 'taking_hit', 'taking_parry', 'taking_parry_stance', 'blocking', 'parrying', 'dodge_recovering', 'rolling'], to: 'moving'    },
        { name: 'stand', from: ['moving', 'light_attacking', 'heavy_attacking', 'taking_hit', 'taking_parry', 'taking_parry_stance', 'blocking', 'parrying', 'dodge_recovering', 'rolling'],   to: 'standing'  },
        { name: 'light', from: ['moving', 'standing'],   to: 'light_attacking'  },
        { name: 'heavy', from: ['moving', 'standing'],   to: 'heavy_attacking'  },
        { name: 'hit', from: ['moving', 'standing', 'taking_hit', 'taking_parry', 'taking_parry_stance', 'light_attacking', 'heavy_attacking', 'dodging', 'dodge_recovering', 'rolling'],   to: 'taking_hit'  },
        { name: 'take_parry', from: ['light_attacking', 'heavy_attacking'],   to: 'taking_parry'  },
        { name: 'take_parry_stance', from: ['moving', 'standing'],   to: 'taking_parry_stance'  },
        { name: 'parry', from: ['taking_parry_stance'],   to: 'parrying'  },
        { name: 'block', from: ['moving', 'standing', 'taking_parry_stance'], to: 'blocking'  },
        { name: 'dodge', from: ['moving', 'standing', 'taking_parry_stance',], to: 'dodging'  },
        { name: 'dodge_recover', from: ['dodging'], to: 'dodge_recovering'  },
        { name: 'roll', from: ['dodging'], to: 'rolling'  },
        { name: 'die', from: ['*'], to: 'dead'  },
      ],
      methods: {
        onInvalidTransition: function(transition, from, to) {
          console.log('invalid transition ', transition)
          console.log(from, to)
          return;
        },
        onMove:  function() {
          this.getActor().actor.ui.hit_box.destroy(this.getActor().actor);
          this.getActor().actor.ui.parry_box.destroy(this.getActor().actor);
          this.getActor().actor.ui.body.anims.play(this.getActor().actor.ui.animations + '_run');
        },
        onStand: function() {
          this.getActor().actor.ui.hit_box.destroy(this.getActor().actor);
          this.getActor().actor.ui.parry_box.destroy(this.getActor().actor);
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
          this.getActor().actor.ui.parry_box.destroy(this.getActor().actor);

          this.getActor().actor.ui.body.anims.play(this.getActor().actor.ui.animations + '_hit');
          // this.getActor().actor.setVelocityX(-this.getActor().actor.speed, 0);
        },
        onBlock: function() {
          this.getActor().actor.ui.body.anims.play(this.getActor().actor.ui.animations + '_block');
        },
        onTakeParry: function() {
          this.getActor().actor.ui.parry_box.destroy(this.getActor().actor);
          this.getActor().actor.ui.body.anims.play(this.getActor().actor.ui.animations + '_parried');
        },
        onTakeParryStance: function() {
          // add a visual cue to let player know they can parry
        },
        onParry: function() {
          this.getActor().actor.ui.hit_box.destroy(this.getActor().actor);
          this.getActor().actor.ui.body.anims.play(this.getActor().actor.ui.animations + '_parry');
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
        onDie: function() {
          this.getActor().actor.ui.body.anims.play(this.getActor().actor.ui.animations + '_death');
        },
        getActor: function() { return this.actor },
      }
    })
    this.actor = actor;

  }
}

export function global(actor) {
  if (actor.health.value <= 0 && !actor.states.actions.is('dead')) {
    actor.states.actions.die();
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
  let parryableFrames = [2, 3]
  updateAttackState(actor, activeFrames, parryableFrames);
}

export function heavy_attacking(actor) {
  actor.setVelocityX(0, 0)
  let activeFrames = [5, 6]
  let parryableFrames = [2, 3, 4]
  updateAttackState(actor, activeFrames, parryableFrames);
}

export function taking_hit(actor) {
  if (!actor.ui.body.anims.isPlaying) {
    actor.states.actions.stand();
  }
}

export function taking_parry(actor) {
  if (!actor.ui.body.anims.isPlaying) {
    actor.states.actions.stand();
  }
}

export function taking_parry_stance(actor) {
  let other_actor = actor.states.actions.parry_target;

  if (shouldDodge(actor)) {
    actor.states.actions.dodge();
  }

  if (actor.input.LIGHT()) {
    actor.states.actions.parry();
    other_actor.states.actions.takeParry();
  }

  if (actor.input.HEAVY()) {
    actor.states.actions.parry();
    other_actor.states.actions.takeParry();
  }

  if (actor.input.LEFT()) {
    actor.states.actions.move();
  }

  if (actor.input.RIGHT()) {
    actor.states.actions.move();
  }

  // if other actor is no longer parryable, this actor returns to neutral stance
  if (!other_actor.ui.body.anims.isPlaying) {
    actor.states.actions.stand();
  }
}

export function parrying(actor) {
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
  if (actor.facingRight && actor.ui.body.body.velocity.x < 0) {
    actor.facingRight = false;
    actor.ui.flip(actor);
  } else if (!actor.facingRight && actor.ui.body.body.velocity.x > 0) {
    actor.facingRight = true;
    actor.ui.flip(actor);
  }

  if (!actor.ui.body.anims.isPlaying) {
    actor.states.actions.stand();
  }
}

export function dead(actor) {
  return;
}

// Helpers
let updateAttackState = function(actor, activeFrames, parryableFrames) {
  let currentFrame = actor.ui.body.anims.currentFrame.index;
  if (parryableFrames.indexOf(currentFrame) !== -1) {
    if (actor.ui.parry_box.box == null) {
      actor.ui.parry_box.create(actor);
    }
    actor.ui.parry_box.update(actor);
  }
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
