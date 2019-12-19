
var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1600,
    height: 960,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
      
    }
};

var game = new Phaser.Game(config);

var Bullet = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

 
    function Bullet (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
        this.speed = 1;
        this.born = 0;
        this.max =0;
        this.direction = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.setSize(32, 32, true);
    },

    // Fires a bullet from the player to the reticle
    fire: function (shooter, target, max)
    {
        this.setPosition(shooter.x, shooter.y); // Initial position
        this.direction = Math.atan( (target.x-this.x) / (target.y-this.y));
        this.max = max;
        
        if (target.y >= this.y)
        {
            this.xSpeed = this.speed*Math.sin(this.direction);
            this.ySpeed = this.speed*Math.cos(this.direction);
        }
        else
        {
            this.xSpeed = -this.speed*Math.sin(this.direction);
            this.ySpeed = -this.speed*Math.cos(this.direction);
        }

        this.rotation = shooter.rotation; // angle bullet with shooters rotation
        this.born = 0; // Time since new bullet spawned
    },

    // Updates the position of the bullet each cycle
    update: function (time, delta)
    {
        this.x += this.xSpeed * delta;
        this.y += this.ySpeed * delta;
        this.born += delta;
        if (this.born > this.max)
        {
            this.setActive(false);
            this.setVisible(false);
            this.destroy();
        }
    }

});



/////////////////////////////////////////////////////////////////////

function preload ()
{
    // Load in images and sprites
    this.load.spritesheet('enemy', 'assets/images/monster2.png',
        { frameWidth: 88, frameHeight: 88 }
    ); 
     this.load.spritesheet('enemy1', 'assets/images/monster3.png',
         { frameWidth: 88, frameHeight: 88 }
     ); 
     this.load.spritesheet('enemy2', 'assets/images/monster4.png',
         { frameWidth: 88, frameHeight: 88 }
     ); 
     this.load.spritesheet('enemy3', 'assets/images/monster5.png',
         { frameWidth: 88, frameHeight: 88 }
     ); 
    
     this.load.spritesheet('enemy4', 'assets/images/monster6.png',
         { frameWidth: 88, frameHeight: 88 }
     ); 
    
     this.load.spritesheet('enemy5', 'assets/images/monster7.png',
         { frameWidth: 88, frameHeight: 88 }
     ); 
    
     this.load.spritesheet('enemy6', 'assets/images/monster8.png',
         { frameWidth: 88, frameHeight: 88 }
     ); 
     this.load.spritesheet('player', 'assets/images/airplane1.png',
        { frameWidth: 88, frameHeight: 88 }
    ); 
    this.load.spritesheet('boss', 'assets/images/spag.png',
        { frameWidth: 270, frameHeight: 270 }
    ); 
    this.load.spritesheet('boss1', 'assets/images/spag1.png',
        { frameWidth: 270, frameHeight: 270 }
    ); 
    this.load.spritesheet('boss2', 'assets/images/spag2.png',
        { frameWidth: 270, frameHeight: 270 }
    ); 
    this.load.spritesheet('boss3', 'assets/images/spag3.png',
        { frameWidth: 270, frameHeight: 270 }
    ); 
    this.load.spritesheet('boss4', 'assets/images/spag4.png',
        { frameWidth: 270, frameHeight: 270 }
    ); 
    this.load.spritesheet('boss5', 'assets/images/spag5.png',
        { frameWidth: 270, frameHeight: 270 }
    ); 
    this.load.spritesheet('boss6', 'assets/images/spag6.png',
        { frameWidth: 270, frameHeight: 270 }
    ); 
    this.load.image('bullet', 'assets/images/supermeatball.png');
    this.load.image('meteo', 'assets/images/meteor.png');
  
    this.load.image('background', 'assets/images/background1.png');


}

