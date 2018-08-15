import * as Animations from './animations';

export function createUI(game, actor, x, y) {
    let ui = {
        constants: {
            scaleDefault: .6,
            scaleActive: .8,
            alphaDefault: .5,
            alphaActive: 1,
        },
        hit_box: {
            box: null,
            create: (actor) => {
                actor.ui.hit_box.box = game.physics.add.sprite('body');
                actor.ui.hit_box.box.scaleX = actor.reach;

                // add checkHit function
                game.physics.add.overlap(game.dummy, actor.ui.hit_box.box, () => {console.log('over')});

            },
            update: (actor) => {
                actor.ui.hit_box.box.x = actor.ui.body.body.x + (64 * actor.facingRight);
                actor.ui.hit_box.box.y = actor.ui.body.body.y + 32;
            },
        },
        body: actor.create(x, y, 'body'),
        directions: {
            aim_up: actor.create(x, y - 16, 'direction'),
            aim_left: actor.create(x - 42, y + 54, 'direction'),
            aim_right: actor.create(x + 42, y + 54, 'direction'),
        },
        animations: Animations.createAnimations(game),
        tweens: [],
        init: (actor) => {
            Animations.initAnimations(game, actor.ui.animations);
            actor.ui.body.anims.play('idle');
            actor.ui.body.body.transform.displayOriginX = 16;
            actor.ui.body.body.transform.displayOriginY = 8;
            actor.getChildren().forEach(element => {
                element.setDisplaySize(128, 128)
            });
            for (let element in actor.ui.directions) {
                actor.ui.directions[element].setScale(actor.ui.constants.scale);
                actor.ui.directions[element].alpha = 0;
            };
            
        },
        update: (actor) => {

        },
        flip: (actor) => {
            if (actor.facingRight) {
                actor.ui.body.body.transform.displayOriginX = 16;
                actor.getChildren().forEach(element => {
                    element.setDisplaySize(128, 128)
                });
            } else {
                actor.ui.body.body.transform.displayOriginX = -16;
                actor.getChildren().forEach(element => {
                    element.setDisplaySize(-128, 128)
                });
            }

            for (let element in actor.ui.directions) {
                actor.ui.directions[element].setScale(actor.ui.constants.scale);
                actor.ui.directions[element].alpha = 0;
            };
        },
        aimUISwitch: (game, dir, actor) => {
            let dirs = ['up', 'left', 'right'];
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