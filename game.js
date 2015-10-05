var game = new Phaser.Game(800, 600, Phaser.AUTO, "game", {preload:preload, update:update, create:create});

var wizard;
var plasma;
var casting;

function preload() 
{
	game.load.spritesheet('wizard', 'sprites/wiz1.png', 43, 49);
	game.load.spritesheet('ground', 'sprites/Ground&Stone/Ground&Stone/Stone/ground5.png');
	game.load.spritesheet('dungeon', 'sprites/dungeon.jpg');
	game.load.spritesheet('plasma', 'sprites/plasma.png', 32, 28);
	game.load.spritesheet('zombie', 'sprites/zombie.png', 73, 77, 20);
}

function create()
{
	game.physics.enable(Phaser.Physics.ARCADE);
	game.add.sprite(0,0,'dungeon');
	cursors = game.input.keyboard.createCursorKeys();
	plasmas = game.add.group();
	zombies = game.add.group();
	wizard = new Wizard(game, game.world.centerX, 550);
	stones = game.add.group();
	
	zombies.enableBody = true;
	stones.enableBody = true;
	for(var i = 0; i < 10; i++){
		var ground = stones.create(i * 125, 550, 'ground');
		ground.scale.setTo(1, 0.5);
		ground.body.immovable = true;
	}

	game.time.events.loop(3000, createZombie, this);
	//zombie = new Zombie(game, 50, 400);
}

function createZombie () {
	var random = Math.floor(Math.random() * 2);
	if(random == 0) {
		zombie = new Zombie(game, game.world.width - 50, 400);
		zombies.add(zombie);
	}
	else {
	 	zombie = new Zombie(game, 50, 400);
	 	zombies.add(zombie);
	}
}

function update()
{
	game.physics.arcade.collide(wizard, stones);
	game.physics.arcade.collide(zombies, stones);
	game.physics.arcade.overlap(zombies, plasmas, die, null);
	plasmas.forEach(function(plasma) {
		plasma.animations.play('plasma');
	});
}

function die(zombie, plasma) {
    zombie.faint(); 
    plasma.destroy();
}

