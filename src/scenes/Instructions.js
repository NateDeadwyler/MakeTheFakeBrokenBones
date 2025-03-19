class Instructions extends Phaser.Scene {
    constructor() {
        super('InstructionsScene')
    }

    create(){

        //console log
        console.log('InstructionsScenne')
            
        //Create a black background

        this.add.rectangle(400, 300, this.game.config.width, this.game.config.height, 0x313131)

        //Add character sprite as decoration

        this.add.sprite(150, 300, 'player', 2).setScale(10)

        //Add title text

        this.add.text(400, 100, 'Instructions', {
            fontFamily: 'Comic Sans MS',
            fontSize: '100px',
            color: '#FFFFFF'
        }).setOrigin(0.5)

        // Add One Player Text

        this.onePlayer = this.add.text(400, 500, "Use the left and right arrow keys to spin! \n Use the up arrow key to do a trick! \n Careful though! If you don't time your trick right,\n you'll crash!\n", {
            fontFamily: 'Comic Sans MS',
            fontSize: '20px',
            color: '#FFFFFF' 

        }).setOrigin(0.5)

        this.click = this.add.text(400, 550, "Click here to start", {
            fontFamily: 'Comic Sans MS',
            fontSize: '20px',
            color: '#AA0000' 

        }).setOrigin(0.5)

        this.click.setInteractive()
        this.click.on('pointerdown', (pointer) =>  {
            this.sound.play('yes')
            this.scene.start('PlayScene')

        
            // Your code here
        });


    }

    update(){
            
    }
}