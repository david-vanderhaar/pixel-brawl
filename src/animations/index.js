import * as Default from './default';
import * as Longsword from './longsword';

export function initAnimations(game) {
  let animations = [
    ...Default.createAnimations(game),
    ...Longsword.createAnimations(game),
  ];
  animations.forEach((a) => {
      game.anims.create(a);
  });
}