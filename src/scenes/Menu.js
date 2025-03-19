class Menu extends Phaser.Scene {
    constructor() {
        super('MenuScene')
    }

    create(){
    //Create some global variables
    this.sys.game.globals = {
        highScore: 1275630,
        score: 0,
        score2: 50000,
        score3: 100000,
    }
        
    //Create a black background
   
    this.add.rectangle(400, 300, this.game.config.width, this.game.config.height, 0x313131)
    
    //Add character sprite as decoration
   
    this.add.sprite(150, 300, 'player', 2).setScale(10)
   
    //Add title text
   
    this.add.text(400, 100, 'Broken Bonez', {
        fontFamily: 'font1',
        fontSize: '90px',
        color: '#FFFFFF'
    }).setOrigin(0.5)
    
    // Add One Player Text

    this.onePlayer = this.add.text(550, 400, 'One Player', {
        fontFamily: 'font1',
        fontSize: '50px',
        color: '#FFFFFF' 

    }).setOrigin(0.5)

    
    this.input.once('pointerdown', (pointer) =>  {
        console.log('Screen clicked!');
        this.sound.play('yes')
        this.scene.start('InstructionsScene')
        
    })
    }
}