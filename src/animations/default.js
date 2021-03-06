export function createAnimations(game) {
  let animations = [
    {
        key: 'default_flourish',
        frames: game.anims.generateFrameNumbers('sword_guy', { start: 0, end: 10, first: 0 }),
        frameRate: 12
    },
    {
        key: 'default_block',
        frames: game.anims.generateFrameNumbers('sword_guy', { start: 39, end: 40, first: 39 }),
        // repeat: -1,
        frameRate: 12
    },
    {
        key: 'default_idle',
        frames: game.anims.generateFrameNumbers('sword_guy', { start: 24, end: 27, first: 24 }),
        repeat: -1,
        frameRate: 12
    },
    {
        key: 'default_run',
        frames: game.anims.generateFrameNumbers('sword_guy', { start: 28, end: 31, first: 28 }),
        repeat: -1,
        frameRate: 12
    },
    {
        key: 'default_dodge',
        frames: game.anims.generateFrameNumbers('sword_guy', { start: 60, end: 63, first: 60 }),
        // repeat: 2,
        frameRate: 24
    },
    {
        key: 'default_dodge_recovery',
        frames: [
          {key: 'sword_guy', frame: 12},
          {key: 'sword_guy', frame: 13},
          {key: 'sword_guy', frame: 14},
          {key: 'sword_guy', frame: 15},
          {key: 'sword_guy', frame: 14},
          {key: 'sword_guy', frame: 13},
          {key: 'sword_guy', frame: 12},
        ],
        // repeat: 2,
        frameRate: 48
    },
    {
        key: 'default_roll',
        frames: game.anims.generateFrameNumbers('sword_guy', { start: 96, end: 103}),
        // repeat: -1,
        frameRate: 12
    },
    {
        key: 'default_jump',
        frames: game.anims.generateFrameNumbers('sword_guy', { start: 84, end: 87, first: 84 }),
        repeat: -1,
        frameRate: 12
    },
    {
        key: 'default_heavy',
        // frames: game.anims.generateFrameNumbers('sword_guy', { start: 32, end: 35, first: 32 }),
        frames: [
          {key: 'sword_guy', frame: 32},
          {key: 'sword_guy', frame: 32},
          {key: 'sword_guy', frame: 32},
          {key: 'sword_guy', frame: 33},
          {key: 'sword_guy', frame: 33},
          {key: 'sword_guy', frame: 34},
          {key: 'sword_guy', frame: 34},
          {key: 'sword_guy', frame: 35}
        ],
        // repeat: 1,
        frameRate: 12
    },
    {
        key: 'default_light',
        frames: game.anims.generateFrameNumbers('sword_guy', { start: 20, end: 23, first: 20 }),
        frames: [
          {key: 'sword_guy', frame: 20},
          {key: 'sword_guy', frame: 21},
          {key: 'sword_guy', frame: 22},
          {key: 'sword_guy', frame: 23},
          {key: 'sword_guy', frame: 23},
          {key: 'sword_guy', frame: 22},
        ],
        frameRate: 12
    },
    {
        key: 'default_light_2',
        frames: game.anims.generateFrameNumbers('sword_guy', { start: 64, end: 67, first: 67 }),
        // repeat: -1,
        frameRate: 12
    },
    {
      key: 'default_parried',
      frames: game.anims.generateFrameNumbers('sword_guy', { start: 88, end: 91, first: 88 }),
      frameRate: 10
    },
    {
      key: 'default_parry',
      frames: game.anims.generateFrameNumbers('sword_guy', { start: 39, end: 40, first: 39 }),
      frameRate: 12
    },
    {
        key: 'default_hit',
        frames: game.anims.generateFrameNumbers('sword_guy', { start: 88, end: 91, first: 88 }),
        frameRate: 12
    },
    {
        key: 'default_death',
        frames: game.anims.generateFrameNumbers('sword_guy', { start: 72, end: 83, first: 72 }),
        frameRate: 12
    },

  ];
  return animations
}
