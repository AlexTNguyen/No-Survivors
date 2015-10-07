var game = new Phaser.Game(800, 600, Phaser.AUTO, "game", {preload:preload, update:update, create:create});

var wizard;
var plasma;
var casting;
var style = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
var psequence = "ASD";
var fsequence = "QWER";
var input = "";
var pseq = "";
var fseq = "";
var inputIndex = 0;
var inputIndex2 = 0;
var seqlength = 3;
var fseqlength = 4;
function preload() 
{
	game.load.spritesheet('wizard', 'sprites/wiz1.png', 43, 49);
	game.load.spritesheet('ground', 'sprites/Ground&Stone/Ground&Stone/Stone/ground5.png');
	game.load.spritesheet('dungeon', 'sprites/dungeon.jpg');
	game.load.spritesheet('plasma', 'sprites/plasma.png', 32, 28);
	game.load.spritesheet('zombie', 'sprites/zombie.png', 73, 77, 20);
	game.load.spritesheet('fire', 'sprites/fireballs.png', 23, 30);
}

function create()
{
	game.physics.enable(Phaser.Physics.ARCADE);
	game.add.sprite(0,0,'dungeon');
	cursors = game.input.keyboard.createCursorKeys();
	plasmas = game.add.group();
	zombies = game.add.group();
	fireballs = game.add.group();
	wizard = new Wizard(game, game.world.centerX, 550);
	stones = game.add.group();
	
	zombies.enableBody = true;
	stones.enableBody = true;
	for(var i = 0; i < 10; i++){
		var ground = stones.create(i * 125, 550, 'ground');
		ground.scale.setTo(1, 0.5);
		ground.body.immovable = true;
	}

	text = game.add.text(300, 560, "Plasma Sequence: " + psequence, style);
	text.addColor('#ff0000', 17);
	text2 = game.add.text(300, 575, "Firestorm Sequence: " + fsequence, style);
	text2.addColor('#ff0000', 20);

	game.input.keyboard.onDownCallback = handleInput;

	game.time.events.loop(3000, createZombie, this);
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
	game.physics.arcade.overlap(zombies, fireballs, die, null);
	plasmas.forEach(function(plasma) {
		plasma.animations.play('plasma');
	});
	fireballs.forEach(function(fireball){
		fireball.animations.play('fire');
	})
}

function die(zombie, spell) {
    zombie.faint(); 
    spell.destroy();
}

function handleInput(key)
{
	if((key.keyCode > 64) && (key.keyCode < 91))
	{
		input = String.fromCharCode(key.keyCode);
		if(input == 'A' || input == 'S' || input == 'D' || input =='F') pseq += input;
		else fseq += input;
		if(pseq[inputIndex] == psequence[inputIndex]) 
		{
			text.addColor('#009900', 17 + inputIndex);
			if(inputIndex < (seqlength -1)) 
			{
				text.addColor('#ff0000', 18 + inputIndex);
				inputIndex++;
			}
			else if(inputIndex == (seqlength - 1))
			{
				if(!casting){
					wizard.animations.play('cast');
					if(wizard.scale.x == 1){
						plasma = new Plasma(game, plasmas, wizard.x - 25, wizard.y - 50);
					}
					else plasma = new Plasma(game, plasmas, wizard.x, wizard.y - 50); 
					plasma.sequence();
					casting = true;
					pseq = "";
					inputIndex = 0;
				}
			}
			else
			{
				pseq = "";
				inputIndex = 0;
			}
		}
		else if(fseq[inputIndex2] == fsequence[inputIndex2])
		{
			text2.addColor('#009900', 20 + inputIndex2);
			if(inputIndex2 < (fseqlength - 1))
			{
				text2.addColor('#ff0000', 21 + inputIndex2);
				inputIndex2++;
			}
			else if(inputIndex2 == (fseqlength - 1))
			{
				if(!casting){
					wizard.animations.play('cast');
					for(var i = 0; i < 5; i++)
					{
						var fireball = new Fire(game, fireballs, (i * 40) + (wizard.x - 50), 0, 'fire');
					}
					fireball.sequence();
					casting = true;
					fseq = "";
					inputIndex2 = 0;
				}
			}
			else
			{
				fseq = "";
				inputIndex2 = 0;
			}
		}
		else 
		{
			pseq = "";
			inputIndex = 0;
			fseq = "";
			inputIndex2 = 0;
			for(var i = 0; i < seqlength; i++)
			{
				text.addColor('#ff0000', 17 + i);
			}
			for( var i = 0; i < fseqlength; i++)
			{
				text2.addColor('#ff0000', 20 + i);
			}
		}
	}
}

