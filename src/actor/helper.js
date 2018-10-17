export function shouldBlock(other_actor, actor) {
  return other_actor.states.lock.is('locked')
  && other_actor.facingRight != actor.facingRight
  && other_actor.states.aim.state == actor.states.aim.state;
}
