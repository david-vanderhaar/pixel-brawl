import * as actionFSM from './state-machines/actionFSM';
import * as aimFSM from './state-machines/aimFSM';
import * as lockFSM from './state-machines/lockFSM';
import * as actorInput from './actor/input';

export function createActor(game, x, y) {
  let new_actor = game.add.group();
  new_actor.x = x;
  new_actor.y = y;
  new_actor.states = {
    actions: new actionFSM.FSM,
    aim: new aimFSM.FSM,
    lock: new lockFSM.FSM,
  }

  // controls
  new_actor.input = actorInput.createInput(game);

  //end controls
  // ui
  new_actor.hit_box = new_actor.create(x, y, 'body')
  new_actor.hit_box.name = 'hit_box';
  new_actor.aim_up = new_actor.create(x, y - 42, 'direction')
  new_actor.aim_up.name = 'aim_up';
  new_actor.aim_down = new_actor.create(x, y + 42, 'direction')
  new_actor.aim_down.name = 'aim_down';
  new_actor.aim_front = new_actor.create(x + 42, y, 'direction')
  new_actor.aim_front.name = 'aim_front';
  new_actor.ui_directions = [
    new_actor.aim_up,
    new_actor.aim_down,
    new_actor.aim_front,
  ];
  new_actor.ui_directions.forEach((element) => {
    element.setScale(.6);
    element.alpha = 0;
  });
  new_actor.ui_tweens = [];
  // end ui
  // update
  new_actor.update = (game) => {
    new_actor.input.update(new_actor);

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
