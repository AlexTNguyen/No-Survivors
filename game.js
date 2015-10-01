var game = new Phaser.Game(800, 600, Phaser.AUTO, "game", {preload:preload, update:update, create:create});

var wizard 
var plasma
var casting

function preload() 
{
	game.load.spritesheet('wizard', 'sprites/wiz1.png', 43, 50);
	game.load.spritesheet('ground', 'sprites/Ground&Stone/Ground&Stone/Stone/ground5.png');
	game.load.spritesheet('sky', 'sprites/sky.png');
	game.load.spritesheet('plasma', 'sprites/plasma.png', 32, 28);
}

function create()
{
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.add.sprite(0,0,'sky');
	cursors = game.input.keyboard.createCursorKeys();
		plasmas = game.add.group();
	wizard = new Wizard(game, game.world.centerX, 550);
	stones = game.add.group();

	stones.enableBody = true;
	for(var i = 0; i < 10; i++){
		var ground = stones.create(i * 125, 550, 'ground');
		ground.scale.setTo(1, 0.5);
		ground.body.immovable = true;
	}
}
function update()
{
	game.physics.arcade.collide(wizard, stones);
	plasmas.forEach(function(plasma) {
		plasma.animations.play('plasma');
	});
}