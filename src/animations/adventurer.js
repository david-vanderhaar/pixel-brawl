export function createAnimations(game) {
  let animations = [
    {
        key: 'adventurer_flourish',
        frames: game.anims.generateFrameNumbers('adventurer', { start: 0, end: 10, first: 0 }),
        frameRate: 12
    },
    {
        key: 'adventurer_block',
        frames: game.anims.generateFrameNumbers('adventurer', { start: 39, end: 40, first: 39 }),
        // repeat: -1,
        frameRate: 12
    },
    {
        key: 'adventurer_idle',
        frames: game.anims.generateFrameNumbers('adventurer', { start: 38, end: 41 }),
        repeat: -1,
        frameRate: 12
    },
    {
        key: 'adventurer_walk',
        frames: game.anims.generateFrameNumbers('adventurer_2', { start: 46, end: 51 }),
        repeat: -1,
        frameRate: 12
    },
    {
        key: 'adventurer_run',
        frames: game.anims.generateFrameNumbers('adventurer', { start: 8, end: 13 }),
        repeat: -1,
        frameRate: 12
    },
    {
        key: 'adventurer_dodge',
        frames: game.anims.generateFrameNumbers('adventurer', { start: 60, end: 63, first: 60 }),
        // repeat: 2,
        frameRate: 24
    },
    {
        key: 'adventurer_dodge_recovery',
        frames: [
          {key: 'adventurer', frame: 12},
          {key: 'adventurer', frame: 13},
          {key: 'adventurer', frame: 14},
          {key: 'adventurer', frame: 15},
          {key: 'adventurer', frame: 14},
          {key: 'adventurer', frame: 13},
          {key: 'adventurer', frame: 12},
        ],
        // repeat: 2,
        frameRate: 48
    },
    {
        key: 'adventurer_jump',
        frames: game.anims.generateFrameNumbers('adventurer', { start: 84, end: 87, first: 84 }),
        repeat: -1,
        frameRate: 12
    },
    {
        key: 'adventurer_heavy',
        // frames: game.anims.generateFrameNumbers('adventurer', { start: 32, end: 35, first: 32 }),
        frames: [
          {key: 'adventurer', frame: 32},
          {key: 'adventurer', frame: 32},
          {key: 'adventurer', frame: 32},
          {key: 'adventurer', frame: 33},
          {key: 'adventurer', frame: 33},
          {key: 'adventurer', frame: 34},
          {key: 'adventurer', frame: 34},
          {key: 'adventurer', frame: 35}
        ],
        // repeat: 1,
        frameRate: 12
    },
    {
        key: 'adventurer_light',
        frames: game.anims.generateFrameNumbers('adventurer', { start: 20, end: 23, first: 20 }),
        frames: [
          {key: 'adventurer', frame: 20},
          {key: 'adventurer', frame: 21},
          {key: 'adventurer', frame: 22},
          {key: 'adventurer', frame: 23},
          {key: 'adventurer', frame: 23},
          {key: 'adventurer', frame: 22},
        ],
        frameRate: 12
    },
    {
        key: 'adventurer_light_2',
        frames: game.anims.generateFrameNumbers('adventurer', { start: 64, end: 67, first: 67 }),
        // repeat: -1,
        frameRate: 12
    },
    {
        key: 'adventurer_hit',
        frames: game.anims.generateFrameNumbers('adventurer', { start: 88, end: 91, first: 88 }),
        // repeat: -1,
        frameRate: 12
    },
    {
        key: 'adventurer_death',
        frames: game.anims.generateFrameNumbers('adventurer', { start: 72, end: 83, first: 72 }),
        repeat: 0,
        frameRate: 12
    },

  ];
  return animations
}
