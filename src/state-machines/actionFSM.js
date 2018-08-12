let StateMachine =  require('javascript-state-machine');
// let visualize = require('javascript-state-machine/lib/visualize');

export class FSM extends StateMachine {
  constructor(actor) {
    super({
      init: 'standing',
      transitions: [
        { name: 'move',  from: ['standing', 'light_attacking', 'heavy_attacking'], to: 'moving'    },
        { name: 'stand', from: ['moving', 'light_attacking', 'heavy_attacking'],   to: 'standing'  },
        { name: 'light', from: ['moving', 'standing'],   to: 'light_attacking'  },
        { name: 'heavy', from: ['moving', 'standing'],   to: 'heavy_attacking'  },
      ],
      methods: {
        onMove:  function() { 
          console.log('I began moving');
          this.getActor().actor.ui.body.anims.play('run');
        },
        onStand: function() {
          console.log('I began standing');
          this.getActor().actor.ui.body.anims.play('idle');
        },
        onLight: function() {
          console.log('I began a light');
          this.getActor().actor.ui.body.anims.play('light');
        },
        onHeavy: function() {
          console.log('I began a heavy');
          this.getActor().actor.ui.body.anims.play('heavy');
        },
        getActor: function() { return this.actor },
      }
    })
    this.actor = actor;

  }
}

export function moving(actor) {

  if (actor.input.keyboard.light.isDown || actor.input.controller.light > 0) {
    actor.states.actions.light();
  } else if (actor.input.keyboard.heavy.isDown || actor.input.controller.heavy > 0) {
    actor.states.actions.heavy();
  } else if (actor.input.keyboard.left.isDown || actor.input.controller.left < 0) {
    Phaser.Actions.IncX(actor.getChildren(), -actor.speed);
    if (actor.facingRight) { actor.facingRight = false; actor.ui.flip(actor);}
  } else if (actor.input.keyboard.right.isDown || actor.input.controller.right > 0) {
    if (!actor.facingRight) { actor.facingRight = true; actor.ui.flip(actor);}
    Phaser.Actions.IncX(actor.getChildren(), actor.speed);
  }  else {
    actor.states.actions.stand();
  }
}

export function standing(actor) {

  if (actor.input.keyboard.light.isDown || actor.input.controller.light > 0) {
    actor.states.actions.light();
  }

  if (actor.input.keyboard.heavy.isDown || actor.input.controller.heavy > 0) {
    actor.states.actions.heavy();
  }

  if (actor.input.keyboard.left.isDown || actor.input.controller.left < 0) {
    actor.states.actions.move();
  }
  
  if (actor.input.keyboard.right.isDown || actor.input.controller.right > 0) {
    actor.states.actions.move();
  }
}

export function light_attacking(actor) {
  console.log(actor.ui.body.anims)
  if (!actor.ui.body.anims.isPlaying) {
    actor.states.actions.stand();
  }
}

export function heavy_attacking(actor) {
  if (!actor.ui.body.anims.isPlaying) {
    actor.states.actions.stand();
  }
}
