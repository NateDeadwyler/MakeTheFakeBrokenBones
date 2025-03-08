class Play extends Phaser.Scene {
    constructor() {
        super('PlayScene')
    }

    preload() {
        // Load assets here
    }

    create() {
        // Initialize variables
        this.collision = false
        this.grounded = true
        this.gameSpeed = .75

        //Add Clouds
        this.clouds = this.add.tileSprite(400, 300, this.game.width, this.game.height, 'clouds').setOrigin(.5,1).setScale(6.3, 4)

        // Initialize game UI and Lives

        console.log('PlayScene')
        this.add.rectangle(0, 0,game.config.width, borderUISize * 2, 0x505050).setOrigin(0,0)
        this.add.line(this.game.width - this.game.width/5, 0, this.game.width - this.game.height/9, 0, this.game.width, borderUISize * 2, 0x00FFFF)

        // Width of each segment
        const segmentWidth = game.config.width / 3;

        // Add three even lines to divide the rectangle
        this.add.line(segmentWidth, 0, segmentWidth, 0, segmentWidth, borderUISize * 4, 0xFFFFFF)
        this.add.line(segmentWidth / 2, 0, segmentWidth /  2, 0, segmentWidth / 2, borderUISize * 4, 0xFFFFFF)

        // Add Bones to third segment
        this.add.image(segmentWidth * 2.1, borderUISize, 'bones').setScale(1.5)
        this.add.image(segmentWidth * 2.3, borderUISize, 'bones').setScale(1.5)
        this.add.image(segmentWidth * 2.7, borderUISize, 'bones').setScale(1.5)
        this.add.image(segmentWidth * 2.9, borderUISize, 'bones').setScale(1.5)
        this.add.image(segmentWidth * 2.5, borderUISize, 'bones').setScale(1.5)

        // Add player

        this.player = new Player(this, 200, 400, 'player')
        this.player.setScale(2)
        this.player.setBounce(.2)
        this.player.setCollideWorldBounds(true)

        // Text for Player 1's score

        this.scoreText = this.add.text(segmentWidth / 2, borderUISize, `Player 1 \n${this.player.score}`, { 
            fontFamily: 'Comic Sans MS',
            fontSize: '20px', 
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5, 0.5)

        // High Score Text
        this.add.text(segmentWidth * 1.5, borderUISize, `High Score \n${this.player.highScore}`, {
            fontFamily: 'Comic Sans MS',
            fontSize: '20px',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5, 0.5)
        

        

        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys()

        // Add ground
        
        this.ground = this.add.tileSprite(400, 700, this.game.width, this.game.height,'ground').setOrigin(.5,1).setScale(3.2)

        // Add an invisible physics body for collisions

        this.physicsGround = this.physics.add.staticSprite(0, 623, 'ground').setOrigin(.5,1).setScale(3.2)

        // Ensure the physics body matches the size of the TileSprite

        this.physicsGround.body.setSize(this.ground.displayWidth, this.ground.displayHeight);

        // Make sure the physics body doesn't move\

        this.physicsGround.body.immovable = true;
        this.physicsGround.body.allowGravity = false;

        // Optional: Adjust position if needed

        this.physicsGround.setPosition(this.ground.x + this.ground.width / 2, this.ground.y + this.ground.height / 2);

        //Add ramps
        this.ramp = new Ramp(this, 600, 432, 'ramp')

        // Add collision between player and ground

        this.physics.add.collider(this.player, this.physicsGround, () => {
            this.grounded = true 
            this.collision = false 
        });
        this.physics.add.overlap(this.player, this.ramp,() => {
            
            this.player.setVelocityY(-200)
            this.collision = true
            this.grounded = false
     
            
        })

        // Debug key 
        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)

        this.sound.play('motor', {
            volume: .5 , 
            loop: true,
            delay: 0,
        }) 
            

    
        

    }

    update() {
        //Step
        this.playerFSM.step()
        this.player.update()
        this.scoreText.text = (`Player 1 \n${this.player.score}`)

        if (this.player.anims.currentFrame.textureFrame === 5) {
            this.time.delayedCall(3000, () => {
            this.scene.restart()

                
            })
        }
        
          

        // Game loop logic here
        this.ground.tilePositionX+= this.gameSpeed
        this.clouds.tilePositionX+= this.gameSpeed / 6
        
        this.ramp.update()
        //
        
        
    }
}
