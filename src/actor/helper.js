export function shouldBlock(other_actor, actor) {
  return other_actor.states.lock.is('locked')
  && other_actor.facingRight != actor.facingRight
  && other_actor.states.aim.state == actor.states.aim.state;
}

export function shouldDodge(actor) {
  return (actor.input.DODGE())
  && actor.states.lock.is('locked')
  && actor.ui.body.body.velocity.x !== 0;
}