function create ()
{
    var background = this.add.image(2500, 2500, 'background')
    //0,3,4,1,5,6,2
    this.anims.create({
        key: 'xd',
        frames: [
            { key: 'enemy' },
            { key: 'enemy3' },
            { key: 'enemy4' },
            { key: 'enemy1' },
            { key: 'enemy5' },
            { key: 'enemy6' },
            { key: 'enemy2' },
            { key: 'enemy6' },
            { key: 'enemy5' },
            { key: 'enemy1' },
            { key: 'enemy4' },
            { key: 'enemy3' },
            { key: 'enemy', duration: 50 }
        ],
        frameRate: 36,
        repeat: -1
    });

    this.anims.create({
        key: 'bossm',
        frames: [
            { key: 'boss' },
            { key: 'boss1' },
            { key: 'boss2' },
            { key: 'boss3' },
            { key: 'boss4' },
            { key: 'boss5' },
            { key: 'boss6' },
            { key: 'boss5' },
            { key: 'boss4' },
            { key: 'boss3' },
            { key: 'boss2' },
            { key: 'boss1' },
            { key: 'boss', duration: 50 }
        ],
        frameRate: 12,
        repeat: -1
    });


    // Creates object for input with WASD kets
    moveKeys = this.input.keyboard.addKeys({
        'up': Phaser.Input.Keyboard.KeyCodes.W,
        'down': Phaser.Input.Keyboard.KeyCodes.S,
        'left': Phaser.Input.Keyboard.KeyCodes.A,
        'right': Phaser.Input.Keyboard.KeyCodes.D
    });

    
    this.input.keyboard.on('keydown_W', function (event) {
        player.setAccelerationY(-800);
    });
    this.input.keyboard.on('keydown_S', function (event) {
        player.setAccelerationY(800);
    });
    this.input.keyboard.on('keydown_A', function (event) {
        player.setAccelerationX(-800);
    });
    this.input.keyboard.on('keydown_D', function (event) {
        player.setAccelerationX(800);
    });

    this.input.keyboard.on('keyup_W', function (event) {
        if (moveKeys['down'].isUp)
            player.setAccelerationY(0);
    });
    this.input.keyboard.on('keyup_S', function (event) {
        if (moveKeys['up'].isUp)
            player.setAccelerationY(0);
    });
    this.input.keyboard.on('keyup_A', function (event) {
        if (moveKeys['right'].isUp)
            player.setAccelerationX(0);
    });
    this.input.keyboard.on('keyup_D', function (event) {
        if (moveKeys['left'].isUp)
            player.setAccelerationX(0);
    });

    // Fires bullet from player on left click of mouse
    this.input.on('pointerdown', function (pointer, time, lastFired) {
        if (player.active === false)
            return;

        // Get bullet from bullets group
        var bullet = playerBullets.get().setActive(true).setVisible(true);

        if (bullet)
        {
            bullet.fire(player, reticle,1250);
            this.physics.add.collider(enem, bullet, enemyHitCallback);
            this.physics.add.collider(enemy, bullet, enemyHitCallback);
            this.physics.add.collider(meteors, bullet);
        }
    }, this);

   
    game.canvas.addEventListener('mousedown', function () {
        game.input.mouse.requestPointerLock();
    });

    // Exit pointer lock when Q or escape (by default) is pressed.
    this.input.keyboard.on('keydown_Q', function (event) {
        if (game.input.mouse.locked)
            game.input.mouse.releasePointerLock();
    }, 0, this);

    // Move reticle upon locked pointer move
    this.input.on('pointermove', function (pointer) {
        if (this.input.mouse.locked)
        {
            reticle.x += pointer.movementX;
            reticle.y += pointer.movementY;
        }
    }, this);
   

    this.physics.world.setBounds(0, 0, 5000, 5000);
    
    // Add 2 groups for Bullet objects
    
    playerBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
    enemyBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
   
   // Add background player, enemy, reticle, healthpoint sprites
    
    player = this.physics.add.sprite(2500, 4500, 'player');
   
    enemy = this.physics.add.sprite(2500, 500, 'boss').play('bossm');
 
    reticle = this.physics.add.sprite(2500, 4400, 'x');

    background.setOrigin(0.5, 0.5).setDisplaySize(5000, 5000);
    player.setOrigin(0.5, 0.5).setDisplaySize(132, 132).setCollideWorldBounds(true).setDrag(500, 500);

    player.setAngle(10);
    enemy.setOrigin(0.5, 0.5).setDisplaySize(300, 300).setCollideWorldBounds(true);
    reticle.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true);
    
    player.health = 10;
    enemy.health = 30;
    enemy.lastFired = 0;


    enem = this.physics.add.staticGroup({
        key: 'enemy',
        frameQuantity: 50
    });

    Phaser.Actions.RandomRectangle(enem.getChildren(),  new Phaser.Geom.Rectangle(0, 0, 4800, 2500));
    enem.getChildren().forEach(function(enemyS) {
        enemyS.setOrigin(0.5, 0.5).setDisplaySize(132, 132).setCollideWorldBounds(true);
        enemyS.health = 3;
        enemyS.lastFired = 0;
      }, this);
   
   
    group = this.physics.add.staticGroup({
        key: 'meteo',
        frameQuantity: 70
    });
    
    Phaser.Actions.PlaceOnRectangle(group.getChildren(), new Phaser.Geom.Rectangle(150, 150, 4650, 4650));
    


    meteors = this.physics.add.group({
        key: 'meteo',
        frameQuantity: 20,
        collideWorldBounds: true,
        bounceX: 1,
        bounceY: 1,
        velocityX: 420,
        velocityY: 420
    });   
    Phaser.Actions.RandomRectangle(meteors.getChildren(), this.physics.world.bounds);

    

fireEnable=false;    

this.physics.add.collider(meteors);
this.physics.add.collider(meteors, group);
this.physics.add.collider(meteors, player, playerHitCallback);
this.physics.add.collider(enem, player);
this.physics.add.collider(player, group);
player.setVelocity(500, 500).setBounce(5, 5).setCollideWorldBounds(true).setGravityY(0);
group.refresh();
enem.refresh();
enem.playAnimation('xd')
maxVelo = 500;

