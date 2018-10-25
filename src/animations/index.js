import * as Default from './default';
import * as Adventurer from './adventurer';
import * as Longsword from './longsword';

export function initAnimations(game) {
  let animations = [
    ...Default.createAnimations(game),
    ...Adventurer.createAnimations(game),
    ...Longsword.createAnimations(game),
  ];
  animations.forEach((a) => {
      game.anims.create(a);
  });
}
