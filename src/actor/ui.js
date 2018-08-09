import * as Animations from './animations';

export function createUI(game, actor, x, y) {
    let ui = {
        constants: {
            scaleDefault: .6,
            scaleActive: .8,
            alphaDefault: .5,
            alphaActive: 1,
        },
        hit_box: actor.create(x, y, 'body'),
        directions: {
            aim_up: actor.create(x, y - 42, 'direction'),
            aim_down: actor.create(x, y + 42, 'direction'),
            aim_front: actor.create(x + 42, y, 'direction'),
        },
        animations: Animations.createAnimations(game),
        tweens: [],
        init: (actor) => {
            actor.getChildren().forEach(element => {
                element.scaleX = 2;
                element.scaleY = 2;
              });
            actor.ui.hit_box.setOrigin(.45, .65);
            Animations.initAnimations(game, actor.ui.animations);
            actor.ui.hit_box.anims.play('idle');
            for (let element in actor.ui.directions) {
                actor.ui.directions[element].setScale(actor.ui.constants.scale);
                actor.ui.directions[element].alpha = 0;
            };
        },
        update: (actor) => {
            actor.x = actor.ui.hit_box.x;
            actor.y = actor.ui.hit_box.y;
        },
        aimUISwitch: (game, dir, actor) => {
            let dirs = ['up', 'down', 'front'];
            actor.ui.tweens.push(
              game.tweens.add({
                targets: actor.ui.directions['aim_' + dir],
                scaleX: actor.ui.constants.scaleActive,
                scaleY: actor.ui.constants.scaleActive,
                alpha: actor.ui.constants.alphaActive,
                duration: 1000,
                ease: 'Elastic',
                easeParams: [ 1.5, 0.5 ],
                delay: 0
              })
            );
          
            dirs.filter((d) => d != dir).forEach((d) => {
              actor.ui.tweens.push(
                game.tweens.add({
                  targets: actor.ui.directions['aim_' + d],
                  scaleX: actor.ui.constants.scaleDefault,
                  scaleY: actor.ui.constants.scaleDefault,
                  alpha: actor.ui.constants.alphaDefault,
                  duration: 1000,
                  ease: 'Elastic',
                  easeParams: [ 1.5, 0.5 ],
                  delay: 0,
                })
              );
            });
          }
    };

    return ui
}