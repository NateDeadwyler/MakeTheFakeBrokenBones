class Ramp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction) {
        super(scene, x, y, texture, frame) // call Sprite parent class
        scene.add.existing(this)           // add Player to existing scene
        scene.physics.add.existing(this)   // add physics body to scene

        
        this.body.setCollideWorldBounds(false)
        this.body.offset.x = 15
        this.body.allowGravity = false
        this.speed = 2

    }
    update() {
        this.x -= this.speed

        if(this.x <= 0 - this.width) {
            this.x = game.config.width
        }

    }
}