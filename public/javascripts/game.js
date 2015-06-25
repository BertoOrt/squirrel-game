window.onload = function() {
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
  function preload () {
  game.load.spritesheet('llama', 'images/llama1.png', 79, 85);
  game.load.image('diamond', 'images/diamond.png');
  game.load.image('sky', 'images/sky2.png');
  game.load.image('platform', 'images/platform.png');
  game.load.image('heart', 'images/heart.png');

  }
  var heartStatus = "empty";
  var scoreText;
  var platform;
  function create () {
    game.add.sprite(0,0,'sky').scale.setTo(1.5,1.5);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height-20, 'platform');
    ground.scale.setTo(2, 1);
    ground.body.immovable = true;
    var ledge = platforms.create(550, 450, 'platform');
    ledge.scale.setTo(0.5,0.5);
    ledge.body.immovable = true;
    ledge = platforms.create(20, 300, 'platform');
    ledge.scale.setTo(.1,0.1);
    ledge.body.immovable = true;
    ledge = platforms.create(500, 100, 'platform');
    ledge.scale.setTo(.4,0.3);
    ledge.body.immovable = true;
    game.physics.enable(platforms, Phaser.Physics.ARCADE);
    player = game.add.sprite(10, game.world.height -200, 'llama');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [0, 1, 2, 3], 10, true);
    cursors = game.input.keyboard.createCursorKeys();
    hearts = game.add.group();
    hearts.enableBody = true;
    var heart = hearts.create(600, 0, 'heart');
    heart.body.gravity.y = 4;
    scoreText = game.add.text(16, 16, 'Heart Status: ' + heartStatus, { fontSize: '20px', fill: '#000' });
  }
  function update() {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(hearts, platforms);
    game.physics.arcade.overlap(player, hearts, collectHeart, null, this);
    player.body.velocity.x = 0;
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -300;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 300;
        player.animations.play('right');
    }
    else
    {
        player.animations.stop();
        player.frame = 0;
    }
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }
  }
  function collectHeart (player, heart) {

    heart.kill();
    heartStatus = "happy :)";
    scoreText.text = 'Heart Status: ' + heartStatus;
  }
};