this.cameras.main.zoom = 0.4;
this.cameras.main.startFollow(player);

info = this.add.text(0, 0, '', { font: '128px Arial', fill: '#ffffff' });
infoBoss = this.add.text(0, 0, '', { font: '128px Arial', fill: '#ffffff' });
gameOverText = this.add.text(-2000, -2000, 'GAME OVER', { fontSize: '250px', fill: '#fff' });
victoryText = this.add.text(-2000, -2000, 'Victory', { fontSize: '250px', fill: '#fff' });


}

function enemyHitCallback(enemyHit, bulletHit)
{
    // Reduce health of enemy
    if (bulletHit.active === true && enemyHit.active === true)
    {
        enemyHit.health = enemyHit.health - 1;
        console.log("Enemy hp: ", enemyHit.health);

        // Kill enemy if health <= 0
        if (enemyHit.health <= 0)
        {
           // gameOverText = this.add.text(player.x, player.y, 'VICTORY', { fontSize: '250px', fill: '#fff' });
           victoryText.x = player.x-500 ;
           victoryText.y = player.y;
            enemyHit.setActive(false).setVisible(false);
            maxVelo=0;
            fireEnable=false;
            
            this.pause();
        }
        // Destroy bullet
        bulletHit.destroy();
    }
}

function playerHitCallback(playerHit, bulletHit)
{
    // Reduce health of player
    if (bulletHit.active === true && playerHit.active === true)
    {
        playerHit.health = playerHit.health - 1;
        console.log("Player hp: ", playerHit.health);

        // Kill hp sprites and kill player if health <= 0
        if (player.health <= 0)
        {
           // let gameOverText = this.add.text(playerHit.x, playerHit.y, 'GAME OVER', { fontSize: '250px', fill: '#fff' });
           gameOverText.x = player.x-500 ;
           gameOverText.y = player.y;
            playerHit.setActive(false).setVisible(false);
            maxVelo=0;
            this.pause();
        }
        
     
        bulletHit.setActive(false).setVisible(false);
        bulletHit.destroy();
        // Destroy bullet
      
    }
}

function enemyFire(enemy, player, time, gameObject,fireTime, range)
{
    if (enemy.active === false)
    {
        return;
    }

    if(fireTime < 500)
    fireTime =Math.floor(Math.random() * (4000 - 3000)) + 3000
    if(fireEnable==true)
    if ((time - enemy.lastFired) >  fireTime)
    {
        enemy.lastFired = time;

        // Get bullet from bullets group
        var bullet = enemyBullets.get().setActive(true).setVisible(true);

        if (bullet)
        {
            bullet.fire(enemy, player,range);
            // Add collider between bullet and player
            gameObject.physics.add.collider(player, bullet, playerHitCallback);
        }
    }
}

// Ensures sprite speed doesnt exceed maxVelocity while update is called
function constrainVelocity(sprite, maxVelocity)
{
    if (!sprite || !sprite.body)
      return;

    var angle, currVelocitySqr, vx, vy;
    vx = sprite.body.velocity.x;
    vy = sprite.body.velocity.y;
    currVelocitySqr = vx * vx + vy * vy;

    if (currVelocitySqr > maxVelocity * maxVelocity)
    {
        angle = Math.atan2(vy, vx);
        vx = Math.cos(angle) * maxVelocity;
        vy = Math.sin(angle) * maxVelocity;
        sprite.body.velocity.x = vx;
        sprite.body.velocity.y = vy;
    }
}


function update (time, delta)
{
    // Rotates player to face towards reticle
    player.rotation = Phaser.Math.Angle.Between(player.x, player.y, reticle.x, reticle.y);

    // Rotates enemy to face towards player
    enemy.rotation = Phaser.Math.Angle.Between(enemy.x, enemy.y, player.x, player.y);
   // enemy1.rotation = Phaser.Math.Angle.Between(enemy.x, enemy.y, player.x, player.y);
    

    //Make reticle move with player
    reticle.body.velocity.x = player.body.velocity.x;
    reticle.body.velocity.y = player.body.velocity.y;

    // Constrain velocity of player
    constrainVelocity(player, maxVelo);
    
    // Constrain position of constrainReticle
  //  constrainReticle(reticle);
  enem.getChildren().forEach(function(enemy) {
    enemyFire(enemy, player, time, this,1,1000);
    enemy.rotation = Phaser.Math.Angle.Between(enemy.x, enemy.y, player.x, player.y);
  }, this);
  info.setText('Zycie:' + player.health);
  infoBoss.setText('Boss:' + enemy.health);
  info.x = player.x - 1800;
  info.y = player.y - 1000;
  infoBoss.x = player.x + 1000;
  infoBoss.y = player.y -1000;
    // Make enemy fire
    enemyFire(enemy, player, time, this, 500,2000);
    
  
}
