var game = new Phaser.Game(800, 600, Phaser.AUTO, "game", {preload:preload, update:update, create:create});

function preload() 
{
	game.load.spritesheet('wizard', 'sprites/wizard.png', 40, 60);
}

function create()
{
	game.add.sprite(0, 0, 'wizard');
}
function update()
{
	
}