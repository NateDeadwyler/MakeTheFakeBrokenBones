class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }
    
    preload() {
    //Load Visuals
        // load images/tile sprites
        this.load.image('ground', './assets/Ground.png ');
        this.load.spritesheet('player', './assets/MotorGuy.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 5});
        this.load.image('ramp', './assets/ramp.png');
        this.load.image('bones', './assets/Bones.png')
        this.load.image('clouds', './assets/clouds.png')
      
        // load spritesheet
    
       

        //load audio
        this.load.audio('motor', './assets/motor.mp3')
       

    }

    create() {
        //ANIMATIONS GALORE!
        this.anims.create({
            key: 'drive',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 1, }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'superman',
            frameRate:7,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('player', {
                frames: [1,2,3,4,4,4,4,4,4,4,4,4,4,4,4,3,2,0]}),
            
        })

        this.anims.create({
            key: 'crash',
            frameRate: 10,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('player', {
                frames: [2,2,2,2,5]}),

        })
    
        
        console.log('LoadScene')
        this.scene.start('PlayScene')
    
    }
    update() {
        this.scene.start('PlayScene')
    }
}