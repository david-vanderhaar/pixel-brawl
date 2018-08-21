export function createAnimations(game) {
    let animations = [
        {
            key: 'longsword_flourish',
            frames: game.anims.generateFrameNumbers('sword_guy', { start: 0, end: 10, first: 0 }),
            frameRate: 20
        },
        {
            key: 'longsword_hit',
            frames: game.anims.generateFrameNumbers('sword_guy', { start: 88, end: 91, first: 88 }),
            repeat: -1,
            frameRate: 12
        },
        {
            key: 'longsword_idle',
            frames: game.anims.generateFrameNumbers('longsword_idle'),
            repeat: -1,
            frameRate: 12
        },
        {
            key: 'longsword_run',
            frames: game.anims.generateFrameNumbers('longsword_walk'),
            repeat: -1,
            frameRate: 12
        },
        {
            key: 'longsword_jump',
            frames: game.anims.generateFrameNumbers('sword_guy', { start: 84, end: 87, first: 84 }),
            repeat: -1,
            frameRate: 12
        },
        {
            key: 'longsword_heavy',
            frames: game.anims.generateFrameNumbers('longsword_mittlehau'),
                // repeat: 1,
                frameRate: 12
        },
        {
            key: 'longsword_light',
            frames: game.anims.generateFrameNumbers('longsword_zornhau'),
            // repeat: -1,
            frameRate: 12
        },
        {
            key: 'longsword_light_2',
            frames: game.anims.generateFrameNumbers('sword_guy', { start: 64, end: 67, first: 67 }),
            // repeat: -1,
            frameRate: 12
        },
        {
            key: 'longsword_death',
            frames: game.anims.generateFrameNumbers('sword_guy', { start: 72, end: 83, first: 72 }),
            repeat: 0,
            frameRate: 12
        },

    ];
    return animations;
}