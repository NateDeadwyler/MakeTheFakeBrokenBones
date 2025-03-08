// Hero prefab
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction) {
        super(scene, x, y, texture, frame) // call Sprite parent class
        scene.add.existing(this)         // add Player to existing scene
        scene.physics.add.existing(this)   // add physics body to scene

        this.body.setSize(this.width, this.height)
        this.body.setCollideWorldBounds(true)

        // set custom driver properties 
        this.playerVelocity = 100    // in pixels
        this.angle = 0
        this.tempScore = 0
        this.score = this.tempScore.toLocaleString();
        this.tempHighScore = 1275630
        this.highScore = this.tempHighScore.toLocaleString()

        //Flip Variables
        this.halfF = false 
        this.halfB = false
        this.flipCount = +0 

        //Trick Variables
        this.superman = false
        this.tricked = false
        
        

        // initialize state machine managing player (initial state, possible states, state args[])
        scene.playerFSM = new StateMachine('driving', {
            driving: new DrivingState(),
            air: new AirState(),
            trick: new TrickState(),
            crash: new CrashState(),
        }, [scene, this])   // pass these as arguments to maintain scene/object context in the FSM
    }
}

// hero-specific state classes
class DrivingState extends State {
    enter(scene, player) {
        player.setVelocity(0)
        player.anims.stop()
        player.anims.play('drive')
        
    }

    execute(scene, player) {

        // check angle of player and move to crash state if angle is bad
        if (scene.player.angle < -45 || scene.player.angle > 45) {
            this.stateMachine.transition('crash')
        }
        else {
                scene.player.angle = 0 
            }
        
        
        
        
        // create a way that transition ramp overlap to air state
       
        if (scene.collision == true) {
            this.stateMachine.transition('air')
            scene.time.delayedCall(5000)
            console.log('transition')
        }
    }

    //Play motor sound

}

class AirState extends State {
    enter(scene, player) {

    }

    execute(scene, hero) {
        // use destructuring to make a local copy of the keyboard object
        const { left, right, up, down, space, shift } = scene.keys
         

        // Change Angle of Player based on Left and Right Key
        //Left
      
        if (scene.keys.left.isDown) {
            scene.player.angle = Math.round(scene.player.angle); 
            scene.player.angle -= 3
            scene.player.angle = Math.round(scene.player.angle);

        }
        //Right
        if (scene.keys.right.isDown) {
            scene.player.angle = Math.round(scene.player.angle);
            scene.player.angle += 3 
            scene.player.angle = Math.round(scene.player.angle); 
            
        }

//Flip Calculator

        if (scene.grounded == true) {  
            console.log(scene.player.flipCount)
            if (scene.player.flipCount == 0)   {
                scene.player.tempScore += 10
            }
            else{ 
                if (scene.player.tricked == true) {
                    scene.player.flipCount *= 2
                }
                scene.player.tempScore += 100*scene.player.flipCount**2 + 50 
            }
            scene.player.score = scene.player.tempScore.toLocaleString()
            
            console.log(scene.player.tempScore)  
            this.stateMachine.transition('driving')
            scene.player.flipCount = 0
        }

        // Temporary value for if the player flips halfway, either forward or backward
        if (scene.player.angle == 177){
        
            this.halfF = true
        }
        else if (scene.player.angle == -177){
             
            this.halfB = true
        }

        if (this.halfF == true && scene.player.angle == -30 ) {
            scene.player.flipCount++
            this.halfF = false
            this.halfB = false
            
        }

        if (this.halfB == true && scene.player.angle == 30) {
            scene.player.flipCount+= 1 
            this.halfF = false
            this.halfB = false
            
        }
 
        // Create Superman Trick
        if(!scene.player.superman == true)
        if (Phaser.Input.Keyboard.JustDown(up)) {
            scene.player.superman = true
            this.stateMachine.transition('trick')
            }
            

        }
    }

class TrickState extends State {
    enter(scene, player) {
        console.log('trick')
        scene.player.flipCount = 0
        scene.player.halfF = false
        scene.player.halfB = false

        // Create Superman Trick

        if (scene.player.superman == true) {
            console.log('superman')
            scene.player.anims.play('superman')
        }

    }

    execute(scene, player) {
        console.log(scene.player.flipCount)

        //Check if grounded while supermanning
        if (scene.grounded == true && scene.player.superman == true) {
            scene.player.anims.stop()
            console.log('crash') 
            this.stateMachine.transition('crash')
        }

        //Check if the superman animation is playing
        else if (scene.player.anims.currentFrame.textureFrame === 0) {
            console.log('no longer supermanning  ')
            scene.player.superman = false
            scene.player.tricked = true
            this.stateMachine.transition('air')
        }
         
            
    
        //Left
        if (scene.keys.left.isDown) {
            scene.player.angle = Math.round(scene.player.angle); 
            scene.player.angle -= 3
            scene.player.angle = Math.round(scene.player.angle);

        }
        //Right
        if (scene.keys.right.isDown) {
            scene.player.angle = Math.round(scene.player.angle);
            scene.player.angle += 3 
            scene.player.angle = Math.round(scene.player.angle); 
            
        }


        // Temporary value for if the player flips halfway, either forward or backward
        if (scene.player.angle == 177){
        
            this.halfF = true
        }
        else if (scene.player.angle == -177){
             
            this.halfB = true
        }

        if (this.halfF == true && scene.player.angle == -30 ) {
            scene.player.flipCount++
            this.halfF = false
            this.halfB = false
            
        }

        if (this.halfB == true && scene.player.angle == 30) {
            scene.player.flipCount+= 1 
            this.halfF = false
            this.halfB = false
            
        }
        
    }

}

class CrashState extends State {
    enter(scene,player) {
        scene.player.anims.stop()
        scene.player.angle = 0
        scene.player.anims.play('crash')
        scene.player.on('animationcomplete', () => {
        scene.player.setFrame(5)  
        })
        scene.gameSpeed = 0
        scene.ramp.speed = 0
    }
        
}