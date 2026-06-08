// Nate Deadwyler
// Created 2/24/25
// Make the Fake: Broken Bonez from Regular Show
// A 2D game where you do tricks to get points and try not to break your bonez!

// The game usis audio, a particle emitter, a state machine, tilesprites, a spritesheet, bitmap text/custom font, physics, colliders and more!
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: 0x87CEEB,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    },
    scene: [Load, Menu, Instructions, Play, Score]
}

const game = new Phaser.Game(config)

let cursors
let { height, width } = game.config
console.log(height, width)

//Border Size
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3


// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT, keySPACE

//
