
class Score extends Phaser.Scene {
    constructor() {
        super('ScoreScene')
    }

    
    

    create(data) {
        let score

    console.log('init', data);
    this.score = data.score;
        //Get highScore from MenuScene
        console.log('init', data);
        this.score = data.score;

        let highscore = this.sys.game.globals.highScore
        
        
        //Create a black background
        this.add.rectangle(400,300, this.game.config.width, this.game.config.height, 0x000000)
        //Add character sprite as decoration
        this.add.sprite(150, 300, 'player', 2).setScale(5)
        //Add scoreTitle text
        this.add.text(400, 100, 'High Scores', {
            fontFamily: 'font1',
            fontSize: '90px',
            color: '#FFFFFF',
        }).setOrigin(0.5)

        //Sort high scores into dictionary with 3 letter names
        let scoreList = [highscore, this.score, this.sys.game.globals.score2, this.sys.game.globals.score3]
        scoreList.sort((a, b) => b - a)
        
        console.log(scoreList)

        //Add high score text based on scoreList
        this.add.text(400, 300, `1. ${scoreList[0]} \n2. ${scoreList[1]} \n3. ${scoreList[2]} \n4. ${scoreList[3]}`, {
            fontFamily: 'font1',
            fontSize: '50px',
            color: '#FFFFFF',
        }).setOrigin(0.5)

        //Add return to menu text
        this.add.text(400, 500, 'Click to return to Menu', {
            fontFamily: 'font1',
            fontSize: '50px',
            color: '#FFFFFF',
        }).setOrigin(0.5)
        
        //Return to menu on click
        this.input.once('pointerdown', (pointer) =>  {
            console.log('Screen clicked!');
            this.sound.play('yes')
            this.scene.start('MenuScene')
            
        })
    }
}