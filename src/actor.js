import * as actionFSM from './state-machines/actionFSM';
import * as aimFSM from './state-machines/aimFSM';
import * as lockFSM from './state-machines/lockFSM';
import * as actorInput from './actor/input';
import * as actorUI from './actor/ui';

export function createActor(game, x, y) {
  let new_actor = game.physics.add.group();
  new_actor.x = x;
  new_actor.y = y;
  new_actor.facingRight = true;
  new_actor.states = {
    actions: new actionFSM.FSM,
    aim: new aimFSM.FSM,
    lock: new lockFSM.FSM,
  }

  // controls
  new_actor.input = actorInput.createInput(game);
  //end controls
  // ui
  new_actor.ui = actorUI.createUI(game, new_actor, new_actor.x, new_actor.y);
  new_actor.ui.init(new_actor);
  // end ui
  // update
  new_actor.update = (game) => {
    new_actor.input.update(new_actor);
    new_actor.ui.update(new_actor);

    switch (new_actor.states.lock.state) {
      case 'locked':
        lockFSM.locked(new_actor);
        break;
      case 'unlocked':
        lockFSM.unlocked(new_actor);
        if (!new_actor.states.aim.is('up')) { new_actor.states.aim.aimUp(); }
        break;
    }

    switch (new_actor.states.actions.state) {
      case 'standing':
        actionFSM.standing(new_actor);
        break;
      case 'moving':
        actionFSM.moving(new_actor);
        break;
    }
    
    if (new_actor.states.lock.is('locked')) {
      switch (new_actor.states.aim.state) {
        case 'up':
          aimFSM.aimingUp(game, 'up', new_actor);
          break;
        case 'down':
          aimFSM.aimingDown(game, 'down', new_actor);
          break;
        case 'front':
          aimFSM.aimingFront(game, 'front', new_actor);
          break;
      }
    }

  }
  //end update
  return new_actor;
};
